# @events-helsinki/common-i18n

<p align="left">
  <a aria-label="Build" href="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions">
    <img alt="build" src="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions/workflows/ci-packages.yml/badge.svg?label=CI&logo=github&style=flat-quare&labelColor=000000" />
  </a>
</p>

## Intro

One possible way to share locales amongst apps in the monorepo.

### Usage

Add the workspace dependency to the consuming app or package.

```bash
yarn add @events-helsinki/common-i18n:"workspace:^"
```

Add an alias in tsconfig.js to enable fast-refresh.

```json5
{
  "compilerOptions": {
    "paths": {
      "@events-helsinki/common-i18n": [
        "../../../packages/common-i18n/src/index",
      ],
      "@events-helsinki/common-i18n/locales/*": [
        "../../../packages/common-i18n/src/locales/*",
      ],
    },
  },
}
```

Optionally create a file named `./types.d/react-i18next.d.ts` to enable typechecks and autocompletion of keys.

```typescript
import "react-i18next";
import type { I18nNamespaces } from "@events-helsinki/common-i18n";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: I18nNamespaces;
  }
}
```
