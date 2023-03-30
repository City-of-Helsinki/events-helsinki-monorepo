import type { ServerConfig } from '@events-helsinki/graphql-proxy-server/src';
import { startServer } from '@events-helsinki/graphql-proxy-server/src';
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
};

(async () => {
  await startServer({
    config,
    schema,
    contextCallback: async (args) => new EventContext(args),
  });
})();
