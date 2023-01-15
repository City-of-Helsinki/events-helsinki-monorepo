import chalk from 'chalk';
import AppConfig from '../config/AppConfig';
import type { Logger, LoggerFunction } from '../types';

function getColor(level: string) {
  switch (level) {
    case 'error':
      return chalk.bold.red;
    case 'warn':
      return chalk.bold.yellow;
    case 'debug':
      return chalk.cyan;
    case 'info':
      return chalk.bold.white;
    default:
      return chalk.white;
  }
}

function formatMessage(
  namespace: string,
  level: string,
  message?: Parameters<LoggerFunction>[0],
  ...optionalParameters: Parameters<LoggerFunction>[1][]
) {
  const color = getColor(level);
  const tags = [level, namespace];
  const renderedTag = tags.map((tag) => `[${tag}]`).join(' ');
  const messageData = {
    level,
    timestamp: new Date().toJSON(),
    message: [`${renderedTag} - `, message, ...optionalParameters].join(' '),
  };

  return [
    new Date(messageData.timestamp).toLocaleTimeString(),
    `${color(renderedTag)} -`,
    message,
  ].join(' ');
}

function createLogger(namespace: string, debug = false): Logger {
  return {
    debug: (
      message?: Parameters<LoggerFunction>[0],
      ...optionalParameters: Parameters<LoggerFunction>[1][]
    ) =>
      debug &&
      // eslint-disable-next-line no-console
      console.debug(
        formatMessage(namespace, 'debug', message, ...optionalParameters)
      ),
    info: (
      message?: Parameters<LoggerFunction>[0],
      ...optionalParameters: Parameters<LoggerFunction>[1][]
    ) =>
      // eslint-disable-next-line no-console
      console.info(
        formatMessage(namespace, 'info', message, ...optionalParameters)
      ),
    warn: (
      message?: Parameters<LoggerFunction>[0],
      ...optionalParameters: Parameters<LoggerFunction>[1][]
    ) =>
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(namespace, 'warn', message, ...optionalParameters)
      ),
    error: (
      message?: Parameters<LoggerFunction>[0],
      ...optionalParameters: Parameters<LoggerFunction>[1][]
    ) =>
      // eslint-disable-next-line no-console
      console.error(
        formatMessage(namespace, 'error', message, ...optionalParameters)
      ),
  };
}

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
