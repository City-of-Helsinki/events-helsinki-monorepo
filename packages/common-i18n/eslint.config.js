import { globalIgnores } from 'eslint/config';
import { getDefaultIgnorePatterns } from '@events-helsinki/eslint-config-bases/helpers';
import {
  prettier,
  stylistic,
  typescript,
} from '@events-helsinki/eslint-config-bases';

export default [
  ...typescript,
  ...prettier,
  ...stylistic,
  globalIgnores([...getDefaultIgnorePatterns()]),
];
