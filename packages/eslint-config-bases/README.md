# @events-helsinki/eslint-config-bases

<p align="left">
  <a aria-label="Build" href="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions">
    <img alt="build" src="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions/workflows/ci-packages.yml/badge.svg?label=CI&logo=github&style=flat-quare&labelColor=000000" />
  </a>
</p>

# About

Composable eslint config bases that can be easily shared and fine-tuned by apps and
packages that lives in a [monorepo](https://github.com/City-of-Helsinki/events-helsinki-monorepo).

## Features

## Features

- **Monorepo friendly:** Each workspace can have its own config.
- **Composable:** Compose your workspace eslint config from pre-defined bases.
- **Extensible:** Easily add additional plugins per workspaces (ie: nextjs, remix...)
- **Performance:** Plugins enabled on file conventions patterns to increase perf.

## Install

Add the following devDependencies to workspace (apps/packages in monorepo) or main project package.json.

```bash
$ yarn add --dev eslint
$ yarn add --dev @events-helsinki/eslint-config-bases:"workspace:^"
```

> **Tip** the [workspace:^](https://yarnpkg.com/features/workspaces#workspace-ranges-workspace) is supported by yarn and pnpm.

## Usage

In your app or package, create an `./apps/my-app/eslint.config.js` file that extends any of the
existing base configs. For example:

> **Tip:** "@events-helsinki/eslint-config-bases/prettier" must be set at the end to disable any
> conflicting rules.

## Bases

You can find the bases in [./src/bases](./src/bases).

| Base                                            | Match convention                  | Scope                                                           |
| :---------------------------------------------- | :-------------------------------- | :-------------------------------------------------------------- |
| [typescript](./src/bases/typescript.js)         | _all_                             | Naming conventions, consistent imports, import sorting...       |
| [sonar](./src/bases/testcafe.js)                | `*.testcafe.ts`                   | Common rules for best practices when writing tests for TestCafe |
| [regexp](./src/bases/regexp.js)                 | `*.{js,jsx,jsx,tsx}`              | Keep regexp consistent and safer.                               |
| [react](./src/bases/react.js)                   | `*.{jsx,tsx}`                     | Recommendations for react, react-hooks and jsx projects.        |
| [jest](./src/bases/jest.js)                     | `**/?(*.)+(test).{js,jsx,ts,tsx}` | Catch inconsistencies or error in jest tests.                   |
| [rtl](./src/bases/rtl.js)                       | `**/?(*.)+(test).{js,jsx,ts,tsx}` | Potential errors / deprecations in react-testing-library tests. |
| [graphql-schema](./src/bases/graphql-schema.js) | `*.graphql`                       | Ensure validity of graphql schema files.                        |
| [storybook](./src/bases/storybook.js)           | `*.stories.{ts,tsx,mdx}`          | Potential errors / deprecations in stories.                     |
| [prettier](./src/bases/prettier.js)             | _all_                             | Post configure eslint for prettier compatibility.               |

> **Notes**:
>
> - The order is important. Some bases will disable or tune previously defined
>   rules. For example the [react base](./src/bases/react.js) will tune the naming conventions
>   for function components and increase recommended cognitive complexity. The [typescript base](./src/bases/typescript.js)
>   will also relax conventions for javascript files.
> - Based on filename conventions some rules are relaxed or disabled to avoid false positives and
>   keep a good level of performance. For example the [sonar base](./src/bases/sonar.js) won't run on
>   test and storybook files. If you work on different conventions the patterns must be updated.

## Prettier integration

To prevent conflicts between prettier and eslint, you must re-export the prettier base from `@events-helsinki/eslint-config-bases`.

```javascript
const {
  getPrettierConfig,
} = require("@events-helsinki/eslint-config-bases/helpers");
module.exports = {
  ...prettierConfig,
  overrides: [
    // whatever you need
  ],
};
```

> **Tip**: You can tune the provided [prettier.base.config](./src/prettier.base.config.js) for your own needs.

## Notes

### Typescript

Generic typescript project, mostly based on

| Type/Plugin                                                                                      | Comment                                                                      |
| :----------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| [eslint:recommended](https://eslint.org/docs/rules/)                                             | The basics for code linting.                                                 |
| [@typescript-eslint/recommended](https://typescript-eslint.io/rules/)                            | The basics for typescript.                                                   |
| [@typescript-eslint/consistent-type](https://typescript-eslint.io/rules/consistent-type-imports) | Use TS 3.8+ imports/exports, helps with [esbuild](https://esbuild.github.io) |
| [@typescript-eslint/naming-convention](https://typescript-eslint.io/rules/naming-convention)     |                                                                              |
| [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)                        | Order imports                                                                |

## Sonarjs

| Type/Plugin                                                                               | Comment                      |
| :---------------------------------------------------------------------------------------- | :--------------------------- |
| [eslint-plugin-sonarjs/recommended](https://github.com/SonarSource/eslint-plugin-sonarjs) | Help to keep complexity sane |

### React

| Type/Plugin                                                                                                             | Comment                                  |
| :---------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| [eslint-plugin-react/recommended](https://github.com/yannickcr/eslint-plugin-react)                                     |                                          |
| [eslint-plugin-react-hooks/recommended](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks) |                                          |
| [eslint-plugin-jsx-a11y/recommended](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)                              | Helps to produce accessibility-ready jsx |

### Jest

| Type/Plugin                                                                            | Comment                     |
| :------------------------------------------------------------------------------------- | :-------------------------- |
| [eslint-plugin-jest/recommended](https://github.com/jest-community/eslint-plugin-jest) | Jest recommended practices. |

### React Testing Library

| Type/Plugin                                                                                                   | Comment                               |
| :------------------------------------------------------------------------------------------------------------ | :------------------------------------ |
| [eslint-plugin-testing-library/recommended](https://github.com/testing-library/eslint-plugin-testing-library) | Ease when using react-testing-library |

### Testcafe

| Type/Plugin                                                                                      | Comment                                                  |
| :----------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| [testcafe-community/recommended](https://www.npmjs.com/package/eslint-plugin-testcafe-community) | Rules for best practices when writing tests for TestCafe |

### Regexp

| Type/Plugin                                                                           | Comment |
| :------------------------------------------------------------------------------------ | :------ |
| [eslint-plugin-regexp/recommended](https://github.com/ota-meshi/eslint-plugin-regexp) |         |

### Etc

...
