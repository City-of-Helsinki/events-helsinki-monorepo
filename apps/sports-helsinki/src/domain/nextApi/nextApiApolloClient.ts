import https from 'https';

import type { NormalizedCacheObject, HttpOptions } from '@apollo/client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import {
  initializeApolloClient,
  isClient,
  MutableReference,
} from 'events-helsinki-components';
import capitalize from 'lodash/capitalize';
import { useMemo } from 'react';

import { graphqlLogger } from '../../logger';
import AppConfig from '../app/AppConfig';

const apiApolloClient = new MutableReference<
  ApolloClient<NormalizedCacheObject>
>();

function getHttpLink(uri: string) {
  let options: HttpOptions = {
    uri,
  };

  // Our review environment can't provide a valid certificate. Hence we allow
  // the application to be configured so that unauthorized requests are not
  // rejected. This allows us to test API changes in the review environment.
  if (
    AppConfig.allowUnauthorizedRequests &&
    new URL(uri).protocol === 'https:'
  ) {
    graphqlLogger.info('Allowing unauthorized requests');
    options = {
      ...options,
      fetchOptions: {
        agent: new https.Agent({ rejectUnauthorized: false }),
      },
    };
  }

  return new HttpLink(options);
}

function createInMemoryCache(): InMemoryCache {
  return new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          events: relayStylePagination(['type', 'where']),
        },
      },
      Ontology: {
        fields: {
          label: {
            read(label) {
              return capitalize(label);
            },
          },
        },
      },
    },
  });
}

export function createNextApiApolloClient() {
  return new ApolloClient({
    connectToDevTools: true,
    cache: createInMemoryCache(),
    link: getHttpLink(AppConfig.nextApiGraphqlEndpoint),
    ssrMode: !isClient,
  });
}

export default function initializeNextApiApolloClient(
  initialState: NormalizedCacheObject = {}
) {
  return initializeApolloClient({
    initialState,
    mutableCachedClient: apiApolloClient,
    createClient: createNextApiApolloClient,
  });
}

export function useNextApiApolloClient(
  initialState: NormalizedCacheObject = {}
) {
  return useMemo(
    () => initializeNextApiApolloClient(initialState),
    [initialState]
  );
}
