// @ts-check
const { defaults: tsjPreset } = require('ts-jest/presets');
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
  // @ts-ignore
  transform: {
    ...tsjPreset.transform,
  },
  setupFilesAfterEnv: ['<rootDir>/../.jest/setupTests.ts'],
  testMatch: ['<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  testTimeout: 50000, // ms
  moduleNameMapper: {
    ...getTsConfigBasePaths(),
  },
  // false by default, overrides in cli, ie: yarn test:unit --collect-coverage=true
  collectCoverage: false,
  coverageDirectory: '<rootDir>/../coverage',
  collectCoverageFrom: ['<rootDir>/**/*.{ts,js}', '!**/*.test.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/../config/', '<rootDir>/../.jest/'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsconfig: './tsconfig.jest.json',
    },
  },
};

module.exports = config;
