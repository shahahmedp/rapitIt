import winston, { createLogger, format, transports } from 'winston';
import { LoggerInterface } from '../types';
const path = process.env.NODE_ENV;
export class Logger implements LoggerInterface {  private logger: winston.Logger;

  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.Console(),
        new transports.File({ filename: './src/db/logs/' + path + '/error.log', level: 'error' }),
        new transports.File({ filename: './src/db/logs/' + path + '/info.log', level: 'info' }),
        new transports.File({ filename: './src/db/logs/' + path + '/warn.log', level: 'warn' }),
      ],
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        }),
      ),
    });
  }
  log(message: string): void {
    console.log(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: object): void {
    this.logger.error(message);
  }
}
