import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { EventsFederationApolloClient } from '@events-helsinki/components';
import React from 'react';
import routerHelper from '../../domain/app/routerHelper';
import AppConfig from '../app/AppConfig';
export default function initializeSportsApolloClient(): ApolloClient<NormalizedCacheObject> {
  return EventsFederationApolloClient.createInstance({
    routerHelper,
    allowUnauthorizedRequests: AppConfig.allowUnauthorizedRequests,
    federationGraphqlEndpoint: AppConfig.federationGraphqlEndpoint,
  });
}

export function useSportsApolloClient(): ApolloClient<NormalizedCacheObject> {
  // NOTE: Critical: The Apollo cache should never be cleared!
  // Carefully test the cache after any changes done here.
  return React.useMemo(() => initializeSportsApolloClient(), []);
}

export const sportsApolloClient = initializeSportsApolloClient();
