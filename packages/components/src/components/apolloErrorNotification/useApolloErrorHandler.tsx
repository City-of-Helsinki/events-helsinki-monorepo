import type { GraphQLFormattedError } from 'graphql';
import { useEffect, useState } from 'react';
import { useApolloErrorsReducer } from './apolloErrorsReducer';

export default function useApolloErrorHandler() {
  const [errors, errorsDispatch] = useApolloErrorsReducer();
  const [showErrorNotification, setShowErrorNotification] = useState(
    !!errors.length
  );
  useEffect(() => {
    setShowErrorNotification(!!errors.length);
  }, [errors.length]);
  const handleError = (error: GraphQLFormattedError) =>
    errorsDispatch({ type: 'addError', error });
  const onCloseErrorHandler = () => errorsDispatch({ type: 'clearErrors' });
  return { handleError, onCloseErrorHandler, showErrorNotification };
}
