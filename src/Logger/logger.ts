import winston, { createLogger, format, transports } from 'winston';

export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.Console(),
        new transports.File({ filename: './src/db/logs/default/error.log', level: 'error' }),
        new transports.File({ filename: './src/db/logs/default/combined.log', level: 'info' }),
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
  info(message: string): void {
    this.logger.info(message);
  }

  error(message: { error: string }): void {
    this.logger.error(message);
  }
}
