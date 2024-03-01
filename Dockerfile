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

# install yarn
USER root
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

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
#   - All package.json present in the host (root, apps/*, packages/*)
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
FROM deps AS builder
# Build ARGS
ARG PROJECT
ARG CMS_ORIGIN
ARG SKIP_BUILD_STATIC_GENERATION
ARG FEDERATION_ROUTER_ENDPOINT
ARG LINKEDEVENTS_EVENT_ENDPOINT
ARG NEXT_PUBLIC_APP_ORIGIN
ARG NEXT_PUBLIC_MATOMO_URL_BASE
ARG NEXT_PUBLIC_MATOMO_SITE_ID
ARG NEXT_PUBLIC_MATOMO_SRC_URL
ARG NEXT_PUBLIC_MATOMO_TRACKER_URL
ARG NEXT_PUBLIC_MATOMO_ENABLED
ARG NEXT_PUBLIC_ASKEM_API_KEY_FI
ARG NEXT_PUBLIC_ASKEM_API_KEY_EN
ARG NEXT_PUBLIC_ASKEM_API_KEY_SV
ARG NEXT_PUBLIC_ASKEM_ENABLED
ARG NEXT_PUBLIC_ALLOW_UNAUTHORIZED_REQUESTS
ARG NEXT_PUBLIC_SENTRY_ENVIRONMENT
ARG NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE
ARG NEXT_PUBLIC_SENTRY_REPLAY_SESSION_SAMPLE_RATE
ARG NEXT_PUBLIC_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE
ARG SENTRY_AUTH_TOKEN
ARG NEXT_PUBLIC_DEBUG
ARG NEXTJS_DISABLE_SENTRY
ARG NEXT_PUBLIC_IMAGE_PROXY_URL
ARG NEXT_PUBLIC_DEFAULT_ISR_REVALIDATE_SECONDS
ARG NEXT_PUBLIC_CMS_HEADER_MENU_NAME_FI
ARG NEXT_PUBLIC_CMS_HEADER_MENU_NAME_EN
ARG NEXT_PUBLIC_CMS_HEADER_MENU_NAME_SV
ARG NEXT_PUBLIC_CMS_HEADER_UNIVERSAL_BAR_MENU_NAME_FI
ARG NEXT_PUBLIC_CMS_HEADER_UNIVERSAL_BAR_MENU_NAME_EN
ARG NEXT_PUBLIC_CMS_HEADER_UNIVERSAL_BAR_MENU_NAME_SV
ARG NEXT_PUBLIC_CMS_FOOTER_MENU_NAME_FI
ARG NEXT_PUBLIC_CMS_FOOTER_MENU_NAME_EN
ARG NEXT_PUBLIC_CMS_FOOTER_MENU_NAME_SV
ARG NEXT_PUBLIC_CMS_ARTICLES_CONTEXT_PATH
ARG NEXT_PUBLIC_CMS_PAGES_CONTEXT_PATH
ARG NEXT_PUBLIC_RELEASE
ARG NEXT_PUBLIC_COMMITHASH

WORKDIR /app

COPY --chown=default:root . .
COPY --from=deps --chown=default:root /workspace-install ./

# Optional: if the app depends on global /static shared assets like images, locales...

RUN yarn install --immutable --inline-builds
RUN yarn workspace ${PROJECT} share-static-hardlink
RUN yarn workspace ${PROJECT} build

# Does not play well with buildkit on CI
# https://github.com/moby/buildkit/issues/1673
# mount type cache is not supported on current version (4.10.35) of OpenShift build
#RUN --mount=type=cache,target=/root/.yarn3-cache,id=yarn3-cache \
#    SKIP_POSTINSTALL=1 \
#    YARN_CACHE_FOLDER=/root/.yarn3-cache \
#    yarn workspaces focus ${PROJECT} --production

CMD ["sh", "-c", "echo ${PROJECT}"]

###################################################################
# Optional: develop locally                                       #
# NOTE: "In multi-stage builds,                                   #
# last stage should be the production build."                     #
###################################################################

FROM deps AS develop

# Use non-root user
USER default

# Build ARGS
ARG PROJECT
ARG APP_PORT

ENV NODE_ENV=development

WORKDIR /app

COPY --from=deps --chown=default:root /workspace-install ./

ENV PORT ${APP_PORT:-3000}

# Expose port
EXPOSE $PORT

ENV DEV_START "yarn dev -p ${PORT}"

WORKDIR /app/apps/$PROJECT

CMD ["sh", "-c", "${DEV_START}"]


###################################################################
# Stage 3: Extract a minimal image from the build                 #
###################################################################

FROM deps AS runner

# Use non-root user
USER default

# Build ARGS
ARG PROJECT
ARG APP_PORT

WORKDIR /app

ENV PATH $PATH:/app/node_modules/.bin
ENV NODE_ENV production

# Copy the configuration files to the apps/project root
COPY --from=builder --chown=default:root /app/apps/${PROJECT}/next.config.js \
    /app/apps/${PROJECT}/i18nRoutes.config.js \
    /app/apps/${PROJECT}/next-i18next.config.js \
    /app/apps/${PROJECT}/package.json \
    ./apps/${PROJECT}/

# Copy common-i18n to share localization files after build
COPY --from=builder --chown=default:root /app/packages/common-i18n/src/locales \
    ./packages/common-i18n/src/locales

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# copy only the necessary files for a production deployment including select files in node_modules.
COPY --from=builder --chown=default:root /app/apps/${PROJECT}/.next/standalone .
COPY --from=builder --chown=default:root /app/apps/${PROJECT}/.next/static ./apps/${PROJECT}/.next/static
COPY --from=builder --chown=default:root /app/apps/${PROJECT}/public ./apps/${PROJECT}/public
COPY --from=builder --chown=default:root /app/next.base.config.js .
RUN cp -r /app/apps/${PROJECT}/.next/ /app/.next_orig/

# OpenShift write access to Next cache folder
USER root
RUN chgrp -R 0 /app/apps/${PROJECT}/.next/server/pages && chmod g+w -R /app/apps/${PROJECT}/.next/server/pages
USER default

ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT ${APP_PORT:-3000}

# Expose port
EXPOSE $PORT

USER root
COPY --chown=default:root run_node.sh /app/run_node.sh
RUN chgrp 0 /app/run_node.sh && chmod +x /app/run_node.sh
USER default

# ENV PROD_START "./node_modules/.bin/next start apps/${PROJECT}/ -p ${PORT}"
# ENV PROD_START "node ./apps/${PROJECT}/server.js"

ENV PROJECT ${PROJECT}

CMD ["sh", "-c", "/app/run_node.sh"]

