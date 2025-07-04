import winston from 'winston';
import { getServerConfig } from '../server-config/server-config.js';

const createLogger = (): winston.Logger => {
  const serverConfig = getServerConfig();
  return winston.createLogger({
    level: 'info',
    silent: serverConfig.disableWinstonLogging,
    transports: [
      new winston.transports.Console({
        // format: winston.format.prettyPrint(),
      }),
      // Uncomment if you want to log to files, see: https://github.com/winstonjs/winston#usage
      // new winston.transports.File({
      //   filename: 'combined.log',
      //   format: winston.format.simple(),
      // }),
    ],
  });
};

export default createLogger;
