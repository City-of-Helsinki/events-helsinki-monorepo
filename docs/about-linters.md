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
| `pnpm lint`       | Display linter issues. |
| `pnpm lint --fix` | Run automatic fixes.   |

To lint all workspaces from a package folder, run `pnpm -w run g:lint` or `pnpm -r --parallel run lint --color` (from the repo root, `pnpm g:lint` is enough).

| Name                | Description                                    |
| ------------------- | ---------------------------------------------- |
| `pnpm g:lint`       | Display linter issues in all apps and packages |
| `pnpm g:lint --fix` | Run automatic fixes                            |

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

    key: ${{ runner.os }}-packages-cache-${{ hashFiles('**/pnpm-lock.yaml') }}-${{ hashFiles('packages/**.[jt]sx?', 'packages/**.json') }}
    restore-keys: |
      ${{ runner.os }}-packages-cache-${{ hashFiles('**/pnpm-lock.yaml') }}-
```

</details>
