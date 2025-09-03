<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [@events-helsinki/eslint-config-bases](#events-helsinkieslint-config-bases)
- [About](#about)
  - [Features](#features)
  - [Features](#features-1)
  - [Install](#install)
  - [Usage](#usage)
  - [Bases](#bases)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
| [sonar](./src/bases/testcafe.js)                | `*.{js,jsx,ts,tsx}`               | Common rules for best practices when writing tests for TestCafe |
| [regexp](./src/bases/regexp.js)                 | _all_                             | Keep regexp consistent and safer.                               |
| [react](./src/bases/react.js)                   | `**/*.{js,jsx,ts,tsx}`            | Recommendations for react, react-hooks and jsx projects.        |
| [vitest](./src/bases/vitest.js)                 | `**/?(*.)+(test).{js,jsx,ts,tsx}` | Catch inconsistencies or error in vitest tests.                 |
| [rtl](./src/bases/rtl.js)                       | `**/?(*.)+(test).{js,jsx,ts,tsx}` | Potential errors / deprecations in react-testing-library tests. |
| [graphql-schema](./src/bases/graphql-schema.js) | `*.graphql`                       | Ensure validity of graphql schema files.                        |
| [storybook](./src/bases/storybook.js)           | `*.stories.{ts,tsx,mdx}`          | Potential errors / deprecations in stories.                     |
| [testcafe](./src/bases/testcafe.js)             | `browser-tests/**/*.ts`           | Potential errors / deprecations in browser tests.               |
| [prettier](./src/bases/prettier.js)             | _all_                             | Post configure eslint for prettier compatibility.               |
| [stylistic](./src/bases/stylistic.js)           | `**/*.{js,jsx,ts,tsx}`            | Rules that focus on style concerns.                             |

> **Notes**:
>
> - The order is important. Some bases will disable or tune previously defined
>   rules. For example the [react base](./src/bases/react.js) will tune the naming conventions
>   for function components and increase recommended cognitive complexity. The [typescript base](./src/bases/typescript.js)
>   will also relax conventions for javascript files.
> - Based on filename conventions some rules are relaxed or disabled to avoid false positives and
>   keep a good level of performance. For example the [sonar base](./src/bases/sonar.js) won't run on
>   test and storybook files. If you work on different conventions the patterns must be updated.
