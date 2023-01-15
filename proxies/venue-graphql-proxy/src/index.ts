import * as dotenv from 'dotenv';

import type { ServerConfig } from 'events-helsinki-graphql-proxy-server/src';
import { startServer } from 'events-helsinki-graphql-proxy-server/src';
import AppConfig from './config/AppConfig';
import VenueContext from './context/VenueContext';
import schema from './schema';

dotenv.config();

const trueEnv = ['true', '1', 'yes'];

const config: ServerConfig = {
  sentryDsn: process.env.GRAPHQL_PROXY_SENTRY_DSN,
  sentryEnvironment: process.env.GRAPHQL_PROXY_SENTRY_ENVIRONMENT,
  debug: AppConfig.debug,
  serverPort: Number(process.env.GRAPHQL_PROXY_PORT) || 4200,
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
    contextCallback: async (args) => new VenueContext(args),
  });
})();
