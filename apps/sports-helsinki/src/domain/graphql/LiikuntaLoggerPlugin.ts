import type { ApolloServerPlugin } from '@apollo/server';
import { graphqlLogger as logger } from '../../logger';
import type { Context } from '../nextApi/types';
import ResolverMonitor from './ResolverMonitor';

function getResolverName(
  operationName = 'unnamed',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: any = {},
  context: Context
) {
  const variablesAsString = Object.entries(variables)
    .map(([key, value]) => `${key}: ${value}`)
    .join(',');
  const language = context.language;
  const contextAsString = language ? `[${language}]` : '';

  return `${operationName}(${variablesAsString})${contextAsString}`;
}

export default class LiikuntaLoggerPlugin implements ApolloServerPlugin {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async requestDidStart({ request, context }: any) {
    const requestName = getResolverName(
      request.operationName,
      request.variables,
      context
    );
    const monitor = new ResolverMonitor(logger, requestName);

    logger.info(`Received request ${requestName}`);

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async didEncounterErrors({ errors }: any) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorsAsString = errors.map((error: any) => error?.toString());

        logger.error(
          `Error while resolving ${requestName}:\n\n${errorsAsString.join(
            '\n'
          )}\n`
        );
      },
      async willSendResponse() {
        monitor.end();
        logger.info(`Completed request ${requestName}`);
      },
    };
  }
}
