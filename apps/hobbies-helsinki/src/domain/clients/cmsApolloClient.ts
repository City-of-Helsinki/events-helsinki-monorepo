import type { NormalizedCacheObject } from '@apollo/client';
import {
  InMemoryCache,
  ApolloClient,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import fetch from 'cross-fetch';
import {
  MutableReference,
  sortMenuItems,
  isClient,
  initializeApolloClient,
} from 'events-helsinki-components';
import { useMemo } from 'react';

import AppConfig from '../../domain/app/AppConfig';
import { rewriteInternalURLs } from '../../utils/routerUtils';

const cmsApolloClient = new MutableReference<
  ApolloClient<NormalizedCacheObject>
>(createCmsApolloClient());

export function createCmsApolloClient(
  initialState: NormalizedCacheObject = {}
) {
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
    uri: AppConfig.cmsGraphqlEndpoint,
    fetch,
  });

  const cache = createCmsApolloCache(initialState);

  return new ApolloClient({
    connectToDevTools: false,
    ssrMode: isClient,
    link: ApolloLink.from([transformInternalURLs, httpLink]),
    cache,
  });
}

export function createCmsApolloCache(initialState?: NormalizedCacheObject) {
  const cache = new InMemoryCache({
    typePolicies: {
      RootQuery: {
        queryType: true,
      },
      MenuItems: {
        fields: {
          nodes: {
            read(nodes) {
              return sortMenuItems(nodes);
            },
          },
        },
      },
    },
  });

  cache.restore(initialState || {});

  return cache;
}

export default function initializeCmsApolloClient(
  initialState: NormalizedCacheObject = {}
) {
  return initializeApolloClient({
    initialState,
    mutableCachedClient: cmsApolloClient,
    createClient: createCmsApolloClient,
  });
}

export function useCmsApollo(initialState: NormalizedCacheObject = {}) {
  return useMemo(() => initializeCmsApolloClient(initialState), [initialState]);
}
