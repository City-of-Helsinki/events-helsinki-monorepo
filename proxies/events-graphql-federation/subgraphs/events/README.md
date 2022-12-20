### The Events subgraph

The Events subgraph is fetched from the Events GraphQL Proxy which is between the events based applications and the [LinkedEvents](http://api.hel.fi/linkedevents/v1/). The LinkedEvents does not provide a Graphql -API, so the Events Graphql Proxy is there to provide that.

The GraphQL schema is fetched with `rover subgraph introspect https://tapahtumat-proxy.test.kuva.hel.ninja/proxy/graphql > subgraphs/venue/venue.graphql`.

**WARNING: There is a conflict with the LandingPage queries: They overlap with the type that comes from the CMS schema. The landingPage type is only needed with the old Wagtail CMS implementation, but it is still in production use until the Events app is deployed! To fix the issue, those queries and types can be commented out or removed from the subgraph / supergraph.**

An example of the supergraph config:

```
subgraphs:
  events:
    routing_url: https://tapahtumat-proxy.test.kuva.hel.ninja/proxy/graphql
    schema:
      file: ./subgraphs/events/events.graphql
```
