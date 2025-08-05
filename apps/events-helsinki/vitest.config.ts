/// <reference types="vitest" />
import path from 'path';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { defineConfig, configDefaults } from 'vitest/config';

// Load your tsconfig for path aliases
import tsConfig from './tsconfig.json';

const {
  compilerOptions: { paths },
} = tsConfig;

/**
 * Manually converts TypeScript path aliases from tsconfig.json
 * to Vite's resolve.alias format.
 *
 * @param tsPaths The 'paths' object from tsconfig.json.
 * @param basePath The base directory to resolve paths against (e.g., __dirname).
 * @returns An array of Vite alias objects.
 */
function convertTsPathsToViteAliases(
  tsPaths: Record<string, string[]>,
  basePath: string
) {
  const aliases: { find: string | RegExp; replacement: string }[] = [];
  const resolvedBase = path.resolve(basePath);

  for (const key in tsPaths) {
    if (Object.prototype.hasOwnProperty.call(tsPaths, key)) {
      const value = tsPaths[key][0]; // Assuming the first path is the primary one

      let find: string | RegExp;
      let replacement: string;

      // Handle wildcard paths (e.g., "@/*": ["src/*"])
      if (key.endsWith('/*')) {
        find = new RegExp(`^${key.replace(/\*/, '(.*)')}$`); // Convert "@/*" to "^@/(.*)$"
        replacement = path.join(resolvedBase, value.replace(/\*/, '$1')); // Replace "src/*" with "src/$1"
      } else {
        // Handle exact paths (e.g., "@components": ["src/components"])
        find = key;
        replacement = path.join(resolvedBase, value);
      }
      aliases.push({ find, replacement });
    }
  }
  return aliases;
}

const aliasPaths = paths
  ? convertTsPathsToViteAliases(paths, path.resolve(__dirname, './src'))
  : [];

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(), // CSS transformation: CSS/Image handling in Jest's transform.
  ],
  test: {
    environment: 'jsdom',
    globals: true, // Makes test, expect, vi global
    setupFiles: ['./vitest-setup.ts'],
    cache: {
      dir: '../../.cache/events-helsinki/vitest', // Vitest specific cache
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
      ...aliasPaths,

      // Other specific aliases (CSS, images)
      {
        find: '.+\\.(css|styl|less|sass|scss)$',
        replacement: 'identity-obj-proxy',
      },
      {
        find: '^.+\\.(jpg|jpeg|png|gif|webp|svg)$',
        replacement: path.resolve(__dirname, './.vitest/__mocks__/fileMock.js'),
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
});
