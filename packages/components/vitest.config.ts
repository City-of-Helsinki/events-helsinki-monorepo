/// <reference types="vitest" />
import path from 'path';
import { loadEnv } from 'vite';
import { defineConfig, configDefaults } from 'vitest/config';

const projectRoot = path.resolve(__dirname);

export default defineConfig(({ mode }) => ({
  plugins: [],
  test: {
    environment: 'jsdom',
    // mode defines what ".env.{mode}" file to choose if exists
    env: loadEnv(mode, process.cwd(), ''),
    globals: true, // Makes test, expect, vi global
    setupFiles: [
      './vitest-setup.ts',
      // 'dotenv/config'
    ],
    cache: {
      dir: '../../.cache/events-helsinki-components/vitest', // Vitest specific cache
    },
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
        'src/edge-runtime-compatible/**',
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
