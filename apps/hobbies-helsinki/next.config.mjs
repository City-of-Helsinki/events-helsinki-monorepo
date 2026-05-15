import { withSentryConfig } from '@sentry/nextjs';
import packageJson from './package.json' with { type: 'json' };
import i18nRoutes from './i18nRoutes.config.mjs';
import redirectCampaignRoutes from './redirectCampaignRoutes.config.mjs';
import nextConfig from './next-i18next.config.mjs';
import nextBaseConfig from '../../next.base.config.mjs';

const campaignRoutes = Object.entries(redirectCampaignRoutes).flatMap(
  ([source, destination]) => [
    {
      // Not setting `locale: false` here because that didn't work for some reason.
      // When locale is left undefined middleware.ts's prefixDefaultLocale function
      // lets these redirect routes through without prefixing them with locale.
      source,
      destination,
      permanent: false,
    },
  ]
);

export default withSentryConfig(
  nextBaseConfig({
    packageJson,
    i18nRoutes,
    i18n: nextConfig.i18n,
    async redirects() {
      return campaignRoutes;
    },
  }),
  {
    // Suppresses source map uploading logs during build
    silent: false,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: '/monitoring',

    webpack: {
      // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,

      // Tree-shaking options for reducing bundle size
      treeshake: {
        // Automatically tree-shake Sentry logger statements to reduce bundle size
        removeDebugLogging: true,
      },
    },
  }
);
