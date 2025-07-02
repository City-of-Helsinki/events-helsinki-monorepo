// @ts-check
import { pathsToModuleNameMapper } from 'ts-jest';

import { getJestCachePath } from '../../cache.config';

import { name } from './package.json';
import { compilerOptions as baseTsConfig } from './tsconfig.json';

// Take the paths from tsconfig automatically from base tsconfig.json
// @link https://kulshekhar.github.io/ts-jest/docs/paths-mapping
const getTsConfigBasePaths = () => {
  return baseTsConfig.paths
    ? pathsToModuleNameMapper(baseTsConfig.paths, {
        prefix: '<rootDir>/',
      })
    : {};
};
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  displayName: `${name}:unit`,
  cacheDirectory: getJestCachePath(name),
  testEnvironment: 'jsdom',
  verbose: true,
  rootDir: './src',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2021',
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/../.jest/setupTests.ts',
  ],
  testMatch: ['<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': `<rootDir>/../.jest/__mocks__/fileMock.js`,
    ...getTsConfigBasePaths(),
  },
  // false by default, overrides in cli, ie: yarn test:unit --collect-coverage=true
  collectCoverage: false,
  coverageDirectory: '<rootDir>/../coverage',
  collectCoverageFrom: ['<rootDir>/**/*.{ts,tsx,js,jsx}', '!**/*.test.ts'],
  transformIgnorePatterns: ['/node_modules/', '/__mocks__/'],
};

export default config;
