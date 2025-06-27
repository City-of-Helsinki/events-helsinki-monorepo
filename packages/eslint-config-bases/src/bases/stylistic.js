// eslint.config.js
import stylistic from '@stylistic/eslint-plugin';

const stylisticPatterns = {
  files: ['**/*.{js,jsx,ts,tsx}'],
};

export default [
  {
    files: stylisticPatterns.files,
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/max-len': ['warn', { code: 120, tabWidth: 2 }],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/spaced-comment': [
        'error',
        'always',
        {
          line: {
            markers: ['/'],
            exceptions: ['-', '+'],
          },
          block: {
            markers: ['!'],
            exceptions: ['*'],
            balanced: true,
          },
        },
      ],
      '@stylistic/no-empty-function': 'off',
    },
  },
];
