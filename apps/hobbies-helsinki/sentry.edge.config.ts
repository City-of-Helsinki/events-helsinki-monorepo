// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  // Adjust this value in production, or use tracesSampler for greater control
  // @see https://develop.sentry.dev/sdk/performance/
  // To turn it off, remove the line
  // @see https://github.com/getsentry/sentry-javascript/discussions/4503#discussioncomment-2143116
  tracesSampleRate: parseFloat(
    process.env.NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE ?? '0.1'
  ),
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
  beforeSend: async (event, hint) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Sentry event', event);
      // eslint-disable-next-line no-console
      console.log('Sentry hint', hint);
    }
    return event;
  },
});
