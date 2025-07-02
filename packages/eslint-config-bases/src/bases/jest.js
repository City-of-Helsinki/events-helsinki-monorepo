/**
 * Custom config base for projects using jest.
 * @see https://github.com/City-of-Helsinki/events-helsinki-monorepo/tree/main/packages/eslint-config-bases
 */
import jest from 'eslint-plugin-jest';

const jestPatterns = {
  files: ['**/?(*.)+(test).{js,jsx,ts,tsx}'],
};

export default [
  {
    // Perf: To ensure best performance enable eslint-plugin-jest for test files only.
    files: jestPatterns.files,
    plugins: {
      jest,
    },
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['recommended'].rules,
      'jest/prefer-hooks-in-order': 'error',
      'jest/prefer-hooks-on-top': 'error',
      'jest/no-duplicate-hooks': 'error',
      'jest/no-test-return-statement': 'error',
      'jest/prefer-strict-equal': 'error',
      'jest/prefer-to-have-length': 'error',
      'jest/consistent-test-it': ['error', { fn: 'it' }],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-object-literal-type-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];
