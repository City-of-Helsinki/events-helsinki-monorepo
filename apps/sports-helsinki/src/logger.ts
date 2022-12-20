import { createLogger } from 'events-helsinki-components';
import AppConfig from './domain/app/AppConfig';

export const graphqlLogger = createLogger('graphql', AppConfig.debug);
export const graphqlClientLogger = createLogger(
  'graphql-client',
  AppConfig.debug
);
export const dataSourceLogger = createLogger('dataSource', AppConfig.debug);
export const dataSourceHaukiLogger = createLogger('ds:Hauki');
export const dataSourceTprekLogger = createLogger('ds:Tprek', AppConfig.debug);
export const dataSourceLinkedLogger = createLogger(
  'ds:linked',
  AppConfig.debug
);
export const staticGenerationLogger = createLogger(
  'staticGeneration',
  AppConfig.debug
);
export const logger = createLogger('general', AppConfig.debug);
export const networkLogger = createLogger('network', AppConfig.debug);
