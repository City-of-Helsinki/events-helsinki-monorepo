type LoggerFunction = (
  message?: string,
  ...optionalParameters: unknown[]
) => void;

export type Logger = {
  debug?: LoggerFunction;
  info?: LoggerFunction;
  warn?: LoggerFunction;
  error?: LoggerFunction;
};
