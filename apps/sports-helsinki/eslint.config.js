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
        "plugin:@next/next/core-web-vitals",
        "@events-helsinki/eslint-config-bases/prettier",
        "@events-helsinki/eslint-config-bases/testcafe",
    ),

    rules: {
        "@next/next/no-img-element": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "@typescript-eslint/naming-convention": "off",
        "jest/no-commented-out-tests": "off",
        "jest/no-disabled-tests": "off",
        "no-console": "error",
        "testing-library/no-unnecessary-act": "warn",
    },
}, globalIgnores([...getDefaultIgnorePatterns(), "**/.next", "**/.out"]), {
    files: ["src/pages/\\_*.{ts,tsx}"],

    rules: {
        "react/display-name": "off",
    },
}, {
    files: ["src/backend/**/*graphql*schema*.ts"],

    rules: {
        "@typescript-eslint/naming-convention": ["warn", {
            selector: ["objectLiteralProperty"],
            format: ["camelCase", "PascalCase"],
        }],
    },
}]);
