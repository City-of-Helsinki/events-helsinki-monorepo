import * as Sentry from '@sentry/browser';
import React from 'react';
import UnknownError from './UnknownError';

type Props = { appName: string; error: Error };

const ErrorFallback: React.FC<Props> = ({ error, appName }) => {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('unexpected error', error.message);
    Sentry.captureMessage(error.message);
  }, [error]);
  return <UnknownError appName={appName} />;
};

export default ErrorFallback;
