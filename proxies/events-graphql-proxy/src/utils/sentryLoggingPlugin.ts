import type { ApolloServerPlugin } from '@apollo/server';
import * as Sentry from '@sentry/node';
import type ContextValue from '../context/context-value';

const sentryLoggingPlugin: ApolloServerPlugin<ContextValue> = {
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

export default sentryLoggingPlugin;
