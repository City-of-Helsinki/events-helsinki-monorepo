<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [The Venues subgraph](#the-venues-subgraph)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### The Venues subgraph

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
