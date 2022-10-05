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

export function createCmsApolloClient() {
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
  return new ApolloClient({
    ssrMode: isClient,
    link: ApolloLink.from([transformInternalURLs, httpLink]),
    cache: new InMemoryCache({
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
    }),
  });
}

export default function initializeCmsApollo(
  initialState = {}
): ApolloClient<NormalizedCacheObject> {
  return initializeApolloClient<
    NormalizedCacheObject,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ApolloClient<NormalizedCacheObject>
  >({
    initialState,
    mutableCachedClient: cmsApolloClient,
    createClient: createCmsApolloClient,
  });
}

export function useCmsApollo(initialState: NormalizedCacheObject) {
  return useMemo(() => initializeCmsApollo(initialState), [initialState]);
}
