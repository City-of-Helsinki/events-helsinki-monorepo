# Event Helsinki GraphQL proxy

## Development with Docker

To build the project, you will need [Docker](https://www.docker.com/community-edition).

Building the project

    cp .env.example .env
    docker-compose build

Starting the application

    docker-compose up -d

GraphQL playground will run on http://localhost:4000/proxy/graphql

## Available Scripts

In the project directory, you can run:

### `yarn dev`

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

## Custom request headers

The Events-graphql-proxy offers a way to ignore some custom ignorable graphql errors.

The 'X-Ignored-Error-Code' header is used to list the errors wanted to be ignored. It is used for example to ignore the custom made error code `UNPOPULATED_MANDATORY_DATA` which is thrown if the LinkedEvents data has some mandatory data unpopulated. (The feature is there to make the app more false tolerant when the endpoint has some data issues and the development team might have slow response to fix them.)

The `UNPOPULATED_MANDATORY_DATA`, that was given as an example, is created with a custom made error class named `IgnorableGraphQLError`, which can be used to create more of these ignorable error codes.

**NOTE: Remember to [propagate the HTTP headers in the router](../events-graphql-federation/README.md)**. Otherwise the heaers are not included in the request that is made from the Apollo router to the subgraph, because the Apollo router don't pass them.
