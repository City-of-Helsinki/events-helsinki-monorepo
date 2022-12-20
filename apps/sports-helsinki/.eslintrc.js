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
  ignorePatterns: [...getDefaultIgnorePatterns(), '.next', '.out'],
  extends: [
    // 'next',
    '@events-helsinki/eslint-config-bases/typescript',
    '@events-helsinki/eslint-config-bases/sonar',
    '@events-helsinki/eslint-config-bases/regexp',
    '@events-helsinki/eslint-config-bases/jest',
    '@events-helsinki/eslint-config-bases/react',
    '@events-helsinki/eslint-config-bases/rtl',

    '@events-helsinki/eslint-config-bases/graphql-schema',
    // Add specific rules for nextjs
    'plugin:@next/next/core-web-vitals',
    // Apply prettier and disable incompatible rules
    '@events-helsinki/eslint-config-bases/prettier',
    '@events-helsinki/eslint-config-bases/testcafe',
  ],
  rules: {
    // https://github.com/vercel/next.js/discussions/16832
    '@next/next/no-img-element': 'off',
    // For the sake of example
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'jest/no-commented-out-tests': 'off',
    'jest/no-disabled-tests': 'off',
    // "max-len": ["warn", { "code": 120 }],
    'no-console': 'error',
    'testing-library/no-unnecessary-act': 'warn',
    // FIXME: don't set graphql linters off
    // '@graphql-eslint/no-unreachable-types': 'off',
    // '@graphql-eslint/strict-id-in-types': 'off',
  },
  overrides: [
    {
      files: ['src/pages/\\_*.{ts,tsx}'],
      rules: {
        'react/display-name': 'off',
      },
    },
    {
      files: ['src/backend/**/*graphql*schema*.ts'],
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
