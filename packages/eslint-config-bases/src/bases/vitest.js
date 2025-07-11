/**
 * Custom config base for projects using vitest.
 * @see https://github.com/City-of-Helsinki/events-helsinki-monorepo/tree/main/packages/eslint-config-bases
 */
import vitest from '@vitest/eslint-plugin';

const vitestPatterns = {
  files: ['**/?(*.)+(test).{js,jsx,ts,tsx}'],
};

export default [
  {
    // Perf: To ensure best performance enable eslint-plugin-vitest for test files only.
    files: vitestPatterns.files,
    plugins: {
      vitest,
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/prefer-hooks-in-order': 'error',
      'vitest/prefer-hooks-on-top': 'error',
      'vitest/no-duplicate-hooks': 'error',
      'vitest/no-test-return-statement': 'error',
      'vitest/prefer-strict-equal': 'error',
      'vitest/prefer-to-have-length': 'error',
      'vitest/consistent-test-it': ['error', { fn: 'it' }],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-object-literal-type-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];
