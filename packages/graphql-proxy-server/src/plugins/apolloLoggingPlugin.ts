import type { ApolloServerPlugin } from '@apollo/server';
import { v4 as uuidv4 } from 'uuid';
import { X_REQUEST_ID } from '../constants.js';
import type ContextValue from '../context/ContextValue.js';
import createLogger from '../utils/create-logger.js';

const apolloLoggingPlugin: <T>() => ApolloServerPlugin<
  ContextValue<T>
> = () => {
  const logger = createLogger();
  return {
    async requestDidStart({ request, contextValue }) {
      const profiler = logger.startTimer();
      const requestId = request.http?.headers.get(X_REQUEST_ID) || uuidv4();

      // Add request id to context so it can be passed upstream in datasources
      contextValue.X_REQUEST_ID = request.http?.headers.get(X_REQUEST_ID);

      logger.info({
        message: 'GraphQL Request started',
        requestId,
        operationName: request.operationName,
        variables: request.variables,
      });

      return {
        async didEncounterErrors({ request, errors }) {
          logger.error({
            message: 'Apollo encountered errors:',
            requestId: requestId,
            variables: request.variables,
            operationName: request.operationName,
            errors: errors,
          });
        },
        async willSendResponse({ request }) {
          profiler.done({
            message: 'Sending response',
            requestId: requestId,
            operationName: request.operationName,
          });
        },
      };
    },
  };
};
export default apolloLoggingPlugin;
