import type { ServerConfig } from '@events-helsinki/graphql-proxy-server/src';
import {
  ignorableGraphqlErrorCodes,
  startServer,
} from '@events-helsinki/graphql-proxy-server/src';
import * as dotenv from 'dotenv';
import EventContext from './context/EventContext';
import schema from './schema';

dotenv.config();

const trueEnv = ['true', '1', 'yes'];

const config: ServerConfig = {
  sentryDsn: process.env.GRAPHQL_PROXY_SENTRY_DSN,
  sentryEnvironment: process.env.GRAPHQL_PROXY_SENTRY_ENVIRONMENT,
  debug: trueEnv.includes(process.env.GRAPHQL_PROXY_DEBUG ?? 'false'),
  serverPort: Number(process.env.GRAPHQL_PROXY_PORT) || 4100,
  disableWinstonLogging: trueEnv.includes(
    process.env.GRAPHQL_PROXY_DISABLE_WINSTON_LOGGING ?? 'false'
  ),
  introspection: trueEnv.includes(
    process.env.GRAPHQL_PROXY_INTROSPECTION ?? 'false'
  ),
  formatError: (formattedError, _error) => {
    const code = formattedError?.extensions?.code as string;
    if (code && ignorableGraphqlErrorCodes.includes(code)) {
      return {
        ...formattedError,
        extensions: {
          ...formattedError.extensions,
          note: `This error can be ignored with a HTTP header! If you know what you are doing, you can use this error code (${code}) as value for "X-Ignored-Error-Code" request header ("X-Ignored-Error-Code: ${code}"). It should be noted that the data may be manipulated by the proxy-server when the error is ignored: E.g the false items can be skipped, which affects to the amount of results per a paginated result set.`,
        },
      };
    }
    // Otherwise return the formatted error. This error can also
    // be manipulated in other ways, as long as it's returned.
    return formattedError;
  },
};

(async () => {
  await startServer({
    config,
    schema,
    contextCallback: async (args) => new EventContext(args),
  });
})();
