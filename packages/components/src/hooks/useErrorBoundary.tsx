import { useErrorHandler } from 'react-error-boundary';

const useErrorBoundary = (error?: unknown) => {
  // TODO: give options, do special stuff
  return useErrorHandler(error);
};

export default useErrorBoundary;
