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
  ignorePatterns: [...getDefaultIgnorePatterns(), '.out'],
  extends: [
    // 'next',
    '@events-helsinki/eslint-config-bases/typescript',
    '@events-helsinki/eslint-config-bases/sonar',
    '@events-helsinki/eslint-config-bases/regexp',
    '@events-helsinki/eslint-config-bases/jest',
    '@events-helsinki/eslint-config-bases/react',
    '@events-helsinki/eslint-config-bases/rtl',

    '@events-helsinki/eslint-config-bases/graphql-schema',
    // Apply prettier and disable incompatible rules
    '@events-helsinki/eslint-config-bases/prettier',
    '@events-helsinki/eslint-config-bases/testcafe',
  ],
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    'jest/no-commented-out-tests': 'off',
    'jest/no-disabled-tests': 'off',
    // "max-len": ["warn", { "code": 120 }],
    'no-console': 'error',
  },
  overrides: [
    {
      files: ['src/schema/**/*.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            // Fine-tune naming convention for graphql resolvers and allow PascalCase
            selector: ['objectLiteralProperty'],
            format: ['camelCase', 'PascalCase'],
          },
        ],
      },
    },
  ],
};
