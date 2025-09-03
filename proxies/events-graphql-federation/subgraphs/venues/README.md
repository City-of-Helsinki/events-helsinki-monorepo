# The Venues subgraph

**Table of Contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Environments](#environments)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

The Venues subgraph offers the Venue data from the Tprek and Hauki datasources.

**NOTE: The Hauki is a configurable datasource and when it's deactivated, the fields will not appear in the schema.**

**NOTE: The Venues graph has originally been running inside the Liikunta-Helsinki project as an Apollo-server served via a NextJS-Api.**

The GraphQL schema is fetched with `rover subgraph introspect http://localhost:3000/api/graphql > subgraphs/venues/venues.graphql`.

An example of the supergraph config:

```
subgraphs:
  venues:
    routing_url: http://localhost:3000/api/graphql
    schema:
      file: ./subgraphs/venues/venues.graphql
```

## Environments

**Dev server:** https://events-graphql-proxy.dev.hel.ninja

**Test server:** https://events-graphql-proxy.test.hel.ninja

**Staging server:** https://events-graphql-proxy.stage.hel.ninja

**Production server:** https://events-graphql-proxy.api.hel.fi

The CI deployment process goes like this:

1. When a pull request (PR) is created, the PR related checks are being ran and a new server instance will be created. A link to that environment should be published in the comments of the PR when the service is ready. For example the browser tests are being ran against that server.
2. When a pull request (PR) is merged (to the "main" branch), the dev-environment will be redeployed with the latest changes.
3. When a new release is made, the test-environment and staging-environment will be redeployed with the latest changes.
4. When a new release is approved, a production-environment will be (re)deployed
