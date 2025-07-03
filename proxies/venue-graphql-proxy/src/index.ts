import { startServer } from '@events-helsinki/graphql-proxy-server';
import type {
  ServerConfig,
  ContextConstructorArgs,
} from '@events-helsinki/graphql-proxy-server';
import * as dotenv from 'dotenv';
import AppConfig from './config/AppConfig.js';
import VenueContext from './context/VenueContext.js';
import schema from './schema/index.js';

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
  languages: ['fi', 'en', 'sv'],
};

(async () => {
  await startServer({
    config,
    schema,
    contextCallback: async (args: ContextConstructorArgs) =>
      new VenueContext(args),
  });
})();
