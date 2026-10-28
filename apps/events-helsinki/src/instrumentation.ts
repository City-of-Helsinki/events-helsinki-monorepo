import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { configureSentryTunnelListenerLimit } = await import(
      '@events-helsinki/components/sentry/serverUtils'
    );
    await configureSentryTunnelListenerLimit();
    await import('../sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
