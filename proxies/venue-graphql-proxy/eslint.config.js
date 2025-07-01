const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});
require("@events-helsinki/eslint-config-bases/patch/modern-module-resolution");

const {
    getDefaultIgnorePatterns,
} = require("@events-helsinki/eslint-config-bases/helpers");

module.exports = defineConfig([{
    languageOptions: {
        parserOptions: {
            tsconfigRootDir: __dirname,
            project: "tsconfig.json",
        },
    },

    extends: compat.extends(
        "@events-helsinki/eslint-config-bases/typescript",
        "@events-helsinki/eslint-config-bases/sonar",
        "@events-helsinki/eslint-config-bases/regexp",
        "@events-helsinki/eslint-config-bases/jest",
        "@events-helsinki/eslint-config-bases/react",
        "@events-helsinki/eslint-config-bases/rtl",
        "@events-helsinki/eslint-config-bases/graphql-schema",
        "@events-helsinki/eslint-config-bases/prettier",
        "@events-helsinki/eslint-config-bases/testcafe",
    ),

    rules: {
        "@typescript-eslint/naming-convention": "off",
        "jest/no-commented-out-tests": "off",
        "jest/no-disabled-tests": "off",
        "no-console": "error",
    },
}, globalIgnores([...getDefaultIgnorePatterns(), "**/.out"]), {
    files: ["src/schema/**/*.ts"],

    rules: {
        "@typescript-eslint/naming-convention": ["warn", {
            selector: ["objectLiteralProperty"],
            format: ["camelCase", "PascalCase"],
        }],
    },
}, globalIgnores(["**/config", "src/types"])]);
