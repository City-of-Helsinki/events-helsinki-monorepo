import { globalIgnores } from 'eslint/config';

import { getDefaultIgnorePatterns } from '@events-helsinki/eslint-config-bases/helpers';
import {
  prettier,
  stylistic,
  typescript,
  reactTestingLibrary,
  testcafe,
} from '@events-helsinki/eslint-config-bases';

export default [
  ...typescript,
  ...prettier,
  ...stylistic,
  ...reactTestingLibrary,
  ...testcafe,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-console': 'warn',
    },
  },
  globalIgnores([...getDefaultIgnorePatterns()]),
];
