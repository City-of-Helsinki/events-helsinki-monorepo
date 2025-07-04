/**
 * Opinionated config base for projects that enable sonarjs
 * @see https://github.com/City-of-Helsinki/events-helsinki-monorepo/tree/main/packages/eslint-config-bases
 */
import sonarjs from 'eslint-plugin-sonarjs';

const sonarPatterns = {
  files: ['*.{js,jsx,ts,tsx}'],
  excludedFiles: [
    '**/?(*.)+(test).{js,jsx,ts,tsx}',
    '*.stories.{js,ts,jsx,tsx}',
  ],
};

export default [
  {
    files: sonarPatterns.files,
    // excludedFiles: sonarPatterns.excludedFiles,
    plugins: { sonarjs },
    rules: {
      'sonarjs/no-nested-template-literals': 'off',
    },
  },
  {
    files: ['*.{jsx,tsx}'],
    rules: {
      // relax complexity for react code
      'sonarjs/cognitive-complexity': ['error', 15],
      // relax duplicate strings
      'sonarjs/no-duplicate-string': 'off',
    },
  },
  {
    // relax javascript code as it often contains obscure configs
    files: ['*.js', '*.cjs', '*.mjs'],
    rules: {
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-all-duplicated-branches': 'off',
    },
  },
];
