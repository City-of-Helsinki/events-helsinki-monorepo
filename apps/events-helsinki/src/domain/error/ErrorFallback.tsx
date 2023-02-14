import * as Sentry from '@sentry/browser';
import { UnknownError, useCommonTranslation } from 'events-helsinki-components';
import React from 'react';
import type { FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  const { t } = useCommonTranslation();
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('unexpected error', error.message);
    Sentry.captureMessage(error.message);
  }, [error]);
  return <UnknownError appName={t(`appEvents:appName`)} />;
};

export default ErrorFallback;
