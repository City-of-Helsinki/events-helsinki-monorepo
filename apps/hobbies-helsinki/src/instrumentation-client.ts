// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { getSentryRuntimeConfig } from '@events-helsinki/components/sentry/runtimeConfig';
import {
  beforeSend,
  beforeSendTransaction,
} from '@events-helsinki/components/sentry/utils';
import type { IntegrationFn } from '@sentry/core';
import { thirdPartyErrorFilterIntegration } from '@sentry/core';
import * as Sentry from '@sentry/nextjs';
import {
  captureRouterTransitionStart,
  replayIntegration,
} from '@sentry/nextjs';

const sentryConfig = getSentryRuntimeConfig();

if (sentryConfig.dsn) {
  Sentry.init({
    beforeSend,
    beforeSendTransaction,
    normalizeDepth: 3,
    integrations: [
      replayIntegration(),
      Sentry.extraErrorDataIntegration({ depth: 3 }),
      thirdPartyErrorFilterIntegration({
        filterKeys: sentryConfig.project ? [sentryConfig.project] : [],
        behaviour: 'drop-error-if-contains-third-party-frames',
      }) as IntegrationFn,
    ],
    dsn: sentryConfig.dsn,
    environment: sentryConfig.environment,
    release: sentryConfig.release,
    ignoreErrors: [
      'ResizeObserver loop completed with undelivered notifications',
      'ResizeObserver loop limit exceeded',
    ],
    tracesSampleRate: sentryConfig.tracesSampleRate,
    tracePropagationTargets: sentryConfig.tracePropagationTargets,
    replaysSessionSampleRate: sentryConfig.replaysSessionSampleRate,
    replaysOnErrorSampleRate: sentryConfig.replaysOnErrorSampleRate,
    debug: false,
  });
}

export const onRouterTransitionStart = captureRouterTransitionStart;
