import { getSentryRuntimeConfig } from '@events-helsinki/components/sentry/runtimeConfig';
import {
  beforeSend,
  beforeSendTransaction,
} from '@events-helsinki/components/sentry/utils';
import * as Sentry from '@sentry/nextjs';

const sentryConfig = getSentryRuntimeConfig();

if (sentryConfig.dsn) {
  Sentry.init({
    dsn: sentryConfig.dsn,
    environment: sentryConfig.environment,
    release: sentryConfig.release,
    tracesSampleRate: sentryConfig.tracesSampleRate,
    normalizeDepth: 3,
    integrations: [Sentry.extraErrorDataIntegration({ depth: 3 })],
    beforeSend,
    beforeSendTransaction,
    debug: false,
  });
}
