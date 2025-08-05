/**
 * Opinionated config base for projects using react-testing-library
 * @see https://github.com/City-of-Helsinki/events-helsinki-monorepo/tree/main/packages/eslint-config-bases
 */
import testingLibrary from 'eslint-plugin-testing-library';

const rtlPatterns = {
  files: ['**/?(*.)+(test).{js,jsx,ts,tsx}'],
};

export default [
  {
    // For performance enable react-testing-library only on test files
    files: rtlPatterns.files,
    plugins: {
      'testing-library': testingLibrary,
    },
    rules: {
      'testing-library/no-node-access': 'off',
    },
  },
  {
    files: ['**/test-utils.tsx'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/export': 'off',
    },
  },
];
