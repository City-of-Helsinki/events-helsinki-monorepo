# Event Helsinki GraphQL proxy

**Table of Contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Environments](#environments)
- [Development with Docker](#development-with-docker)
- [Available Scripts](#available-scripts)
  - [`yarn start`](#yarn-start)
  - [`yarn test`](#yarn-test)
  - [`yarn build`](#yarn-build)
  - [`yarn start`](#yarn-start-1)
  - [`yarn lint`](#yarn-lint)
  - [`yarn format-code`](#yarn-format-code)
  - [`yarn generate:graphql`](#yarn-generategraphql)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Environments

**Dev server:** https://venue-graphql-proxy.dev.hel.ninja/proxy/graphql

**Test server:** https://venue-graphql-proxy.test.hel.ninja/proxy/graphql

**Staging server:** https://venue-graphql-proxy.stage.hel.ninja/proxy/graphql

**Production server:** https://venue-graphql-proxy.api.hel.fi/proxy/graphql

The CI deployment process goes like this:

1. When a pull request (PR) is created, the PR related checks are being ran and a new server instance will be created. A link to that environment should be published in the comments of the PR when the service is ready. For example the browser tests are being ran against that server.
2. When a pull request (PR) is merged (to the "main" branch), the dev-environment will be redeployed with the latest changes.
3. When a new release is made, the test-environment and staging-environment will be redeployed with the latest changes.
4. When a new release is approved, a production-environment will be (re)deployed

## Development with Docker

To build the project, you will need [Docker](https://www.docker.com/community-edition).

Building the project

    cp .env.example .env
    docker compose build

Starting the application

    docker compose up -d

GraphQL playground will run on http://localhost:4000/proxy/graphql

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:4000/proxy/graphql](http://localhost:4000/proxy/graphql) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner

### `yarn build`

Builds the app for production to the `build` folder.

### `yarn start`

Runs the graphql proxy in the production mode.
Open [http://localhost:4000/proxy/graphql](http://localhost:4000/proxy/graphql) to view it in the browser.

### `yarn lint`

Run eslint to all files on

### `yarn format-code`

Fix all the eslint errors

### `yarn generate:graphql`

Use `graphql-codegen` (with [codegen.yml](codegen.yml) as configuration file) to generate TypeScript types from `typeDefs.ts` files with `gql` syntax.
When you modify the graphql ttype definitions (in typeDefs.ts files), you should generate the TS types with `yarn generate:graphql` as well.
