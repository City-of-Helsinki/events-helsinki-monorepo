/**
 * Opinionated config base for projects using react.
 * @see https://github.com/City-of-Helsinki/events-helsinki-monorepo/tree/main/packages/eslint-config-bases
 */

const reactPatterns = {
  files: ['browser-tests/**/*.ts'],
};

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  overrides: [
    {
      files: [...reactPatterns.files],
      plugins: ['testcafe-community'],
      extends: ['plugin:testcafe-community/recommended'],
      rules: {
        'testcafe-community/missing-expect': 'off',
      },
    },
  ],
};
