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
