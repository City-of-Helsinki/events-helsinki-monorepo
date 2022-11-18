FROM ghcr.io/apollographql/router:v1.3.0 AS router

COPY ./supergraph.graphql /dist/schema/supergraph.graphql
COPY ./router.yaml /dist/config/router.yaml

# ===================================
FROM router as develop
# ===================================
CMD ["--dev", "-c", "config/router.yaml", "-s", "schema/supergraph.graphql", "--log", "info"]

# ===================================
FROM router as production
# ===================================
EXPOSE 4000
EXPOSE 8088
CMD ["-c", "config/router.yaml", "-s", "schema/supergraph.graphql", "--log", "info"]
