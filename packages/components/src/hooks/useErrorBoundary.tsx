import { useErrorBoundary as useErrorHandler } from 'react-error-boundary';

const useErrorBoundary = () => {
  const { showBoundary } = useErrorHandler();
  // TODO: give options, do special stuff
  return (error?: unknown) => showBoundary(error);
};

export default useErrorBoundary;
