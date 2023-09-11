import { useEffect, useState } from 'react';
import { useApolloErrorsReducer } from './apolloErrorsReducer';

export default function useApolloErrorHandler() {
  const [errors, errorsDispatch] = useApolloErrorsReducer();
  const [showErrorNotification, setShowErrorNotification] = useState(
    !!errors.length
  );
  const handleError = (error: Error) =>
    errorsDispatch({ type: 'addError', error });
  const onCloseErrorHandler = () => errorsDispatch({ type: 'clearErrors' });

  useEffect(() => {
    setShowErrorNotification(!!errors.length);
  }, [errors.length]);

  return { handleError, onCloseErrorHandler, showErrorNotification };
}
