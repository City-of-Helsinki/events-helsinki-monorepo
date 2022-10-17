const { getDefaultIgnorePatterns } = require('./src/helpers');

module.exports = {
  root: true,
  ignorePatterns: [...getDefaultIgnorePatterns()],
  extends: ['./src/bases/typescript', './src/bases/prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json', 'package/tsconfig.json'],
      },
      node: {
        project: ['tsconfig.json', 'package/tsconfig.json'],
      },
    },
  },
};
