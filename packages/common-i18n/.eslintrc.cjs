/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/City-of-Helsinki/events-helsinki-monorepo/blob/main/docs/about-linters.md
 */

const {
  getDefaultIgnorePatterns,
} = require('@events-helsinki/eslint-config-bases/helpers');

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
    },
  },
  ignorePatterns: [...getDefaultIgnorePatterns()],
  extends: [
    '@events-helsinki/eslint-config-bases/typescript',
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
