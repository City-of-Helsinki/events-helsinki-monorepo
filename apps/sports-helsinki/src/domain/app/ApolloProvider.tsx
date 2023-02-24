import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import 'nprogress/nprogress.css';
import { useErrorBoundary } from 'events-helsinki-components';
import React from 'react';
import { ConfigProvider as RHHCConfigProvider } from 'react-helsinki-headless-cms';
import useRHHCConfig from '../../hooks/useRHHCConfig';
import { useApolloClient } from '../clients/eventsFederationApolloClient';


export type Props = {
  serverError: unknown;
  children: React.ReactNode;
};

function ApolloProvider({ children, serverError }: Props) {
  useErrorBoundary(serverError);
  const errorHandler = useErrorBoundary();
  const handleError = React.useCallback((error: unknown) => {
    console.error('error boundary handler error from apollo link', error);
    errorHandler(error);
  }, []);
  const apolloClient = useApolloClient({ handleError });
  const rhhcConfig = useRHHCConfig({ apolloClient });

  return (
    <BaseApolloProvider client={apolloClient}>
      <RHHCConfigProvider config={rhhcConfig}>{children}</RHHCConfigProvider>
    </BaseApolloProvider>
  );
}

export default ApolloProvider;
