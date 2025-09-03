# Event Helsinki GraphQL proxy

**Table of Contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Development with Docker](#development-with-docker)
- [Available Scripts](#available-scripts)
  - [`yarn start`](#yarn-start)
  - [`yarn test`](#yarn-test)
  - [`yarn build`](#yarn-build)
  - [`yarn start`](#yarn-start-1)
  - [`yarn lint`](#yarn-lint)
  - [`yarn format-code`](#yarn-format-code)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
