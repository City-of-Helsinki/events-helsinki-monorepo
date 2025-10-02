/// <reference types="vitest" />
import path from 'path';
import { loadEnv } from 'vite';
import { defineConfig, configDefaults } from 'vitest/config';

const projectRoot = path.resolve(__dirname);

export default defineConfig(({ mode }) => ({
  cacheDir: '../../.cache/events-helsinki-components',
  plugins: [
    {
      // Suppress sourcemap warnings that can't be suppressed at console/stdout/stderr level
      //
      // See:
      // - https://github.com/vitejs/rolldown-vite/blob/v7.0.4/packages/vite/src/node/server/sourcemap.ts#L81
      // - https://github.com/vitest-dev/vitest/issues/7976
      name: 'suppress-sourcemap-warnings',
      configureServer(server) {
        const originalWarnOnce = server.config.logger.warnOnce;

        server.config.logger.warnOnce = (msg, options) => {
          if (/^Sourcemap for .* points to missing source files$/.test(msg)) {
            return;
          }
          originalWarnOnce(msg, options);
        };
      },
    },
  ],
  test: {
    environment: 'jsdom',
    // mode defines what ".env.{mode}" file to choose if exists
    env: loadEnv(mode, process.cwd(), ''),
    globals: true, // Makes test, expect, vi global
    setupFiles: [
      './vitest-setup.ts',
      // 'dotenv/config'
    ],
    include: ['src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
    exclude: [...configDefaults.exclude, './.next/', '/__mocks__/'],
    reporters: ['json', 'verbose', 'vitest-sonar-reporter'],
    outputFile: {
      json: 'sonar-report.json',
      'vitest-sonar-reporter': 'sonar-report.xml',
    },
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['lcov', 'html', 'text'],
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: [
        'src/**/*.test.ts',
        '**/*.d.ts',
        '**/*.json',
        '**/*.xml',
        '**/*.yaml',
        '**/*.md',
        '**/*.html',
        '**/*.css',
        '**/*.properties',
        '*.config.*js',
        'node_modules/',
        'browser-tests/',
        'build/',
        'codegen.ts',
        'src/index.tsx',
        '**/__tests__/**',
        '**/__snapshots__/**',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/query.ts',
        'src/assets/**',
        'src/styles/**',
        'src/types/**',
        '**/*.query.ts',
        '**/*Icon.tsx',
        '**/*Icon.ts',
        'src/loggers/**',
        'src/i18n.ts',
        'async-message.tsx',
        '**/*.stories.tsx',
        'src/components/document/Document.tsx',
      ],
    },
  },
  resolve: {
    alias: [
      {
        find: /@\/test-utils\/(.*)/,
        replacement: path.resolve(projectRoot, './config/tests/$1'),
      },
      {
        find: '@/test-utils',
        replacement: path.resolve(projectRoot, './config/tests/index.ts'),
      },
      {
        find: /@events-helsinki\/common-i18n\/(.*)/,
        replacement: path.resolve(projectRoot, '../../packages/common-i18n/$1'),
      },
      {
        find: '@events-helsinki/common-i18n',
        replacement: path.resolve(
          projectRoot,
          '../../packages/common-i18n/src/index.ts'
        ),
      },
      // Add a mock for https, since it does not work properly with vitest.
      {
        find: 'https',
        replacement: path.resolve(
          __dirname,
          './.vitest/__mocks__/node-builtins/https.js'
        ),
      },
    ],
  },
}));
