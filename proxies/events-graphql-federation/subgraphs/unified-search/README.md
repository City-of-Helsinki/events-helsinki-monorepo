### The Unified-Search subgraph

The Unified-Search is ElasticSearch/OpenSearch -service that stores search indexes for venues and events.

The GraphQL schema is fetched with `rover subgraph introspect https://unified-search.test.kuva.hel.ninja/search > subgraphs/unified-search/unified-search.graphql`.

**WARNING: There is conflict with the Venue type, so it's renamed in supergraph, but not yet deployed in the actual server.**

An example of the supergraph config:

```
subgraphs:
  unified-search:
    routing_url: https://unified-search.test.kuva.hel.ninja/search
    schema:
      file: ./subgraphs/unified-search/unified-search.graphql
```
