<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About lint-staged](#about-lint-staged)
  - [Structure](#structure)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About lint-staged

[Lint-staged](https://github.com/okonet/lint-staged) and [husky](https://github.com/typicode/husky) are used to automatically
run linters on commit.

## Structure

See [the doc to use lint-staged in a monorepo](https://github.com/okonet/lint-staged#how-to-use-lint-staged-in-a-multi-package-monorepo)
and the [linter docs](./about-linters.md).

```
.
├── apps
│   ├── hobbies-helsinki
│   │   ├── eslint.config.mjs
│   │   └── lint-staged.config.mjs   (overwrite global lint-staged.config.mjs, custom eslint)
│   └── events-helsinki
│       ├── eslint.config.mjs
│       └── lint-staged.config.mjs   (overwrite global lint-staged.config.mjs, custom eslint)
├── packages
│   └── components
│       ├── eslint.config.mjs
│       └── lint-staged.config.mjs   (overwrite global lint-staged.config.mjs, custom eslint)
│
├── lint-staged.common.mjs  (few common utils)
└── lint-staged.config.mjs  (base config to overwrite per apps/packages)
```
