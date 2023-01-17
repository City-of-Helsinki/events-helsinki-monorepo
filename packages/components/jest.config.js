// @ts-check
const { pathsToModuleNameMapper } = require('ts-jest');

const { getJestCachePath } = require('../../cache.config');

const packageJson = require('./package.json');
const { compilerOptions: baseTsConfig } = require('./tsconfig.json');

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
  displayName: `${packageJson.name}:unit`,
  cacheDirectory: getJestCachePath(packageJson.name),
  testEnvironment: 'jsdom',
  verbose: true,
  rootDir: './src',

  transform: {
    // if we would use .babelrc, next would not use swc compiler
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      { configFile: './babel.config.test.json' },
    ],
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/../.jest/setupTests.ts',
  ],
  testMatch: ['<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  testTimeout: 50000, // ms
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
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: './tsconfig.jest.json',
    },
  },
  transformIgnorePatterns: ['/node_modules/', '/__mocks__/'],
};

module.exports = config;
