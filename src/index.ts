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

const start = async () => {
  try {
    // Initializing the db before starting the server
    await dbInit();

    app.listen(PORT, () => {
      logger.info(`Backend Service App started at: ${new Date()} on port ${PORT}`);
    });
  } catch (err) {
    handleError(err, dailogue.code500.code);
  }
};

start();
