# The CMS graph

**Table of Contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

The CMS graph is provided externally by Geniem.

All the Graphql server instances which are hosted by Geniem, should be running the same version, which means the same data structure, the same plugins and the same contract.

**WARNING: It should be noted that the graph does not fully follow the [Apollo Subgraph Specification](https://www.apollographql.com/docs/federation/subgraph-spec/)!**

(Sub)graph problems:

1. The graph does not contain the `Query._service` which is used to resolve the enhanced introspection field.
2. The graph does not provide a mechanism for subgraph developers to resolve entity fields via the `Query._entities` -field.
3. Neither does it follow the federation v2 directives.

The GraphQL schema is fetched with (_a graph command for monolith schemas_) `rover graph introspect https://tapahtumat.app-staging.hkih.hion.dev/graphql > subgraphs/cms/cms.graphql`.

The used routing URLs:

- Events staging: https://tapahtumat.app-staging.hkih.hion.dev/graphql
- Events production: https://tapahtumat.content.api.hel.fi/graphql
- Hobbies staging: https://harrastus.app-staging.hkih.hion.dev/graphql
- Hobbies production: https://harrastus.content.api.hel.fi/graphql
- Sports staging: https://liikunta.app-staging.hkih.hion.dev/graphql
- Sports production: https://liikunta.content.api.hel.fi/graphql (NOTE: This Sports production server could still be in production use in the old deprecated Liikunta-app)

An example of the supergraph config:

```
subgraphs:
  cms:
    routing_url: https://tapahtumat.app-staging.hkih.hion.dev/graphql
    # routing_url: https://tapahtumat.content.api.hel.fi/graphql
    # routing_url: https://harrastus.app-staging.hkih.hion.dev/graphql
    # routing_url: https://harrastus.content.api.hel.fi/graphql
    # routing_url: https://liikunta.app-staging.hkih.hion.dev/graphql
    # routing_url: https://liikunta.content.api.hel.fi/graphql
    schema:
      file: ./subgraphs/cms/cms.graphql
```
