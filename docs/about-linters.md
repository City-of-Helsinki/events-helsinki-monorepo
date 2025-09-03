<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [About linters](#about-linters)
  - [Recommended approach](#recommended-approach)
    - [Example config](#example-config)
    - [Workspace structure](#workspace-structure)
  - [Commands](#commands)
  - [Lint-staged](#lint-staged)
  - [Performance](#performance)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# About linters

Linters in a monorepo should offer consistency but also offer flexibility in each app and package (a.k.a. workspace).

## Recommended approach

Define a package holding all your base configurations and enable them per workspace.

### Example config

If you use the provided example of `packages/eslint-config-bases`, it's easy to add or
customize rules on per workspace basis by creating an `eslint.config.js` file in the workspace root.

### Workspace structure

```
.
├── apps
│   ├── remix-app
│   │   └── eslint.config.js  (extends from [@events-helsinki/eslint-config-bases/react])
│   └── nextjs-app
│       └── eslint.config.js
└── packages
    └── eslint-config-bases
```

## Commands

If you are in a specific package, you can run the linter from the package directory.

| Name              | Description            |
| ----------------- | ---------------------- |
| `yarn lint`       | Display linter issues. |
| `yarn lint --fix` | Run automatic fixes.   |

It's possible to run the linter globally from any folder of the monorepo.

| Name                | Description                                    |
| ------------------- | ---------------------------------------------- |
| `yarn g:lint`       | Display linter issues in all apps and packages |
| `yarn g:lint --fix` | Run automatic fixes                            |

## Lint-staged

See the [specific doc](./about-lint-staged.md).

## Performance

By default, all lint command will automatically enable cache.

On Github CI, the cache will be persisted thx to `action/cache`.

<details>
  <summary>action/cache example</summary>

```yaml
- name: Restore packages cache
  uses: actions/cache@v2
  with:
    path: |
      ${{ github.workspace }}/.cache
      ${{ github.workspace }}/**/tsconfig.tsbuildinfo
      ${{ github.workspace }}/**/.eslintcache

    key: ${{ runner.os }}-packages-cache-${{ hashFiles('**/yarn.lock') }}-${{ hashFiles('packages/**.[jt]sx?', 'packages/**.json') }}
    restore-keys: |
      ${{ runner.os }}-packages-cache-${{ hashFiles('**/yarn.lock') }}-
```

</details>
