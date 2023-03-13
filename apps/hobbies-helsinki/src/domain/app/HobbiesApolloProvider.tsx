import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import 'nprogress/nprogress.css';
import { useErrorBoundary } from 'events-helsinki-components';
import React from 'react';
import { ConfigProvider as RHHCConfigProvider } from 'react-helsinki-headless-cms';
import useHobbiesRHHCConfig from '../../hooks/useHobbiesRHHCConfig';
import { useHobbiesApolloClient } from '../clients/hobbiesApolloClient';

export type Props = {
  children: React.ReactNode;
};

function HobbiesApolloProvider({ children }: Props) {
  const errorHandler = useErrorBoundary();
  const handleError = React.useCallback(
    (error: unknown) => {
      errorHandler(error);
    },
    [errorHandler]
  );
  const apolloClient = useHobbiesApolloClient({ handleError });
  const rhhcConfig = useHobbiesRHHCConfig({ apolloClient });

  return (
    <BaseApolloProvider client={apolloClient}>
      <RHHCConfigProvider config={rhhcConfig}>{children}</RHHCConfigProvider>
    </BaseApolloProvider>
  );
}

export default HobbiesApolloProvider;
