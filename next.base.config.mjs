// https://nextjs.org/docs/api-reference/next.config.mjs/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import { withSentryConfig } from '@sentry/nextjs';
import pc from 'picocolors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import bundleAnalyser from '@next/bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const enableCSP = true;
const trueEnv = ['true', '1', 'yes'];

// const isProd = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const isCI = trueEnv.includes(process.env?.CI ?? 'false');

const NEXTJS_IGNORE_ESLINT = trueEnv.includes(
  process.env?.NEXTJS_IGNORE_ESLINT ?? 'false'
);
const NEXTJS_IGNORE_TYPECHECK = trueEnv.includes(
  process.env?.NEXTJS_IGNORE_TYPECHECK ?? 'false'
);
const NEXTJS_DISABLE_SENTRY = trueEnv.includes(
  process.env?.NEXTJS_DISABLE_SENTRY ?? 'false'
);
const NEXTJS_SENTRY_UPLOAD_DRY_RUN = trueEnv.includes(
  process.env?.NEXTJS_SENTRY_UPLOAD_DRY_RUN ?? 'false'
);
const NEXTJS_SENTRY_DEBUG = trueEnv.includes(
  process.env?.NEXTJS_SENTRY_DEBUG ?? 'false'
);
const NEXTJS_SENTRY_TRACING = trueEnv.includes(
  process.env?.NEXTJS_SENTRY_TRACING ?? 'false'
);

/**
 * A way to allow CI optimization when the build done there is not used
 * to deliver an image or deploy the files.
 * @link https://nextjs.org/docs/advanced-features/source-maps
 *
 * If the SSG fallback is set to 'blocking' and the
 * source maps are in use in the prod build,
 * the getStaticProps gets called first time when the page
 * is rendered and not during the build time.
 * This can make some Apollo queries to fail, because the
 * source map file name is used as an id-param.
 */
const disableSourceMaps = trueEnv.includes(
  process.env?.NEXT_DISABLE_SOURCEMAPS ?? 'true'
);

if (disableSourceMaps) {
  // eslint-disable-next-line no-console
  console.warn(
    `${pc.yellow(
      'notice'
    )}- Sourcemaps generation have been disabled through NEXT_DISABLE_SOURCEMAPS`
  );
}

if (NEXTJS_SENTRY_DEBUG) {
  // eslint-disable-next-line no-console
  console.warn(
    `${pc.yellow(
      'notice'
    )}- Build won't use sentry treeshaking (NEXTJS_SENTRY_DEBUG)`
  );
}

// Tell webpack to compile those packages
// @link https://www.npmjs.com/package/next-transpile-modules
const tmModules = ['@events-helsinki/components'];

const projectFolder = process.cwd();

const componentsStylePath = [
  join(__dirname, './packages/components/'),
  join(projectFolder, './src/'),
];

const nextBaseConfig = ({
  packageJson,
  i18nRoutes,
  i18n,
  srcFolder,
  ...overrideConfig
}) => {
  /**
   * Determine if Turbopack is active (i.e., next dev --turbo)
   */
  const isTurbopackDev = process.env.TURBOPACK === '1' && isDevelopment;

  /**
   * @type {import('next').NextConfig}
   */
  let nextConfig = {
    reactStrictMode: true,
    cacheMaxMemorySize: 0,
    sassOptions: {
      includePaths: componentsStylePath,
    },
    productionBrowserSourceMaps: !disableSourceMaps,
    i18n,
    async rewrites() {
      return Object.entries(i18nRoutes).flatMap(([destination, sources]) =>
        sources.map(({ source, locale }) => ({
          destination: `/${locale}${destination}`,
          source: `/${locale}${source}`,
          locale: false,
        }))
      );
    },
    httpAgentOptions: {
      // @link https://nextjs.org/blog/next-11-1#builds--data-fetching
      keepAlive: true,
    },

    onDemandEntries: {
      // period (in ms) where the server will keep pages in the buffer
      maxInactiveAge: (isCI ? 3600 : 25) * 1000,
    },

    images: {
      domains: [new URL(process.env.CMS_ORIGIN).origin],
    },
    // Standalone build
    // @link https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files-experimental
    output: 'standalone',

    experimental: {
      // Prefer loading of ES Modules over CommonJS
      esmExternals: true,
      // Experimental monorepo support
      externalDir: true,
      scrollRestoration: true,
      outputFileTracingRoot: __dirname,
    },

    // 🚨 TURBOPACK CONFIGURATION
    // Explicitly set the root directory for monorepo support.
    turbopack: {
      root: __dirname,
    },

    typescript: {
      /** Do not run TypeScript during production builds (`next build`). */
      ignoreBuildErrors: NEXTJS_IGNORE_TYPECHECK,
      tsconfigPath: 'tsconfig.json',
    },

    eslint: {
      ignoreDuringBuilds: NEXTJS_IGNORE_ESLINT,
      dirs: ['src'],
    },

    async headers() {
      // Base CSP directives
      const cspDirectives = [
        "default-src 'self'",
        // FIXME: "'unsafe-inline'" in script-src is not good practise. It's currently required by HDS cookie consent.
        `script-src 'self' ${isDevelopment ? "'unsafe-eval'" : ''} 'unsafe-inline' https://webanalytics.digiaiiris.com *.reactandshare.com *.youtube.com *.googlesyndication.com *.google-analytics.com *.googletagmanager.com *.gstatic.com`,
        "style-src 'self' 'unsafe-inline' https://cdn.reactandshare.com",
        "img-src * 'self' data: https:",
        "font-src 'self' *.hel.fi *.hel.ninja fonts.gstatic.com https://cdn.reactandshare.com",
        "connect-src 'self' localhost:* 127.0.0.1:* *.hel.fi *.hel.ninja *.hkih.hion.dev *.digiaiiris.com",
        "object-src 'none'",
        "media-src 'self' *.hel.fi *.hel.ninja *.hkih.hion.dev",
        "manifest-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-src 'self' *.hel.fi *.hel.ninja www.youtube.com www.youtube-nocookie.com player.vimeo.com *.google.com",
        "frame-ancestors 'none'",
        "worker-src 'self'",
        'block-all-mixed-content',
        'upgrade-insecure-requests',
        // "report-to default", // Add a reporting endpoint in production
      ];

      // Join directives and clean up
      const cspHeader = cspDirectives.join('; ');

      return [
        {
          source: '/:path*',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-XSS-Protection', value: '0' },
            { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
            { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
            {
              key: 'Content-Security-Policy',
              value: cspHeader,
            },
          ],
        },
      ];
    },

    env: {
      APP_NAME: packageJson.name,
      APP_VERSION: packageJson.version,
      BUILD_TIME: new Date().toISOString(),
    },
    serverRuntimeConfig: {
      // to bypass https://github.com/zeit/next.js/issues/8251
      PROJECT_ROOT: __dirname,
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      federationRouter: process.env.FEDERATION_ROUTER_ENDPOINT,
      cmsOrigin: process.env.CMS_ORIGIN,
      linkedEvents: process.env.LINKEDEVENTS_EVENT_ENDPOINT,
    },
  };

  // 🚨 CONDITIONAL WEBPACK ASSIGNMENT
  // Define the webpack property object *only* when not using Turbopack.
  const webpackConfig = isTurbopackDev
    ? {}
    : {
        webpack: (config, { webpack, isServer }) => {
          if (!isServer) {
            // Fixes npm packages that depend on `fs` module
            // @link https://github.com/vercel/next.js/issues/36514#issuecomment-1112074589
            // @link https://stackoverflow.com/a/63074348/784642
            config.resolve.fallback = {
              ...config.resolve.fallback,
              fs: false,
              net: false,
              tls: false,
              child_process: false,
              perf_hooks: false,
            };
          }

          // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/tree-shaking/
          config.plugins.push(
            new webpack.DefinePlugin({
              __SENTRY_DEBUG__: NEXTJS_SENTRY_DEBUG,
              __SENTRY_TRACING__: NEXTJS_SENTRY_TRACING,
            })
          );

          // Removed custom SVG loader rule, relying on Next.js native SVGR support.
          return config;
        },
      };

  // Merge nextConfig with the conditional webpackConfig and user overrides.
  let config = { ...nextConfig, ...webpackConfig, ...overrideConfig };

  if (!NEXTJS_DISABLE_SENTRY) {
    // @ts-ignore because sentry does not match nextjs current definitions
    config = withSentryConfig(config, {
      // Additional config options for the Sentry Webpack plugin. Keep in mind that
      // the following options are set automatically, and overriding them is not
      // recommended:
      //   release, url, org, project, authToken, configFile, stripPrefix,
      //   urlPrefix, include, ignore
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options.
      // silent: isProd, // Suppresses all logs
      dryRun: NEXTJS_SENTRY_UPLOAD_DRY_RUN,
    });
  }

  if (tmModules.length > 0) {
    // eslint-disable-next-line no-console
    console.info(
      `${pc.green('notice')}- Will transpile [${tmModules.join(',')}]`
    );

    config.transpilePackages = tmModules;
  }

  if (process.env.ANALYZE === 'true') {
    const { withBundleAnalyzer } = bundleAnalyser({
      enabled: true,
    });

    config = withBundleAnalyzer(config);
  }

  return config;
};

export default nextBaseConfig;
