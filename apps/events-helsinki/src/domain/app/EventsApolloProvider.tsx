import { ApolloProvider as BaseApolloProvider } from '@apollo/client/react/index.js';
import { ConfigProvider as RHHCConfigProvider } from '@city-of-helsinki/react-helsinki-headless-cms';
import {
  ApolloErrorNotification,
  useApolloErrorHandler,
} from '@events-helsinki/components';
import React from 'react';
import useEventsRHHCConfig from '../../hooks/useEventsRHHCConfig';
import { useEventsApolloClient } from '../clients/eventsApolloClient';

export type Props = Readonly<{
  children: React.ReactNode;
}>;

function EventsApolloProvider({ children }: Props) {
  const { showErrorNotification, handleError, onCloseErrorHandler } =
    useApolloErrorHandler();
  const apolloClient = useEventsApolloClient({ handleError });
  const rhhcConfig = useEventsRHHCConfig({ apolloClient });

  return (
    <BaseApolloProvider client={apolloClient}>
      <RHHCConfigProvider config={rhhcConfig}>{children}</RHHCConfigProvider>
      {showErrorNotification && (
        <ApolloErrorNotification onClose={onCloseErrorHandler} />
      )}
    </BaseApolloProvider>
  );
}

export default EventsApolloProvider;
