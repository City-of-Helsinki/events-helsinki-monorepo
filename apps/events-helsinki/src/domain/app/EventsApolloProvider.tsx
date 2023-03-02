import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import 'nprogress/nprogress.css';
import { useErrorBoundary } from 'events-helsinki-components';
import React from 'react';
import { ConfigProvider as RHHCConfigProvider } from 'react-helsinki-headless-cms';
import useEventsRHHCConfig from '../../hooks/useEventsRHHCConfig';
import { useEventsApolloClient } from '../clients/eventsApolloClient';

export type Props = {
  children: React.ReactNode;
};

function EventsApolloProvider({ children }: Props) {
  const errorHandler = useErrorBoundary();
  const handleError = React.useCallback(
    (error: unknown) => {
      errorHandler(error);
    },
    [errorHandler]
  );
  const apolloClient = useEventsApolloClient({ handleError });
  const rhhcConfig = useEventsRHHCConfig({ apolloClient });

  return (
    <BaseApolloProvider client={apolloClient}>
      <RHHCConfigProvider config={rhhcConfig}>{children}</RHHCConfigProvider>
    </BaseApolloProvider>
  );
}

export default EventsApolloProvider;
