/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/City-of-Helsinki/events-helsinki-monorepo/blob/main/docs/about-linters.md
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
    '/storybook-static',
    '**/generated/*',
  ],
  extends: [
    '@events-helsinki/eslint-config-bases/typescript',
    '@events-helsinki/eslint-config-bases/regexp',
    '@events-helsinki/eslint-config-bases/sonar',
    '@events-helsinki/eslint-config-bases/jest',
    '@events-helsinki/eslint-config-bases/rtl',
    '@events-helsinki/eslint-config-bases/storybook',
    '@events-helsinki/eslint-config-bases/react',
    '@events-helsinki/eslint-config-bases/prettier',
    'plugin:storybook/recommended',
  ],
  rules: {
    // optional overrides per project
    'no-console': 'error',
    '@typescript-eslint/naming-convention': 'off',
  },
  overrides: [
    // optional overrides per project file match
  ],
};
