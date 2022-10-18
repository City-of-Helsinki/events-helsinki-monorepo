// @ts-check

// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
const { withSentryConfig } = require('@sentry/nextjs');
const pc = require('picocolors');
const packageJson = require('./package.json');
const i18nRoutes = require('./i18nRoutes.config');
const { i18n } = require('./next-i18next.config');

// const enableCSP = true;
const trueEnv = ['true', '1', 'yes'];

// const isProd = process.env.NODE_ENV === 'production';
const isCI = trueEnv.includes(process.env?.CI ?? 'false');

// eslint-disable-next-line no-console
console.log('process.env',process.env);

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
 */
const disableSourceMaps = trueEnv.includes(
  process.env?.NEXT_DISABLE_SOURCEMAPS ?? 'false'
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
const tmModules = ['events-helsinki-components'];

// Example of setting up secure headers
// @link https://github.com/jagaapple/next-secure-headers
// const { createSecureHeaders } = require('next-secure-headers');
// const secureHeaders = createSecureHeaders({
//   contentSecurityPolicy: {
//     directives: enableCSP
//       ? {
//           defaultSrc: "'self'",
//           styleSrc: [
//             "'self'",
//             "'unsafe-inline'",
//             'https://unpkg.com/@graphql-yoga/graphiql/dist/style.css',
//             'https://meet.jitsi.si',
//             // 'https://8x8.vc',
//           ],
//           scriptSrc: [
//             "'self'",
//             "'unsafe-eval'",
//             "'unsafe-inline'",
//             'https://unpkg.com/@graphql-yoga/graphiql',
//             'https://meet.jit.si/external_api.js',
//             // 'https://8x8.vc/external_api.js',
//             // 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js',
//           ],
//           frameSrc: [
//             'https://meet.jit.si',
//             // 'https://8x8.vc',
//             // 'https://meetings.hubspot.com',
//           ],
//           connectSrc: [
//             "'self'",
//             'https://vitals.vercel-insights.com',
//             'https://*.sentry.io',
//             // 'wss://ws.pusherapp.com',
//             // 'wss://ws-eu.pusher.com',
//             // 'https://sockjs.pusher.com',
//             // 'https://sockjs-eu.pusher.com',
//           ],
//           imgSrc: ["'self'", 'https:', 'http:', 'data:'],
//           workerSrc: ['blob:'],
//         }
//       : {},
//   },
//   ...(enableCSP && process.env.NODE_ENV === 'production'
//     ? {
//         forceHTTPSRedirect: [
//           true,
//           { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true },
//         ],
//       }
//     : {}),
//   referrerPolicy: 'same-origin',
// });
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const componentsStylePath = [
  path.join(__dirname, '../../packages/components/'),
  path.join(__dirname, 'src/'),
];
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: componentsStylePath,
  },
  productionBrowserSourceMaps: !disableSourceMaps,
  i18n,
  async rewrites() {
    return Object.entries(i18nRoutes).flatMap(([destination, sources]) =>
      sources.map(({ source, locale }) => ({
        destination,
        source: `/${locale}${source}`,
        locale: false,
      }))
    );
  },
  optimizeFonts: true,
  httpAgentOptions: {
    // @link https://nextjs.org/blog/next-11-1#builds--data-fetching
    keepAlive: true,
  },

  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: (isCI ? 3600 : 25) * 1000,
  },

  // @link https://nextjs.org/docs/advanced-features/compiler#minification
  swcMinify: true,

  sentry: {
    hideSourceMaps: true,
  },
  images: {
    domains: [
      new URL(
        process.env.NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT ??
          'https://harrastus.hkih.stage.geniem.io/graphql'
      ).origin,
    ],
  },
  // Standalone build
  // @link https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files-experimental
  output: 'standalone',

  experimental: {
    browsersListForSwc: true,
    // Prefer loading of ES Modules over CommonJS
    // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
    // @link {https://github.com/vercel/next.js/discussions/27876|Discussion}
    esmExternals: true,
    // Experimental monorepo support
    // @link {https://github.com/vercel/next.js/pull/22867|Original PR}
    // @link {https://github.com/vercel/next.js/discussions/26420|Discussion}
    externalDir: true,
  },

  typescript: {
    /** Do not run TypeScript during production builds (`next build`). */
    ignoreBuildErrors: NEXTJS_IGNORE_TYPECHECK,
    tsconfigPath: './tsconfig.json',
  },

  eslint: {
    ignoreDuringBuilds: NEXTJS_IGNORE_ESLINT,
    dirs: ['src'],
  },

  async headers() {
    return [
      {
        // All page routes, not the api ones
        source: '/:path((?!api).*)*',
        headers: [
          // ...secureHeaders,
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
        ],
      },
    ];
  },

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

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: [
        {
          loader: '@svgr/webpack',
          // https://react-svgr.com/docs/webpack/#passing-options
          options: {
            svgo: true,
            // @link https://github.com/svg/svgo#configuration
            svgoConfig: {
              multipass: false,
              datauri: 'base64',
              js2svg: {
                indent: 2,
                pretty: false,
              },
            },
          },
        },
      ],
    });

    return config;
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
};

let config = nextConfig;

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

  const withNextTranspileModules = require('next-transpile-modules')(
    tmModules,
    {
      resolveSymlinks: true,
      debug: true,
    }
  );

  config = withNextTranspileModules(config);
}

if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });

  config = withBundleAnalyzer(config);
}

module.exports = config;
