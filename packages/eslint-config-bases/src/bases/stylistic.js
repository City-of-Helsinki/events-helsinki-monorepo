// eslint.config.js

const stylisticPatterns = {
  files: ['*.{js,jsx,jsx,tsx}'],
};

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  overrides: [
    {
      files: stylisticPatterns.files,
      plugins: ['@stylistic/eslint-plugin'],
      rules: {
        '@stylistic/max-len': ['warn', { code: 120, tabWidth: 2 }],
      },
    },
  ],
};
