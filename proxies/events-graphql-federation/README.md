# Events GraphQL Federation

The Events GraphQL Federation is a project for a Apollo federation supergraph (and subgraphs) and the Apollo Router configuration.

**For more detailed documentation, please read the documentation maintained by the Apollo team!**

Apollo's Supergraph-demo repository: https://github.com/apollographql/supergraph-demo/

## Local development

### Prerequisites

You'll need:

- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- `rover` [Apollo Graphql CLI](https://www.apollographql.com/docs/rover/getting-started)

To install `rover`:

```sh
curl -sSL https://rover.apollo.dev/nix/latest | sh
```

- `router` (optional)

To install `router`:

```sh
curl -sSL https://router.apollo.dev/download/nix/latest | sh
```

> This installs the router executable in your project directory.

To run the router locally with your configuration and supergraph, run:

```sh
./router --config=router.yaml --supergraph=schemas/supergraph.graphql
```

### Serve dockerized local router

In the `package.json` of the root in the monorepo, there is a script that can be used to launch a dockerized Apollo federation router:

```javascript
  "scripts": {
    "docker:graphql-router:hobbies:serve": "cross-env ROUTER_CMS_ROUTING_URL=https://harrastus.hkih.stage.geniem.io/graphql ROUTER_EVENTS_ROUTING_URL=https://tapahtumat-proxy.test.kuva.hel.ninja/proxy/graphql ROUTER_UNIFIED_SEARCH_ROUTING_URL=https://unified-search.test.kuva.hel.ninja/search docker-compose -f docker-compose.router.yml up",
    "docker:graphql-router:events:serve": "cross-env ROUTER_CMS_ROUTING_URL=https://tapahtumat.hkih.stage.geniem.io/graphql ROUTER_EVENTS_ROUTING_URL=https://tapahtumat-proxy.test.kuva.hel.ninja/proxy/graphql ROUTER_UNIFIED_SEARCH_ROUTING_URL=https://unified-search.test.kuva.hel.ninja/search docker-compose -f docker-compose.router.yml up",
  }
```

To use these, run the following to launch the router:

```sh
yarn docker:graphql-router:hobbies:serve
```

In the `router.yaml` there is a `override_subgraph_url` -configuration that can be used to change the route to another GraphQL-API:

```yaml
override_subgraph_url:
  cms: ${env.ROUTER_CMS_ROUTING_URL}
  events: ${env.ROUTER_EVENTS_ROUTING_URL}
  unified-search: ${env.ROUTER_UNIFIED_SEARCH_ROUTING_URL}
```

They are set in the in the `docker-compose.router.yml` like this, with the defaults in the `events` and `unified-search` services, but empty in `cms`:

```yaml
environment:
  - ROUTER_CMS_ROUTING_URL=${ROUTER_CMS_ROUTING_URL}
  - ROUTER_EVENTS_ROUTING_URL=${ROUTER_EVENTS_ROUTING_URL:-https://tapahtumat-proxy.test.kuva.hel.ninja/proxy/graphql}
  - ROUTER_UNIFIED_SEARCH_ROUTING_URL=${ROUTER_UNIFIED_SEARCH_ROUTING_URL:-https://unified-search.test.kuva.hel.ninja/search}
```

**This can be used to easily change (the routing url of) the Headless CMS API! So, by providing `ROUTER_CMS_ROUTING_URL` as a environment variable, the same supergraph schema can be used with a different source of data.**

More details about this pattern can be read from the Apollo documentation: [Subgraph routing URLs](https://www.apollographql.com/docs/router/configuration/overview/#subgraph-routing-urls).

> By default, the Apollo Router extracts the routing URL for each of your subgraphs from the composed supergraph schema you provide it. In most cases, no additional configuration is required.
>
> However, if you do need to override a particular subgraph's routing URL (for example, to handle changing network topography), you can do so in your YAML configuration file with the override_subgraph_url option

### Useful Rover commands

#### Work with subgraphs

To introspect a subgraph, use:

```sh
rover subgraph introspect https://tapahtumat.hkih.stage.geniem.io/graphql
```

> NOTE: If the graph is not a subgraph yet, it needs to be migrated to a subgraph. See: [Apollo Federation subgraph specification](https://www.apollographql.com/docs/federation/subgraph-spec/)

To introspect an old monolith graph, use:

```sh
rover graph introspect https://tapahtumat.hkih.stage.geniem.io/graphql
```

or to export the result in a file:

```sh
rover graph introspect https://tapahtumat.hkih.stage.geniem.io/graphql > my-schema.graphql
```

#### Work with supergraph

To compose a new supergraph, use:

```sh
rover supergraph compose --config ./supergraph-config.yaml
```

# Documentation related to the Apollo federation

## External articles for basics:

- Apollo docs introduction [Introduction to Apollo Federation](https://www.apollographql.com/docs/federation/)
- The what, when, why, and how of federated GraphQL: [The what, when, why, and how of federated GraphQL - LogRocket Blog](https://blog.logrocket.com/the-what-when-why-and-how-of-federated-graphql/)
- API Gateway Pattern using Apollo Graphql: [An API Gateway is a microservice pattern where a separate service is built to sit in front of your…](https://medium.com/tkssharma/an-api-gateway-is-a-microservice-pattern-where-a-separate-service-is-built-to-sit-in-front-of-your-be4b16861d40)

## External documentations for graph to subgraph migration and usage:

- The supergraph: a new way to think about GraphQL: [The supergraph: a new way to think about GraphQL](https://www.apollographql.com/blog/announcement/backend/the-supergraph-a-new-way-to-think-about-graphql/)
- Federation quick start: [Federation quickstart](https://www.apollographql.com/docs/federation/quickstart/local-composition)
- The graph router: [The graph router](https://www.apollographql.com/docs/federation/building-supergraphs/router#composing-the-supergraph-schema)
- Implementing subgraphs with Apollo Server [Implementing a subgraph with Apollo Server](https://www.apollographql.com/docs/federation/building-supergraphs/subgraphs-apollo-server/). This is how to migrate the old monolith Apollo server graphs to a subgraphs. The Apollo Federation subgraph specification must be met!
- Apollo Federation subgraph specification: [Apollo Federation subgraph specification](https://www.apollographql.com/docs/federation/subgraph-spec/)
