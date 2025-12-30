import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import { ConfigProvider as RHHCConfigProvider } from '@city-of-helsinki/react-helsinki-headless-cms';
import {
  ApolloErrorNotification,
  useApolloErrorHandler,
} from '@events-helsinki/components';
import React from 'react';
import useHobbiesRHHCConfig from '../../hooks/useHobbiesRHHCConfig';
import { useHobbiesApolloClient } from '../clients/hobbiesApolloClient';

export type Props = Readonly<{
  children: React.ReactNode;
}>;

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
