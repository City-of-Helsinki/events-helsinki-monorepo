import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import 'nprogress/nprogress.css';
import {
  ApolloErrorNotification,
  apolloErrorsReducer,
} from '@events-helsinki/components';
import React from 'react';
import { ConfigProvider as RHHCConfigProvider } from 'react-helsinki-headless-cms';
import useEventsRHHCConfig from '../../hooks/useEventsRHHCConfig';
import { useEventsApolloClient } from '../clients/eventsApolloClient';

export type Props = {
  children: React.ReactNode;
};

function EventsApolloProvider({ children }: Props) {
  const [errors, errorsDispatch] = React.useReducer(apolloErrorsReducer, []);
  const [showErrorNotification, setShowErrorNotification] =
    React.useState(false);

  React.useEffect(() => {
    setShowErrorNotification(!!errors.length);
  }, [errors.length]);

  const handleError = React.useCallback((error: Error) => {
    errorsDispatch({ type: 'addError', error });
  }, []);

  const apolloClient = useEventsApolloClient({ handleError });
  const rhhcConfig = useEventsRHHCConfig({ apolloClient });
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

export default EventsApolloProvider;
