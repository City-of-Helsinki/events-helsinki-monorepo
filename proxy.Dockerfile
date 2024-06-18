###################################################################
# Stage 1: Install all workspaces (dev)dependencies               #
#          and generates node_modules folder(s)                   #
# ----------------------------------------------------------------#
# Notes:                                                          #
#   1. this stage relies on buildkit features                     #
#   2. depend on .dockerignore, you must at least                 #
#      ignore: all **/node_modules folders and .yarn/cache        #
###################################################################

FROM registry.access.redhat.com/ubi9/nodejs-20 AS deps

USER root

# install yarn
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

# install rsync (to fetch cached files)
RUN yum update -y && \
    yum install -y rsync

WORKDIR /workspace-install

COPY --chown=default:root yarn.lock .yarnrc.yml ./
COPY --chown=default:root .yarn/ ./.yarn/

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
COPY --chown=default:root . /docker-context

# mount type bind is not supported on current version (4.10.35) of OpenShift build
# RUN --mount=type=bind,source=./,target=/docker-context \
RUN rsync -amv \
    --chown=default:root \
    --exclude='node_modules' \
    --exclude='*/node_modules' \
    --include='package.json' \
    --include='*/' --exclude='*' \
    /docker-context/ /workspace-install/;

RUN chown -R default:root .

# remove rsync, unused dependencies, and clean yum cache
RUN yum remove -y rsync && \
    yum autoremove -y && \
    yum clean all && \
    rm -rf /var/cache/yum


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

FROM registry.access.redhat.com/ubi9/nodejs-20 AS builder

USER root

# install yarn
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

# Use non-root user
USER default

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

COPY --chown=default:root  . .
COPY --from=deps --chown=default:root /workspace-install ./

# Optional: if the app depends on global /static shared assets like images, locales...

RUN yarn install --immutable --inline-builds

# build
RUN yarn workspace ${PROXY} build

###################################################################
# Optional: develop locally                                       #
# NOTE: "In multi-stage builds,                                   #
# last stage should be the production build."                     #
###################################################################

FROM registry.access.redhat.com/ubi9/nodejs-20 AS develop

# install yarn
USER root
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

# Use non-root user
USER default

# Build ARGS
ARG PROXY
ARG GRAPHQL_PROXY_PORT

ENV PATH $PATH:/app/node_modules/.bin
ENV NODE_ENV=development

WORKDIR /app

# Copy the configuration files to the proxies/${PROXY} root
COPY --from=builder --chown=default:root /app/proxies/${PROXY}/package.json ./proxies/${PROXY}/

# Copy the build files to the proxies/${PROXY} root
COPY --from=builder --chown=default:root /app/proxies/${PROXY}/build ./proxies/${PROXY}/build

# The root level files
COPY --from=builder --chown=default:root /app/node_modules ./node_modules
COPY --from=builder --chown=default:root /app/package.json ./package.json

# Expose port
EXPOSE ${GRAPHQL_PROXY_PORT:-4100}

# Start graphql proxy dev server
ENV DEV_START "yarn workspace ${PROXY} dev"

CMD ["sh", "-c", "${DEV_START}"]

###################################################################
# Stage 3: Extract a minimal image from the build                 #
###################################################################

FROM registry.access.redhat.com/ubi9/nodejs-20 AS runner


# Build ARGS
ARG PROXY
ARG GRAPHQL_PROXY_PORT

ENV PATH $PATH:/app/node_modules/.bin
ENV NODE_ENV production

# install yarn
USER root
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

# Use non-root user
USER default

WORKDIR /app

# Copy the configuration files to the proxies/${PROXY} root
COPY --from=builder --chown=default:root /app/proxies/${PROXY}/package.json ./proxies/${PROXY}/

# Copy the build files to the proxies/${PROXY} root
COPY --from=builder --chown=default:root /app/proxies/${PROXY}/build ./proxies/${PROXY}/build

# The root level files
COPY --from=builder --chown=default:root /app/node_modules ./node_modules
COPY --from=builder --chown=default:root /app/package.json ./package.json

# Expose port
EXPOSE ${GRAPHQL_PROXY_PORT:-4100}

# Start graphql proxy server
ENV PROD_START "yarn workspace ${PROXY} start"

CMD ["sh", "-c", "${PROD_START}"]
