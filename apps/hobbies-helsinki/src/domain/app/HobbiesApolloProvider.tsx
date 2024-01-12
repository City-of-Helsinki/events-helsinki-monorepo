import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import {
  ApolloErrorNotification,
  useApolloErrorHandler,
} from '@events-helsinki/components';
import React from 'react';
import { ConfigProvider as RHHCConfigProvider } from 'react-helsinki-headless-cms';
import useHobbiesRHHCConfig from '../../hooks/useHobbiesRHHCConfig';
import { useHobbiesApolloClient } from '../clients/hobbiesApolloClient';

export type Props = {
  children: React.ReactNode;
};

function HobbiesApolloProvider({ children }: Props) {
  const { showErrorNotification, handleError, onCloseErrorHandler } =
    useApolloErrorHandler();
  const apolloClient = useHobbiesApolloClient({ handleError });
  const rhhcConfig = useHobbiesRHHCConfig({ apolloClient });

  return (
    <BaseApolloProvider client={apolloClient}>
      <RHHCConfigProvider config={rhhcConfig}>{children}</RHHCConfigProvider>
      {showErrorNotification && (
        <ApolloErrorNotification onClose={onCloseErrorHandler} />
      )}
    </BaseApolloProvider>
  );
}

export default HobbiesApolloProvider;
