import type { NormalizedCacheObject } from '@apollo/client';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import * as Sentry from '@sentry/browser';
import {
  excludeArgs,
  initializeApolloClient,
  isClient,
  MutableReference,
} from 'events-helsinki-components';
import get from 'lodash/get';
import { useMemo } from 'react';

import { rewriteInternalURLs } from '../../utils/routerUtils';
import AppConfig from '../app/AppConfig';

const eventsApolloClient = new MutableReference<
  ApolloClient<NormalizedCacheObject>
>(createEventsApolloClient());

export function createEventsApolloClient(
  initialState?: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> {
  // Rewrite the URLs coming from events API to route them internally.
  const transformInternalURLs = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      response.data = response.data
        ? rewriteInternalURLs(response.data)
        : response.data;
      return response;
    });
  });
  const httpLink = new HttpLink({
    uri: AppConfig.eventsGraphqlEndpoint,
  });
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        const errorMessage = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
        Sentry.captureMessage(errorMessage);
      });
    }
    if (networkError) {
      Sentry.captureMessage('Network error');
    }
  });

  const cache = createEventsApolloCache(initialState);

  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: !isClient, // Disables forceFetch on the server (so queries are only run once)
    // TODO: Add error link after adding Sentry to the project
    link: ApolloLink.from([transformInternalURLs, errorLink, httpLink]),
    cache,
  });
}

export function createEventsApolloCache(initialState?: NormalizedCacheObject) {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          event(_, { args, toReference }) {
            return toReference({
              __typename: 'Keyword',
              id: args?.id,
            });
          },
          image(_, { args, toReference }) {
            return toReference({
              __typename: 'Place',
              id: args?.id,
            });
          },
          eventList: {
            // Only ignore page argument in caching to get fetchMore pagination working correctly
            // Other args are needed to separate different serch queries to separate caches
            // Docs: https://www.apollographql.com/docs/react/pagination/key-args/
            keyArgs: excludeArgs(['page']),
            merge(existing, incoming) {
              return {
                data: [...(existing?.data ?? []), ...incoming.data],
                meta: incoming.meta,
              };
            },
          },
          // See eventList keyArgs for explanation why page is filtered.
          eventsByIds: {
            keyArgs: excludeArgs(['page']),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            merge(existing, incoming, options) {
              return {
                data: [...(existing?.data ?? []), ...incoming.data],
                meta: incoming.meta,
              };
            },
          },
        },
      },
    },
  });

  cache.restore(initialState || {});

  if (typeof window !== 'undefined') {
    const state = get(window, '__APOLLO_STATE__');
    if (state) {
      // If you have multiple clients, use `state.<client_id>`
      cache.restore(state.defaultClient);
    }
  }

  return cache;
}

export default function initializeEventsApolloClient(
  initialState: NormalizedCacheObject = {}
) {
  return initializeApolloClient({
    initialState,
    mutableCachedClient: eventsApolloClient,
    createClient: createEventsApolloClient,
  });
}

export function useEventsApolloClient(
  initialState: NormalizedCacheObject = {}
) {
  return useMemo(
    () => initializeEventsApolloClient(initialState),
    [initialState]
  );
}
