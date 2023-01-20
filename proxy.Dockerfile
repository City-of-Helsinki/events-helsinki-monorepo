###################################################################
# Stage 1: Install all workspaces (dev)dependencies               #
#          and generates node_modules folder(s)                   #
# ----------------------------------------------------------------#
# Notes:                                                          #
#   1. this stage relies on buildkit features                     #
#   2. depend on .dockerignore, you must at least                 #
#      ignore: all **/node_modules folders and .yarn/cache        #
###################################################################

FROM helsinkitest/node:16-slim AS deps

RUN apt-get update && \
    apt-get install -y --no-install-recommends rsync

WORKDIR /workspace-install

COPY --chown=appuser:appuser yarn.lock .yarnrc.yml ./
COPY --chown=appuser:appuser .yarn/ ./.yarn/

# Specific to monerepo's as docker COPY command is pretty limited
# we use buidkit to prepare all files that are necessary for install
# and that will be used to invalidate docker cache.
#
# Files are copied with rsync:
#
#   - All package.json present in the host (root, apps/*, proxies/*, packages/*)
#
# Copy all files
WORKDIR /docker-context
COPY --chown=appuser:appuser . /docker-context

# mount type bind is not supported on current version (4.10.35) of OpenShift build
# RUN --mount=type=bind,source=./,target=/docker-context \
RUN rsync -amv --delete \
    --owner=appuser --group=appuser \
    --exclude='node_modules' \
    --exclude='*/node_modules' \
    --include='package.json' \
    --include='*/' --exclude='*' \
    /docker-context/ /workspace-install/;

RUN chown -R appuser:appuser .

# remove rsync and apt cache
RUN apt-get remove -y rsync && \
    apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /var/cache/apt/archives


#
# To speed up installations, we override the default yarn cache folder
# and mount it as a buildkit cache mount (builkit will rotate it if needed)
# This strategy allows to exclude the yarn cache in subsequent docker
# layers (size benefit) and reduce packages fetches.
#
# PS:
#  1. Cache mounts can be used in CI (github actions)
#  2. To manually clear the cache
#     > docker builder prune --filter type=exec.cachemount
#
# Does not play well with buildkit on CI
# https://github.com/moby/buildkit/issues/1673

# mount type cache is not supported on current version (4.10.35) of OpenShift build
#RUN --mount=type=cache,target=/root/.yarn3-cache,id=yarn3-cache \
#    YARN_CACHE_FOLDER=/root/.yarn3-cache \
#    yarn install --immutable --inline-builds

###################################################################
# Stage 2: Build the app                                          #
###################################################################

FROM helsinkitest/node:16-slim  AS builder

# Use non-root user
USER appuser

ARG PROXY

# Copy enviromental variables
ARG GRAPHQL_PROXY_DEBUG

# set graphql proxy server port
ARG GRAPHQL_PROXY_PORT

# set linked events api base url
ARG GRAPHQL_PROXY_API_BASE_URL

# set map open data base url
ARG GRAPHQL_PROXY_MAP_OPEN_DATA_API_BASE_URL

ARG GRAPHQL_PROXY_API_BASE_URL

# Set Sentry DSN
ARG GRAPHQL_PROXY_SENTRY_DSN

#Set Sentry environment
ARG GRAPHQL_PROXY_SENTRY_ENVIRONMENT

ARG GRAPHQL_PROXY_DISABLE_WINSTON_LOGGING

ARG GRAPHQL_PROXY_INTROSPECTION

ARG GRAPHQL_PROXY_HAUKI_DATASOURCE

ARG GRAPHQL_PROXY_SERVICE_MAP_DATASOURCE

WORKDIR /app

COPY --chown=appuser:appuser  . .
COPY --from=deps --chown=appuser:appuser /workspace-install ./

# Optional: if the app depends on global /static shared assets like images, locales...

RUN yarn install --immutable --inline-builds

# build
RUN yarn workspace ${PROXY} build

###################################################################
# Optional: develop locally                                       #
# NOTE: "In multi-stage builds,                                   #
# last stage should be the production build."                     #
###################################################################

FROM helsinkitest/node:16-slim  AS develop

# Use non-root user
USER appuser

# Build ARGS
ARG PROXY
ARG GRAPHQL_PROXY_PORT

ENV PATH $PATH:/app/node_modules/.bin
ENV NODE_ENV=development

WORKDIR /app

# Copy the configuration files to the proxies/${PROXY} root
COPY --from=builder --chown=appuser:appuser /app/proxies/${PROXY}/package.json ./proxies/${PROXY}/

# Copy the build files to the proxies/${PROXY} root
COPY --from=builder --chown=appuser:appuser /app/proxies/${PROXY}/build ./proxies/${PROXY}/build

# The root level files
COPY --from=builder --chown=appuser:appuser /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appuser /app/package.json ./package.json

# Expose port
EXPOSE ${GRAPHQL_PROXY_PORT:-4100}

# Start graphql proxy dev server
ENV DEV_START "yarn workspace ${PROXY} dev"

CMD ["sh", "-c", "${DEV_START}"]

###################################################################
# Stage 3: Extract a minimal image from the build                 #
###################################################################

FROM helsinkitest/node:16-slim AS runner

# Build ARGS
ARG PROXY
ARG GRAPHQL_PROXY_PORT

ENV PATH $PATH:/app/node_modules/.bin
ENV NODE_ENV production

# Use non-root user
USER appuser

WORKDIR /app

# Copy the configuration files to the proxies/${PROXY} root
COPY --from=builder --chown=appuser:appuser /app/proxies/${PROXY}/package.json ./proxies/${PROXY}/

# Copy the build files to the proxies/${PROXY} root
COPY --from=builder --chown=appuser:appuser /app/proxies/${PROXY}/build ./proxies/${PROXY}/build

# The root level files
COPY --from=builder --chown=appuser:appuser /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appuser /app/package.json ./package.json

# Expose port
EXPOSE ${GRAPHQL_PROXY_PORT:-4100}

# Start graphql proxy server
ENV PROD_START "yarn workspace ${PROXY} start"

CMD ["sh", "-c", "${PROD_START}"]
