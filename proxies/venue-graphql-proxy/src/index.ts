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

const config: ServerConfig = {
  sentryDsn: AppConfig.sentryDsn,
  sentryEnvironment: AppConfig.sentryEnvironment,
  debug: AppConfig.debug,
  serverPort: AppConfig.serverPort,
  disableWinstonLogging: AppConfig.enableWinstonLogging,
  introspection: AppConfig.enableIntrospection,
  languages: [...AppConfig.supportedLocales],
};

(async () => {
  await startServer({
    config,
    schema,
    contextCallback: async (args: ContextConstructorArgs) =>
      new VenueContext(args),
  });
})();
