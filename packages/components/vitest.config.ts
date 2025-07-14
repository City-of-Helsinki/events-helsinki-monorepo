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
    include: ['src/**/*.{spec,test}.{js,jsx,ts,tsx}'], // Match your Jest testMatch
    exclude: [...configDefaults.exclude, './.next/', '/__mocks__/'],
    // Optional: Configure coverage if needed (equivalent to Jest's collectCoverageFrom, coverageDirectory)
    // coverage: {
    //   provider: 'v8', // or 'istanbul'
    //   reporter: ['json', 'html', 'text'],
    //   include: ['src/**/*.{ts,tsx,js,jsx}'],
    //   exclude: [
    //     'src/**/*.test.ts',
    //     'src/.next/**',
    //     // Add other patterns from Jest's coveragePathIgnorePatterns if needed
    //     // Be careful with node_modules here, Vitest handles them differently
    //   ],
    // },
    // deps: {
    //   interopDefault: true, // Helps with CommonJS default exports
    // Force these packages to be transformed
    //   inline: ['react-helsinki-headless-cms', '@apollo/client', '@next/env'],
    // },
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
