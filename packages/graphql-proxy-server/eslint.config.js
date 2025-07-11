import {
  vitest,
  // storybook,
  prettier,
  react,
  regexp,
  reactTestingLibrary,
  sonar,
  stylistic,
  typescript,
  graphqlSchema,
  testcafe,
} from '@events-helsinki/eslint-config-bases';
import { getDefaultIgnorePatterns } from '@events-helsinki/eslint-config-bases/helpers';
import { globalIgnores } from 'eslint/config';

export default [
  ...typescript,
  ...regexp,
  ...vitest,
  ...reactTestingLibrary,
  ...testcafe,
  // ...storybook,
  ...sonar,
  ...react,
  ...graphqlSchema,
  ...prettier,
  ...stylistic,
  {
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      'vitest/no-commented-out-tests': 'off',
      'vitest/no-disabled-tests': 'off',
      'no-console': 'error',
    },
  },
  globalIgnores([...getDefaultIgnorePatterns(), '**/.out', '**/config']),
  {
    files: ['src/schema/**/*.ts'],

    rules: {
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: ['objectLiteralProperty'],
          format: ['camelCase', 'PascalCase'],
        },
      ],
    },
  },
];
