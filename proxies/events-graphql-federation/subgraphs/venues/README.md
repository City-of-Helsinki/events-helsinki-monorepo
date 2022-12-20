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
