### The Events subgraph

The Events subgraph is fetched from the Events GraphQL Proxy which is between the events based applications and the [LinkedEvents](http://api.hel.fi/linkedevents/v1/). The LinkedEvents does not provide a Graphql -API, so the [proxies/events-graphql-proxy](./proxies/events-graphql-proxy) is there to provide that.

The GraphQL schema is fetched with `rover subgraph introspect https://<TODO put new monorepo test env domain here>/proxy/graphql > subgraphs/events/events.graphql`.

An example of the supergraph config:

```
subgraphs:
  events:
    routing_url: <TODO put new monorepo test env domain here>/proxy/graphql
    schema:
      file: ./subgraphs/events/events.graphql
```
