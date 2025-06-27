/**
 * Custom config base for projects using prettier.
 * @see https://github.com/City-of-Helsinki/events-helsinki-monorepo/tree/main/packages/eslint-config-bases
 */
import prettierPlugin from 'eslint-plugin-prettier';
import getPrettierConfig from '../helpers/getPrettierConfig.js';

export default [
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': ['error', getPrettierConfig()],
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
];
