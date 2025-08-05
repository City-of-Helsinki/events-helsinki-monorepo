import type { ApolloServerPlugin } from '@apollo/server';
import * as SentryBrowser from '@sentry/browser';
import * as Sentry from '@sentry/node';
import type ContextValue from '../context/ContextValue.js';
import { getServerConfig } from '../server-config/server-config.js';

const sentryLoggingPlugin = <T>(): ApolloServerPlugin<ContextValue<T>> => {
  const config = getServerConfig();
  Sentry.init({
    dsn: config.sentryDsn,
    environment: config.sentryEnvironment,
    integrations: [
      // used for rewriting SourceMaps from js to ts
      // check that sourcemaps are enabled in tsconfig.js
      // read the docs https://docs.sentry.io/platforms/node/typescript/
      SentryBrowser.rewriteFramesIntegration({
        root: process.cwd(),
      }),
    ],
  });
  return {
    async requestDidStart() {
      return {
        async didEncounterErrors(rc) {
          Sentry.withScope((scope) => {
            scope.setTags({
              graphql: rc.operation?.operation || 'parse_err',
              graphqlName: rc.operationName || rc.request.operationName,
            });

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            rc.errors.forEach((error) => {
              if (error.path || error.name !== 'GraphQLError') {
                scope.setExtras({
                  path: error.path,
                });
                Sentry.captureException(error);
              } else {
                scope.setExtras({});
                Sentry.captureMessage(`GraphQLWrongQuery: ${error.message}`);
              }
            });
          });
        },
      };
    },
  };
};

export default sentryLoggingPlugin;
