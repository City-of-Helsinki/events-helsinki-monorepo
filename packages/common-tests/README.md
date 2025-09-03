# @events-helsinki/common-tests

<p align="left">
  <a aria-label="Build" href="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions">
    <img alt="build" src="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions/workflows/ci-packages.yml/badge.svg?label=CI&logo=github&style=flat-quare&labelColor=000000" />
  </a>
</p>

**Table of Contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Intro](#intro)
  - [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Intro

One possible way to share common test amongst apps in the monorepo.

### Usage

Add the workspace dependency to the consuming app or package.

```bash
yarn add @events-helsinki/common-tests:"workspace:^"
```

Add an alias in tsconfig.js to enable fast-refresh.

```json5
{
  "compilerOptions": {
    "paths": {
      "@events-helsinki/common-tests": [
        "../../../packages/common-tests/src/index",
      ],
      "@events-helsinki/common-tests/browser-tests": [
        "../../../packages/common-tests/browser-tests/index",
      ],
    },
  },
}
```
