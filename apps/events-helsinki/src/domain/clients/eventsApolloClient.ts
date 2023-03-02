import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { EventsFederationApolloClient } from 'events-helsinki-components';
import React from 'react';
import routerHelper from '../../domain/app/routerHelper';
import AppConfig from '../app/AppConfig';
export default function initializeEventsApolloClient(
  config: {
    handleError?: (error: unknown) => void;
  } = {}
): ApolloClient<NormalizedCacheObject> {
  return EventsFederationApolloClient.createInstance({
    handleError: config.handleError,
    routerHelper,
    allowUnauthorizedRequests: AppConfig.allowUnauthorizedRequests,
    federationGraphqlEndpoint: AppConfig.federationGraphqlEndpoint,
  });
}

export function useEventsApolloClient(args: {
  handleError?: (error: unknown) => void;
}): ApolloClient<NormalizedCacheObject> {
  return React.useMemo(() => initializeEventsApolloClient(args), [args]);
}

export const eventsApolloClient = initializeEventsApolloClient();
