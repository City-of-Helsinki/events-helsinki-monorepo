import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { EventsFederationApolloClient } from '@events-helsinki/components';
import type { GraphQLFormattedError } from 'graphql';
import React from 'react';
import routerHelper from '../../domain/app/routerHelper';
import AppConfig from '../app/AppConfig';

export default function initializeSportsApolloClient(
  config: {
    handleError?: (error: GraphQLFormattedError) => void;
  } = {}
): ApolloClient<NormalizedCacheObject> {
  return EventsFederationApolloClient.createInstance({
    handleError: config.handleError,
    routerHelper,
    allowUnauthorizedRequests: AppConfig.allowUnauthorizedRequests,
    federationGraphqlEndpoint: AppConfig.federationGraphqlEndpoint,
    ignoredErrorHandlerStatusCodes:
      AppConfig.apolloErrorHandlerIgnoredStatusCodes,
    contextHeaders: AppConfig.apolloFederationContextHeaders,
  });
}

export function useSportsApolloClient(args: {
  handleError?: (error: GraphQLFormattedError) => void;
}): ApolloClient<NormalizedCacheObject> {
  // NOTE: Critical: The Apollo cache should never be cleared!
  // Carefully test the cache after any changes done here.
  return React.useMemo(() => initializeSportsApolloClient(args), []);
}

export const sportsApolloClient = initializeSportsApolloClient();
