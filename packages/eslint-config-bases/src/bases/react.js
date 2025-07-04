/**
 * Opinionated config base for projects using react.
 * @see https://github.com/City-of-Helsinki/events-helsinki-monorepo/tree/main/packages/eslint-config-bases
 */

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const reactPatterns = {
  files: ['**/*.{js,jsx,ts,tsx}'],
};

export default [
  {
    files: reactPatterns.files,
    plugins: {
      react,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
      'react/no-unescaped-entities': ['error', { forbid: ['>'] }],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      // Fine-tune naming convention react typescript jsx (function components)
      // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['function'],
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
      ],
    },
  },
  {
    files: reactPatterns.files,
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      //   'react-hooks/rules-of-hooks': 'error',
      //   'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
