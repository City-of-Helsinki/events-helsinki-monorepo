/// <reference types="vitest" />
import path from 'path';
import { loadEnv } from 'vite';
import { defineConfig, configDefaults } from 'vitest/config';

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
      dir: '../../.cache/venue-graphql-proxy/vitest', // Vitest specific cache
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
