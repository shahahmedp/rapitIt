import dotenv from 'dotenv';
import 'reflect-metadata';
import { app } from './app';
import { logger } from './Logger';
import { config } from './config/config';
import { dbInit } from './db/index';
import { handleError } from './utils';
import { StatusConstants as dailogue } from './constants/repoConstants';
// Load environment variables from .env file
dotenv.config({
  path: process.env.NODE_ENV ? `./env/${process.env.NODE_ENV}.env` : `./env/.env`,
});

const PORT = config.PORT;
console.log('env', process.env.MODE, process.env.PORT, process.env.NODE_ENV, `./env/${process.env.NODE_ENV}.env`);

const startServer = () => {
  app.listen(PORT, async () => {
    logger.info(`Backend Service App started at: ${new Date()} on port ${PORT}`);
    try {
      await dbInit();
      logger.info('Database initialized successfully.');
    } catch (err) {
      logger.error({ message: 'Error initializing the database: ', error: err });
      handleError(err, dailogue.code500.code);
    }
  });
};

startServer();
