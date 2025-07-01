const { defineConfig, globalIgnores } = require('eslint/config');

const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const { getDefaultIgnorePatterns } = require('./src/helpers');

module.exports = defineConfig([
  {
    extends: compat.extends('./src/bases/typescript', './src/bases/prettier'),

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
  },
  globalIgnores([...getDefaultIgnorePatterns()]),
]);
