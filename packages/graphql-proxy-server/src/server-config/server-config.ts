import type { ApolloServerOptions } from '@apollo/server';
import type { AppLanguage } from '../types.js';
type SentryConfig = {
  sentryDsn?: string; // process.env.GRAPHQL_PROXY_SENTRY_DSN
  sentryEnvironment?: string; // process.env.GRAPHQL_PROXY_SENTRY_ENVIRONMENT
};

type NodeConfig = {
  env?: string;
};

export type ServerContextConfig = {
  // Some datasources  uses language headers to resolve fields
  languages?: Array<AppLanguage>;
};

export type ServerConfig = SentryConfig &
  ServerContextConfig &
  NodeConfig & {
    debug?: boolean; // process.env.GRAPHQL_PROXY_DEBUG
    serverPort: number; // process.env.GRAPHQL_PROXY_PORT
    disableWinstonLogging?: boolean; // process.env.GRAPHQL_PROXY_DISABLE_WINSTON_LOGGING
    introspection?: boolean; // process.env.GRAPHQL_PROXY_INTROSPECTION
    formatError?: ApolloServerOptions<object>['formatError'];
  };

// singleton pattern
let serverConfig: ServerConfig;

export const createServerConfig = (config: ServerConfig): ServerConfig => {
  if (serverConfig) {
    throw new Error('Cannot create Server config twice!');
  }
  serverConfig = Object.freeze({
    ...config,
    env: process.env.NODE_ENV ?? 'development',
  });
  return serverConfig;
};

export const getServerConfig = () => {
  if (!serverConfig) {
    throw new Error('You forgot to create server config first?');
  }
  return serverConfig;
};
