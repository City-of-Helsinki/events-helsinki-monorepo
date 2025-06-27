import * as path from 'path';
import { fileURLToPath } from 'url';
import {
  ignorableGraphqlErrorCodes,
  startServer,
} from '@events-helsinki/graphql-proxy-server';
import type {
  ServerConfig,
  ContextConstructorArgs,
} from '@events-helsinki/graphql-proxy-server';
import * as dotenv from 'dotenv';
import AppConfig from './config/AppConfig.js';
import EventContext from './context/EventContext.js';
import schema from './schema/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dotEnvFile = path.resolve(__dirname, '../.env');

dotenv.config({ path: dotEnvFile, debug: true, override: true });

const config: ServerConfig = {
  sentryDsn: AppConfig.sentryDsn,
  sentryEnvironment: AppConfig.sentryEnvironment,
  debug: AppConfig.debug,
  serverPort: AppConfig.serverPort,
  disableWinstonLogging: AppConfig.enableWinstonLogging,
  introspection: AppConfig.enableIntrospection,
  formatError: (formattedError, _error) => {
    const code = formattedError?.extensions?.code as string;
    if (code && ignorableGraphqlErrorCodes.includes(code)) {
      return {
        ...formattedError,
        extensions: {
          ...formattedError.extensions,
          // eslint-disable-next-line @stylistic/max-len
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
    contextCallback: async (args: ContextConstructorArgs) =>
      new EventContext(args),
  });
})();
