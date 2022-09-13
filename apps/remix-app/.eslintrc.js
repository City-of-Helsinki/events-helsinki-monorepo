/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-linters.md
 */

// Workaround for https://github.com/eslint/eslint/issues/3458 (re-export of @rushstack/eslint-patch)
require('@events-helsinki/eslint-config-bases/patch/modern-module-resolution');

const {
  getDefaultIgnorePatterns,
} = require('@events-helsinki/eslint-config-bases/helpers');

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: [
    ...getDefaultIgnorePatterns(),
    'public/build',
    'api/index.js',
    'api/index.js.map',
    '.cache',
  ],
  extends: [
    '@events-helsinki/eslint-config-bases/typescript',
    '@events-helsinki/eslint-config-bases/sonar',
    '@events-helsinki/eslint-config-bases/regexp',
    '@events-helsinki/eslint-config-bases/jest',
    '@events-helsinki/eslint-config-bases/react',
    '@events-helsinki/eslint-config-bases/tailwind',
    '@events-helsinki/eslint-config-bases/rtl',
    '@events-helsinki/eslint-config-bases/graphql-schema',
    // Specific rules for remix
    '@remix-run/eslint-config',
    // Apply prettier and disable incompatible rules
    '@events-helsinki/eslint-config-bases/prettier',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {},
  overrides: [],
};
