// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { beforeSend, beforeSendTransaction } from '@events-helsinki/components';
import type { IntegrationFn } from '@sentry/core';
import { thirdPartyErrorFilterIntegration } from '@sentry/core';
import * as Sentry from '@sentry/nextjs';
import {
  captureRouterTransitionStart,
  replayIntegration,
} from '@sentry/nextjs';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    beforeSend,
    beforeSendTransaction,
    normalizeDepth: 3,
    integrations: [
      replayIntegration(),
      Sentry.extraErrorDataIntegration({ depth: 3 }),
      thirdPartyErrorFilterIntegration({
        filterKeys: process.env.NEXT_PUBLIC_SENTRY_PROJECT
          ? [process.env.NEXT_PUBLIC_SENTRY_PROJECT]
          : [],
        behaviour: 'drop-error-if-contains-third-party-frames',
      }) as IntegrationFn,
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
    ignoreErrors: [
      'ResizeObserver loop completed with undelivered notifications',
      'ResizeObserver loop limit exceeded',
    ],
    tracesSampleRate: Number.parseFloat(
      process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE || '0'
    ),
    tracePropagationTargets: process.env
      .NEXT_PUBLIC_SENTRY_TRACE_PROPAGATION_TARGETS
      ? process.env.NEXT_PUBLIC_SENTRY_TRACE_PROPAGATION_TARGETS.split(',')
      : [],
    replaysSessionSampleRate: Number.parseFloat(
      process.env.NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE || '0'
    ),
    replaysOnErrorSampleRate: Number.parseFloat(
      process.env.NEXT_PUBLIC_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE || '0'
    ),
    debug: false,
  });
}

export const onRouterTransitionStart = captureRouterTransitionStart;
