## Howto

### 1. Enable workspace support

<details>
<summary>Root package.json with workspace directories</summary>

```json5
{
  "name": "events-helsinki-monorepo",
  // Set the directories where your apps, packages will be placed
  "workspaces": ["apps/*", "packages/*"],
  //...
}
```

_The package manager will scan those directories and look for children `package.json`. Their
content is used to define the workspace topology (apps, libs, dependencies...)._

</details>

### 2. Create a new package

Create a folder in [./packages/](./packages) directory with the name of
your package.

<details>
   <summary>Create the package folder</summary>

```bash
mkdir packages/magnificent-poney
mkdir packages/magnificent-poney/src
cd packages/magnificent-poney
```

</details>

Initialize a package.json with the name of your package.

> Rather than typing `yarn init`, prefer to take the [./packages/components/package.json](./packages/components/package.json)
> as a working example and edit its values.

<details>
<summary>Example of package.json</summary>

```json5
{
  "name": "events-helsinki-magnificent-poney",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "clean": "rimraf --no-glob ./tsconfig.tsbuildinfo",
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "typecheck": "tsc --project ./tsconfig.json --noEmit",
    "test": "run-s 'test:*'",
    "test:unit": "echo \"No tests yet\"",
    "fix:staged-files": "lint-staged --allow-empty",
    "fix:all-files": "eslint . --ext .ts,.tsx,.js,.jsx --fix",
  },
  "devDependencies": {
    "@events-helsinki/eslint-config-bases": "workspace:^",
  },
}
```

</details>

### 3. Using the package in app

#### Step 3.1: package.json

First add the package to the app package.json. The recommended way is to
use the [workspace protocol](https://yarnpkg.com/features/protocols#workspace) supported by
yarn and pnpm.

```bash
cd apps/my-app
yarn add events-helsinki-magnificent-poney@'workspace:^'
```

Inspiration can be found in [apps/nextjs-app/package.json](./apps/nextjs-app/package.json).

<details>
<summary>package.json</summary>

```json5
{
  "name": "my-app",
  "dependencies": {
    "events-helsinki-magnificient-poney": "workspace:^",
  },
}
```

</details>

#### Step 3.2: In tsconfig.json

Then add a typescript path alias in the app tsconfig.json. This
will allow you to import it directly (no build needed)

Inspiration can be found in [apps/nextjs-app/tsconfig.json](./apps/nextjs-app/tsconfig.json).

<details>
  <summary>Example of tsonfig.json</summary>

```json5
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      // regular app aliases
      "@/components/*": ["./components/*"],
      // packages aliases, relative to app_directory/baseUrl
      "events-helsinki-magnificent-poney/*": [
        "../../../packages/magnificent-poney/src/*",
      ],
      "events-helsinki-magnificent-poney": [
        "../../../packages/magnificent-poney/src/index",
      ],
    },
  },
}
```

> PS:
>
> - Don't try to set aliases in the global tsonfig.base.json to keep strict with
>   graph dependencies.
> - The **star** in `events-helsinki-magnificent-poney/*` allows you to import subfolders. If you use
>   a barrel file (index.ts), the alias with star can be removed.

</details>

#### Step 3.3: Next config

Edit your `next.config.js` and enable the [experimental.externalDir option](https://github.com/vercel/next.js/pull/22867).
Feedbacks [here](https://github.com/vercel/next.js/discussions/26420).

```js
const nextConfig = {
  experimental: {
    externalDir: true,
  },
};
export default nextConfig;
```

<details>
  <summary>Using a NextJs version prior to 10.2.0 ?</summary>

If you're using an older NextJs version and don't have the experimental flag, you can simply override your
webpack config.

```js
const nextConfig = {
  webpack: (config, { defaultLoaders }) => {
    // Will allow transpilation of shared packages through tsonfig paths
    // @link https://github.com/vercel/next.js/pull/13542
    const resolvedBaseUrl = path.resolve(config.context, "../../");
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(tsx|ts|js|jsx|json)$/,
        include: [resolvedBaseUrl],
        use: defaultLoaders.babel,
        exclude: (excludePath) => {
          return /node_modules/.test(excludePath);
        },
      },
    ];
    return config;
  },
};
```

</details>

> PS: If your shared package make use of scss bundler... A custom webpack configuration will be necessary
> or use [next-transpile-modules](https://github.com/martpie/next-transpile-modules), see FAQ below.

#### Step 3.4: Using the package

The packages are now linked to your app, just import them like regular packages: `import { poney } from 'events-helsinki-magnificent-poney'`.

### 4. Publishing

> Optional

If you need to share some packages outside of the monorepo, you can publish them to npm or private repositories.
An example based on microbundle is present in each package. Versioning and publishing can be done with [atlassian/changeset](https://github.com/atlassian/changesets),
and it's simple as typing:

```bash
$ yarn g:changeset
```

Follow the instructions... and commit the changeset file. A "Version Packages" P/R will appear after CI checks.
When merging it, a [github action](./.github/workflows/release-or-version-pr.yml) will publish the packages
with resulting semver version and generate CHANGELOGS for you.

> PS:
>
> - Even if you don't need to publish, changeset can maintain an automated changelog for your apps. Nice !
> - To disable automatic publishing of some packages, just set `"private": "true"` in their package.json.
> - Want to tune the behaviour, see [.changeset/config.json](./.changeset/config.json).
