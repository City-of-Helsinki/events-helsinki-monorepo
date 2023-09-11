import { useState } from 'react';

export default function useApolloErrorHandler() {
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleError = (error: Error) => setShowErrorNotification(true);
  const onCloseErrorHandler = () => setShowErrorNotification(false);

  return { handleError, onCloseErrorHandler, showErrorNotification };
}
