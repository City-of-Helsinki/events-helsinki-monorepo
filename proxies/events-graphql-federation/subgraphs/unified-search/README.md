<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [The Unified-Search subgraph](#the-unified-search-subgraph)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
