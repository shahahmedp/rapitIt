import { devLogger } from './devLogger';
import { Logger } from './logger';
import { LoggerInterface } from './LoggerInterface';

let logger: LoggerInterface;

if (process.env.NODE_ENV === 'development') {
  logger = new devLogger();
}

if (process.env.NODE_ENV === 'testing') {
  logger = new devLogger();
}
logger = new Logger();

export { logger };
