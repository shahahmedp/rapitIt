import { response } from 'express';

import 'reflect-metadata';

import { config } from './config/config';
import { StatusConstants as dailogue } from './constants/statusConstants';
import { dbInit } from './db/index';
import { app } from './app';
import { logger } from './Logger';
import { handleError } from './utils';
// Load environment variables from .env file
require('dotenv').config({
  path: process.env.NODE_ENV ? `./env/${process.env.NODE_ENV}.env` : `./env/.env`
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
    handleError(response, err, dailogue.code500.code);
  }
};

start();
