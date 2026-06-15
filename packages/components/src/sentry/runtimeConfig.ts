import getRuntimeEnv from '../utils/getRuntimeEnv';

export function getSentryRuntimeConfig() {
  const tracePropagationTargets = getRuntimeEnv(
    'NEXT_PUBLIC_SENTRY_TRACE_PROPAGATION_TARGETS'
  );

  return {
    dsn: getRuntimeEnv('NEXT_PUBLIC_SENTRY_DSN'),
    environment: getRuntimeEnv('NEXT_PUBLIC_SENTRY_ENVIRONMENT'),
    release: getRuntimeEnv('NEXT_PUBLIC_SENTRY_RELEASE'),
    project: getRuntimeEnv('NEXT_PUBLIC_SENTRY_PROJECT'),
    tracesSampleRate: Number.parseFloat(
      getRuntimeEnv('NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE') || '0'
    ),
    tracePropagationTargets: tracePropagationTargets
      ? tracePropagationTargets.split(',')
      : [],
    replaysSessionSampleRate: Number.parseFloat(
      getRuntimeEnv('NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE') || '0'
    ),
    replaysOnErrorSampleRate: Number.parseFloat(
      getRuntimeEnv('NEXT_PUBLIC_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE') || '0'
    ),
  };
}
