<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [@events-helsinki/common-tests](#events-helsinkicommon-tests)
  - [Intro](#intro)
    - [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# @events-helsinki/common-tests

<p align="left">
  <a aria-label="Build" href="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions">
    <img alt="build" src="https://github.com/City-of-Helsinki/events-helsinki-monorepo/actions/workflows/ci-packages.yml/badge.svg?label=CI&logo=github&style=flat-quare&labelColor=000000" />
  </a>
</p>

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
