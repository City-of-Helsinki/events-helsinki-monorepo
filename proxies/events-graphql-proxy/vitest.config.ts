/// <reference types="vitest" />
import path from 'path';
import { loadEnv } from 'vite';
import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig(({ mode }) => ({
  cacheDir: '../../.cache/events-graphql-proxy',
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
        'src/.next/**',
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
      ],
    },
  },
  resolve: {
    alias: [
      {
        find: '@events-helsinki/graphql-proxy-server/$',
        replacement: path.resolve(
          __dirname,
          '../../packages/graphql-proxy-server/src/$1'
        ),
      },
      {
        find: '@events-helsinki/graphql-proxy-server',
        replacement: path.resolve(
          __dirname,
          '../../packages/graphql-proxy-server/src/index.js'
        ),
      },
    ],
  },
}));
