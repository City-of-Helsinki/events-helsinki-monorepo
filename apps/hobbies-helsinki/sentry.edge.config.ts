import {
  beforeSend,
  beforeSendTransaction,
} from '@events-helsinki/components/sentry/utils';
import * as Sentry from '@sentry/nextjs';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
    // Adjust this value in production, or use tracesSampler for greater control
    // @see https://develop.sentry.dev/sdk/performance/
    // To turn it off, remove the line
    // @see https://github.com/getsentry/sentry-javascript/discussions/4503#discussioncomment-2143116
    tracesSampleRate: Number.parseFloat(
      process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE || '0'
    ),
    normalizeDepth: 3,
    integrations: [Sentry.extraErrorDataIntegration({ depth: 3 })],
    beforeSend,
    beforeSendTransaction,
    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
