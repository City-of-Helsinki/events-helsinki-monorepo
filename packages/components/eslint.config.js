import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
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
import { getDefaultIgnorePatterns } from '@events-helsinki/eslint-config-bases/helpers';

import { globalIgnores } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
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
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'error',
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  globalIgnores([
    ...getDefaultIgnorePatterns(),
    'storybook-static',
    '**/generated/*',
  ]),
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
  }
];
