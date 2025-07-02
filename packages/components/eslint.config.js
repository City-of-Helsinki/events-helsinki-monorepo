import jest from '@events-helsinki/eslint-config-bases/src/bases/jest.js';
// import storybook from '@events-helsinki/eslint-config-bases/src/bases/storybook.js';
import prettier from '@events-helsinki/eslint-config-bases/src/bases/prettier.js';
import react from '@events-helsinki/eslint-config-bases/src/bases/react.js';
import regexp from '@events-helsinki/eslint-config-bases/src/bases/regexp.js';
import rtl from '@events-helsinki/eslint-config-bases/src/bases/rtl.js';
import sonar from '@events-helsinki/eslint-config-bases/src/bases/sonar.js';
import stylistic from '@events-helsinki/eslint-config-bases/src/bases/stylistic.js';
import typescript from '@events-helsinki/eslint-config-bases/src/bases/typescript.js';
import { getDefaultIgnorePatterns } from '@events-helsinki/eslint-config-bases/src/helpers/index.js';

import { globalIgnores } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  ...typescript,
  ...regexp,
  ...jest,
  ...rtl,
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
];
