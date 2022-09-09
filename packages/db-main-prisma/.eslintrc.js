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
  ignorePatterns: [...getDefaultIgnorePatterns(), 'src/generated'],
  extends: [
    '@events-helsinki/eslint-config-bases/typescript',
    '@events-helsinki/eslint-config-bases/sonar',
    '@events-helsinki/eslint-config-bases/regexp',
    '@events-helsinki/eslint-config-bases/jest',
    // Apply prettier and disable incompatible rules
    '@events-helsinki/eslint-config-bases/prettier',
  ],
  rules: {
    // optional overrides per project
  },
  overrides: [
    // optional overrides per project file match
  ],
};
