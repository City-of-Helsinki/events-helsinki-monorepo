import https from 'https';
import type {
  FieldMergeFunction,
  HttpOptions,
  NormalizedCacheObject,
  StoreObject,
  ErrorPolicy,
} from '@apollo/client';
import {
  defaultDataIdFromObject,
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { relayStylePagination } from '@apollo/client/utilities';
import * as Sentry from '@sentry/browser';
import fetch from 'cross-fetch';
import capitalize from 'lodash/capitalize';

import { graphqlClientLogger } from '../loggers/logger';
import type { LanguageString } from '../types';
import type { CmsRoutedAppHelper } from '../utils';
import isClient from '../utils/isClient';
import {
  excludeArgs,
  initializeApolloClient,
  MutableReference,
  sortMenuItems,
} from './utils';

export type EventsFederationApolloClientConfig = {
  federationGraphqlEndpoint: string;
  allowUnauthorizedRequests?: boolean;
  routerHelper: CmsRoutedAppHelper;
  handleError?: (error: unknown) => void;
};

class EventsFederationApolloClient {
  config: EventsFederationApolloClientConfig;
  client: ApolloClient<NormalizedCacheObject>;
  public constructor(config: EventsFederationApolloClientConfig) {
    this.config = config;
    // Rewrite the URLs coming from events API to route them internally.
    const transformInternalURLs = new ApolloLink((operation, forward) => {
      return forward(operation).map((response) => {
        response.data = response.data
          ? this.config.routerHelper.rewriteInternalURLs(response.data)
          : response.data;
        return response;
      });
    });
    const httpLink = this.getHttpLink(config.federationGraphqlEndpoint);
    const errorLink = onError(
      ({ graphQLErrors, networkError, operation, response }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) => {
            const errorMessage = `[GraphQL error]: ${JSON.stringify({
              OperationName: operation.operationName,
              Message: message,
              Location: locations,
              Path: path,
              // Response: response,
            })}`;
            graphqlClientLogger.error(errorMessage);
            Sentry.captureMessage(errorMessage);
            // Call the custom error handler that should redirect to the Error page
            if (this.config.handleError && !response?.data) {
              this.config.handleError(graphQLErrors);
            }
          });
        }

        if (networkError) {
          graphqlClientLogger.error(
            `[GraphQL networkError]: ${JSON.stringify({
              Operation: operation.operationName,
              NetworkError: networkError,
            })}`
          );
          Sentry.captureMessage('Graphql Network error');
          // Call the custom error handler that should redirect to the Error page
          if (this.config.handleError && !response?.data) {
            this.config.handleError(networkError);
          }
        }
      }
    );

    // If a retried operation also results in errors,
    // those errors are not passed to your onError link to prevent an infinite loop of operations.
    // This means that an onError link can retry a particular operation only once.
    // https://www.apollographql.com/docs/react/data/error-handling/#retrying-operations
    // For custom strategies, e.g. skipping some special cases,
    // see: https://www.apollographql.com/docs/react/api/link/apollo-link-retry/#custom-strategies
    // NOTE: default is 5 re-attemps!
    const retryLink = new RetryLink();

    // retain partial data even if error occurs for any operation
    const baseOptions: { errorPolicy: ErrorPolicy } = { errorPolicy: 'all' };

    this.client = new ApolloClient({
      connectToDevTools: true,
      ssrMode: !isClient, // Disables forceFetch on the server (so queries are only run once)
      link: ApolloLink.from([
        transformInternalURLs,
        errorLink,
        retryLink,
        httpLink,
      ]),
      cache: EventsFederationApolloClient.createApolloCache(),
      defaultOptions: {
        watchQuery: baseOptions,
        query: baseOptions,
        mutate: baseOptions,
      },
    });
  }

  getHttpLink(uri: string) {
    let options: HttpOptions = {
      uri,
      fetch,
    };

    // Our review environment can't provide a valid certificate. Hence we allow
    // the application to be configured so that unauthorized requests are not
    // rejected. This allows us to test API changes in the review environment.
    if (
      this.config.allowUnauthorizedRequests &&
      new URL(uri).protocol === 'https:'
    ) {
      graphqlClientLogger.info('Allowing unauthorized requests');
      options = {
        ...options,
        fetchOptions: {
          agent: new https.Agent({ rejectUnauthorized: false }),
        },
      };
    }

    return new HttpLink(options);
  }

  private static getPageStylePaginator(merge: FieldMergeFunction) {
    return {
      // Only ignore page argument in caching to get fetchMore pagination working correctly
      // Other args are needed to separate different serch queries to separate caches
      // Docs: https://www.apollographql.com/docs/react/pagination/key-args/
      keyArgs: excludeArgs(['page']),
      merge,
    };
  }

  private static createApolloCache() {
    return new InMemoryCache({
      typePolicies: {
        Query: {
          queryType: true, // This type represents the Root Query.
          fields: {
            event(_, { args, toReference }) {
              return toReference({
                __typename: 'EventDetails',
                id: args?.id,
              });
            },
            image(_, { args, toReference }) {
              return toReference({
                __typename: 'Place',
                id: args?.id,
              });
            },
            keyword(_, { args, toReference }) {
              return toReference({
                __typename: 'Keyword',
                id: args?.id,
              });
            },
            place(_, { args, toReference }) {
              return toReference({
                __typename: 'Place',
                id: args?.id,
              });
            },
            eventList: EventsFederationApolloClient.getPageStylePaginator(
              (existing, incoming) => {
                if (!incoming) return existing;
                return {
                  data: [...(existing?.data ?? []), ...incoming.data],
                  meta: incoming.meta,
                };
              }
            ),
            // See eventList keyArgs for explanation why page is filtered.
            eventsByIds: EventsFederationApolloClient.getPageStylePaginator(
              (existing, incoming) => {
                if (!incoming) return existing;
                return {
                  data: [...(existing?.data ?? []), ...incoming.data],
                  meta: incoming.meta,
                };
              }
            ),
            // works in combination with fetchPolicy: 'network-only'
            posts: relayStylePagination(excludeArgs(['after'])),
            unifiedSearch: relayStylePagination(excludeArgs(['after'])),
          },
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
        Keyword: {
          keyFields: (object: Readonly<StoreObject>, { selectionSet }) => {
            // Hacky way to not store keywords without id to cache (then name is missing also)
            // This happends when queries are done without include: ['keywords']
            if (selectionSet) {
              return object.id ? `Keyword:${object.internalId}` : false;
            }

            // if selectionSet is not defined, it means that toReference function calls keyfields
            // then we want to return cache id normally.
            return defaultDataIdFromObject(object);
          },
        },
        OntologyWord: {
          fields: {
            label: {
              read(label: LanguageString) {
                const { fi, en, sv } = label;
                return {
                  ...label,
                  fi: fi ? capitalize(fi) : '',
                  en: en ? capitalize(en) : '',
                  sv: sv ? capitalize(sv) : '',
                };
              },
            },
          },
        },
      },
    });
  }

  static createInstance(
    config: EventsFederationApolloClientConfig
  ): ApolloClient<NormalizedCacheObject> {
    return initializeApolloClient<
      NormalizedCacheObject,
      ApolloClient<NormalizedCacheObject>
    >({
      mutableCachedClient: new MutableReference<
        ApolloClient<NormalizedCacheObject>
      >(),
      createClient: () => new EventsFederationApolloClient(config).client,
    });
  }
}

export default EventsFederationApolloClient;
