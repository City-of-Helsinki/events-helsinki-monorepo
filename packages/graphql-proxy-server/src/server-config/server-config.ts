type SentryConfig = {
  sentryDsn?: string; // process.env.GRAPHQL_PROXY_SENTRY_DSN
  sentryEnvironment?: string; // process.env.GRAPHQL_PROXY_SENTRY_ENVIRONMENT
};

type NodeConfig = {
  env?: string;
};

export type ServerConfig = SentryConfig &
  NodeConfig & {
    debug?: boolean; // process.env.GRAPHQL_PROXY_DEBUG
    serverPort: number; // process.env.GRAPHQL_PROXY_PORT
    disableWinstonLogging?: boolean; // process.env.GRAPHQL_PROXY_DISABLE_WINSTON_LOGGING
    introspection?: boolean; // process.env.GRAPHQL_PROXY_INTROSPECTION
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