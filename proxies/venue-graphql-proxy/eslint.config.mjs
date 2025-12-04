import { globalIgnores } from 'eslint/config';

import { getDefaultIgnorePatterns } from '@events-helsinki/eslint-config-bases/helpers';

import {
  vitest,
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

export default [
  ...typescript,
  ...sonar,
  ...regexp,
  ...vitest,
  ...react,
  ...reactTestingLibrary,
  ...graphqlSchema,
  ...prettier,
  ...testcafe,
  ...stylistic,
  {
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      'vitest/no-disabled-tests': 'off',
      'no-console': 'error',
    },
  },
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
  globalIgnores([
    ...getDefaultIgnorePatterns(),
    '**/.out',
    '**/config',
    'src/types',
  ]),
];
