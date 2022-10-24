#
# EXAMPLE OF MULTISTAGE BUILD FOR MONOREPOS
#
# @link https://github.com/City-of-Helsinki/events-helsinki-monorepo
#

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

# Build ARGS
ARG PROJECT
ARG APP_PORT


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
#   - All package.json present in the host (root, apps/*, packages/*)
#
RUN --mount=type=bind,target=/docker-context \
    rsync -amv --delete \
    --owner=appuser --group=appuser \
    --exclude='node_modules' \
    --exclude='*/node_modules' \
    --include='package.json' \
    --include='*/' --exclude='*' \
    /docker-context/ /workspace-install/;

# Copy all files
# COPY --chown=appuser:appuser . .
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

RUN --mount=type=cache,target=/root/.yarn3-cache,id=yarn3-cache \
    YARN_CACHE_FOLDER=/root/.yarn3-cache \
    yarn install --immutable --inline-builds


###################################################################
# Stage 2: Build the app                                          #
###################################################################

FROM helsinkitest/node:16-slim  AS builder
# Build ARGS
ARG PROJECT
ARG NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT
ARG NEXT_PUBLIC_EVENTS_GRAPHQL_ENDPOINT
ARG NEXT_PUBLIC_LINKEDEVENTS_EVENT_ENDPOINT
ARG NEXT_PUBLIC_APP_ORIGIN
ARG NEXT_PUBLIC_MATOMO_URL_BASE
ARG NEXT_PUBLIC_MATOMO_SITE_ID
ARG NEXT_PUBLIC_MATOMO_SRC_URL
ARG NEXT_PUBLIC_MATOMO_TRACKER_URL
ARG NEXT_PUBLIC_MATOMO_ENABLED
ARG NEXT_PUBLIC_ALLOW_UNAUTHORIZED_REQUESTS
ARG NEXT_PUBLIC_SENTRY_ENVIRONMENT
ARG NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE
ARG SENTRY_AUTH_TOKEN
ARG NEXT_PUBLIC_DEBUG

ENV NODE_ENV=production
ENV NEXTJS_IGNORE_ESLINT=1
ENV NEXTJS_IGNORE_TYPECHECK=0
ENV NEXTJS_DISABLE_SENTRY=1
ENV NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT=https://harrastus.hkih.stage.geniem.io/graphql
ENV NEXT_PUBLIC_EVENTS_GRAPHQL_ENDPOINT=https://tapahtumat-proxy.test.kuva.hel.ninja/proxy/graphql
ENV NEXT_PUBLIC_LINKEDEVENTS_EVENT_ENDPOINT=https://api.hel.fi/linkedevents/v1/event
ENV NEXT_PUBLIC_APP_ORIGIN=http://localhost:3000
ENV NEXT_PUBLIC_IMAGE_PROXY_URL=https://images.weserv.nl/?w=1024&url=
ENV NEXT_PUBLIC_DEBUG=1
ENV NEXT_PUBLIC_DEFAULT_ISR_REVALIDATE_SECONDS=10
ENV SENTRY_AUTH_TOKEN=
ENV NEXT_PUBLIC_SENTRY_DSN=
ENV NEXT_PUBLIC_SENTRY_ENVIRONMENT=develop
ENV NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE=1.0
ENV NEXT_PUBLIC_CMS_HEADER_MENU_NAME_FI="Hobbies Helsinki Header FI"
ENV NEXT_PUBLIC_CMS_HEADER_MENU_NAME_EN="Hobbies Helsinki Header EN"
ENV NEXT_PUBLIC_CMS_HEADER_MENU_NAME_SV="Hobbies Helsinki Header SV"
ENV NEXT_PUBLIC_CMS_FOOTER_MENU_NAME_FI="Hobbies Helsinki Footer FI"
ENV NEXT_PUBLIC_CMS_FOOTER_MENU_NAME_EN="Hobbies Helsinki Footer EN"
ENV NEXT_PUBLIC_CMS_FOOTER_MENU_NAME_SV="Hobbies Helsinki Footer SV"
ENV NEXT_PUBLIC_CMS_ARTICLES_CONTEXT_PATH=/articles
ENV NEXT_PUBLIC_CMS_PAGES_CONTEXT_PATH=/pages
ENV NEXT_PUBLIC_MATOMO_URL_BASE=https://analytics.hel.ninja/
ENV NEXT_PUBLIC_MATOMO_SITE_ID=68
ENV NEXT_PUBLIC_MATOMO_SRC_URL=matomo.js
ENV NEXT_PUBLIC_MATOMO_TRACKER_URL=matomo.php
ENV NEXT_PUBLIC_MATOMO_ENABLED=0
ENV NEXTJS_DISABLE_SENTRY=1
ENV NEXTJS_DEBUG_I18N=1
ENV NEXT_PUBLIC_ALLOW_UNAUTHORIZED_REQUESTS=1
ENV DOCKER_BUILDKIT=1

WORKDIR /app

COPY --chown=appuser:appuser  . .
COPY --from=deps --chown=appuser:appuser /workspace-install ./

# Optional: if the app depends on global /static shared assets like images, locales...
RUN yarn workspace ${PROJECT} share-static-hardlink && yarn workspace ${PROJECT} build

# Use non-root user
# USER appuser

# Does not play well with buildkit on CI
# https://github.com/moby/buildkit/issues/1673
RUN --mount=type=cache,target=/root/.yarn3-cache,id=yarn3-cache \
    SKIP_POSTINSTALL=1 \
    YARN_CACHE_FOLDER=/root/.yarn3-cache \
    yarn workspaces focus ${PROJECT} --production

CMD ["sh", "-c", "echo ${PROJECT}"]

###################################################################
# Stage 3: Extract a minimal image from the build                 #
###################################################################

FROM helsinkitest/node:16-slim  AS runner

# Use non-root user
USER appuser

# Build ARGS
ARG PROJECT
ARG APP_PORT

WORKDIR /app

ENV PATH $PATH:/app/node_modules/.bin
ENV NODE_ENV production

# Add a new system user: nextjs
# RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=appuser:appuser /app/apps/${PROJECT}/next.config.js \
    /app/apps/${PROJECT}/i18nRoutes.config.js \
    /app/apps/${PROJECT}/next-i18next.config.js \
    /app/apps/${PROJECT}/package.json \
    ./apps/${PROJECT}/

# FIXME: Should these deps be installed differently?
# The packages are copied for a transpile process
COPY --from=builder --chown=appuser:appuser /app/packages/ ./packages/


# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=appuser:appuser app/apps/$PROJECT/.next/standalone ./apps/$PROJECT/
COPY --from=builder --chown=appuser:appuser app/apps/$PROJECT/.next/static ./apps/$PROJECT/.next/static
COPY --from=builder --chown=appuser:appuser /app/apps/${PROJECT}/public ./apps/${PROJECT}/public
COPY --from=builder --chown=appuser:appuser /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appuser /app/package.json ./package.json

ENV NEXT_TELEMETRY_DISABLED 1

ENV PORT ${APP_PORT:-3000}

# Expose port
EXPOSE $PORT

ENV PROD_START "./node_modules/.bin/next start apps/${PROJECT}/ -p ${PORT}"

CMD ["sh", "-c", "echo ${PROD_START}"]
###################################################################
# Optional: develop locally                                       #
###################################################################

FROM helsinkitest/node:16-slim  AS develop

# Use non-root user
# USER appuser

# Build ARGS
ARG PROJECT
ARG APP_PORT

ENV NODE_ENV=development

WORKDIR /app

COPY --from=deps --chown=appuser:appuser /workspace-install ./

ENV PORT ${APP_PORT:-3000}

# Expose port
EXPOSE $PORT

ENV DEV_START "yarn dev -p ${PORT}"

WORKDIR /app/apps/$PROJECT

CMD ["sh", "-c", "${DEV_START}"]

