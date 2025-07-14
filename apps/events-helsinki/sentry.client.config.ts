// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as SentryBrowser from '@sentry/browser';
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  // Adjust this value in production, or use tracesSampler for greater control
  // @see https://develop.sentry.dev/sdk/performance/
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: parseFloat(
    process.env.NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE ?? '0.1'
  ),
  // Replay may only be enabled for the client-side
  integrations: [SentryBrowser.replayIntegration()],
  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: parseFloat(
    process.env.NEXT_PUBLIC_SENTRY_REPLAY_SESSION_SAMPLE_RATE ?? '0'
  ),
  replaysOnErrorSampleRate: parseFloat(
    process.env.NEXT_PUBLIC_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE ?? '0'
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
  ignoreErrors: [
    /**
     * @link https://github.com/WICG/ResizeObserver/issues/38#issuecomment-422126006,
     * @link https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded/50387233#50387233
     */
    'ResizeObserver loop limit exceeded',
  ],
});
