### The Unified-Search subgraph

The Unified-Search is ElasticSearch/OpenSearch -service that stores search indexes for venues and events.

The GraphQL schema is fetched with `rover subgraph introspect https://kuva-unified-search.api.test.hel.ninja/search > subgraphs/unified-search/unified-search.graphql`.

An example of the supergraph config:

```
subgraphs:
  unified-search:
    routing_url: https://kuva-unified-search.api.test.hel.ninja/search
    schema:
      file: ./subgraphs/unified-search/unified-search.graphql
```
