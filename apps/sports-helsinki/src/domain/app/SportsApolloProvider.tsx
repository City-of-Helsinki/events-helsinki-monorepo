import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import 'nprogress/nprogress.css';
import {
  ApolloErrorNotification,
  useApolloErrorHandler,
} from '@events-helsinki/components';
import React from 'react';
import { ConfigProvider as RHHCConfigProvider } from 'react-helsinki-headless-cms';
import useSportsRHHCConfig from '../../hooks/useSportsRHHCConfig';
import { useSportsApolloClient } from '../clients/sportsApolloClient';

export type Props = {
  children: React.ReactNode;
};

function SportsApolloProvider({ children }: Props) {
  const { showErrorNotification, handleError, onCloseErrorHandler } =
    useApolloErrorHandler();
  const apolloClient = useSportsApolloClient({ handleError });
  const rhhcConfig = useSportsRHHCConfig({ apolloClient });

  return (
    <BaseApolloProvider client={apolloClient}>
      <RHHCConfigProvider config={rhhcConfig}>{children}</RHHCConfigProvider>
      {showErrorNotification && (
        <ApolloErrorNotification onClose={onCloseErrorHandler} />
      )}
    </BaseApolloProvider>
  );
}

export default SportsApolloProvider;
