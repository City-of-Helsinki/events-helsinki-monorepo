/**
 * Opinionated config base for projects using react.
 * @see https://github.com/City-of-Helsinki/events-helsinki-monorepo/tree/main/packages/eslint-config-bases
 */

import testcafeCommunity from 'eslint-plugin-testcafe-community';

const reactPatterns = {
  files: ['browser-tests/**/*.ts'],
};

export default [
  {
    files: [...reactPatterns.files],
    plugins: { 'testcafe-community': testcafeCommunity },
    rules: {
      'testcafe-community/missing-expect': 'off',
      '@typescript-eslint/naming-convention': 'off',
    },
  },
];
