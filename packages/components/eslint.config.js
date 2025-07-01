/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig, globalIgnores } = require('eslint/config');

const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});
require('@events-helsinki/eslint-config-bases/patch/modern-module-resolution');

const {
  getDefaultIgnorePatterns,
} = require('@events-helsinki/eslint-config-bases/helpers');

module.exports = defineConfig([
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
    },

    extends: compat.extends(
      '@events-helsinki/eslint-config-bases/typescript',
      '@events-helsinki/eslint-config-bases/regexp',
      // FIXME: sonar not ready for eslint v9. See: https://github.com/SonarSource/eslint-plugin-sonarjs/issues/438.
      // "@events-helsinki/eslint-config-bases/sonar",
      '@events-helsinki/eslint-config-bases/jest',
      '@events-helsinki/eslint-config-bases/rtl',
      '@events-helsinki/eslint-config-bases/storybook',
      '@events-helsinki/eslint-config-bases/react',
      '@events-helsinki/eslint-config-bases/prettier',
      '@events-helsinki/eslint-config-bases/stylistic',
      'plugin:storybook/recommended'
    ),

    rules: {
      'no-console': 'error',
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  globalIgnores([
    ...getDefaultIgnorePatterns(),
    'storybook-static',
    '**/generated/*',
  ]),
]);
