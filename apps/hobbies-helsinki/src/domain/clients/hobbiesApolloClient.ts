import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { EventsFederationApolloClient } from '@events-helsinki/components';
import React from 'react';
import routerHelper from '../../domain/app/routerHelper';
import AppConfig from '../app/AppConfig';

export default function initializeHobbiesApolloClient(
  config: {
    handleError?: (error: Error) => void;
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

export function useHobbiesApolloClient(args: {
  handleError?: (error: Error) => void;
}): ApolloClient<NormalizedCacheObject> {
  // NOTE: Critical: The Apollo cache should never be cleared!
  // Carefully test the cache after any changes done here.
  return React.useMemo(() => initializeHobbiesApolloClient(args), []);
}

export const hobbiesApolloClient = initializeHobbiesApolloClient();
