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

ARG NODE_VERSION=16
ARG ALPINE_VERSION=3.15

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS deps
RUN apk add --no-cache rsync

WORKDIR /workspace-install

COPY yarn.lock .yarnrc.yml ./
COPY .yarn/ ./.yarn/

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
          --exclude='node_modules' \
          --exclude='*/node_modules' \
          --include='package.json' \
          --include='*/' --exclude='*' \
          /docker-context/ /workspace-install/;


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

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder
ENV NODE_ENV=production
ENV NEXTJS_IGNORE_ESLINT=1
ENV NEXTJS_IGNORE_TYPECHECK=0
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

WORKDIR /app

COPY . .
COPY --from=deps /workspace-install ./

# Optional: if the app depends on global /static shared assets like images, locales...
RUN yarn workspace hobbies-helsinki share-static-hardlink && yarn workspace hobbies-helsinki build

# Does not play well with buildkit on CI
# https://github.com/moby/buildkit/issues/1673
RUN --mount=type=cache,target=/root/.yarn3-cache,id=yarn3-cache \
    SKIP_POSTINSTALL=1 \
    YARN_CACHE_FOLDER=/root/.yarn3-cache \
    yarn workspaces focus hobbies-helsinki --production

###################################################################
# Stage 3: Extract a minimal image from the build                 #
###################################################################

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/hobbies-helsinki/next.config.js \
                    /app/apps/hobbies-helsinki/next-i18next.config.js \
                    /app/apps/hobbies-helsinki/package.json \
                    ./apps/hobbies-helsinki/
COPY --from=builder /app/apps/hobbies-helsinki/public ./apps/hobbies-helsinki/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/hobbies-helsinki/.next ./apps/hobbies-helsinki/.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE ${APP_PORT:-80}

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["./node_modules/.bin/next", "start", "apps/hobbies-helsinki/", "-p", "${APP_PORT:-80}"]


###################################################################
# Optional: develop locally                                       #
###################################################################

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS develop
ENV NODE_ENV=development

WORKDIR /app

COPY --from=deps /workspace-install ./

EXPOSE ${APP_PORT:-80}

WORKDIR /app/apps/hobbies-helsinki

CMD ["yarn", "dev", "-p", "${APP_PORT:-80}"]

