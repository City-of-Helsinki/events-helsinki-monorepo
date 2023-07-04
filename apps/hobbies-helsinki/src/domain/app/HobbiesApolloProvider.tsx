import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import 'nprogress/nprogress.css';
import {
  ApolloErrorNotification,
  useApolloErrorsReducer,
} from '@events-helsinki/components';
import React from 'react';
import { ConfigProvider as RHHCConfigProvider } from 'react-helsinki-headless-cms';
import useHobbiesRHHCConfig from '../../hooks/useHobbiesRHHCConfig';
import { useHobbiesApolloClient } from '../clients/hobbiesApolloClient';

export type Props = {
  children: React.ReactNode;
};

function HobbiesApolloProvider({ children }: Props) {
  const [errors, errorsDispatch] = useApolloErrorsReducer();
  const showErrorNotification = !!errors.length;

  const handleError = React.useCallback((error: Error) => {
    errorsDispatch({ type: 'addError', error });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apolloClient = useHobbiesApolloClient({ handleError });
  const rhhcConfig = useHobbiesRHHCConfig({ apolloClient });
  const onCloseErrorHandler = () => errorsDispatch({ type: 'clearErrors' });

  return (
    <>
      <BaseApolloProvider client={apolloClient}>
        <RHHCConfigProvider config={rhhcConfig}>{children}</RHHCConfigProvider>
      </BaseApolloProvider>
      {showErrorNotification && (
        <ApolloErrorNotification onClose={onCloseErrorHandler} />
      )}
    </>
  );
}

export default HobbiesApolloProvider;
