import { globalIgnores } from 'eslint/config';

import typescript from './src/bases/typescript.js';
import prettier from './src/bases/prettier.js';

import { getDefaultIgnorePatterns } from './src/helpers/index.js';

export default [
  ...typescript,
  ...prettier,
  globalIgnores([...getDefaultIgnorePatterns()]),
];
