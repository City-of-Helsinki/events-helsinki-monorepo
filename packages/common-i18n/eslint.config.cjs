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

    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                paths: ["src"],
            },
        },
    },

    extends: compat.extends(
        "@events-helsinki/eslint-config-bases/typescript",
        "@events-helsinki/eslint-config-bases/prettier",
    ),

    rules: {},
}, globalIgnores([...getDefaultIgnorePatterns()])]);
