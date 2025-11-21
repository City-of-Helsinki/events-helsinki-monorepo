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
} from '@events-helsinki/eslint-config-bases';

import nextPlugin from '@next/eslint-plugin-next';
import a11yPlugin from 'eslint-plugin-jsx-a11y';

import { globalIgnores } from 'eslint/config';

import { getDefaultIgnorePatterns } from '@events-helsinki/eslint-config-bases/helpers';

export default [
  ...typescript,
  ...regexp,
  ...vitest,
  ...reactTestingLibrary,
  // ...storybook,
  ...sonar,
  ...react,
  ...prettier,
  ...stylistic,
  {
    plugins: {
      next: nextPlugin,
      'jsx-a11y': a11yPlugin,
    },
    rules: {
      '@next/next/no-img-element': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'vitest/no-commented-out-tests': 'off',
      'vitest/no-disabled-tests': 'off',
      'no-console': 'error',
    },
  },
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
          selector: ['objectLiteralProperty'],
          format: ['camelCase', 'PascalCase'],
        },
      ],
    },
  },
  globalIgnores([...getDefaultIgnorePatterns(), '**/.next', '**/.out']),
];
