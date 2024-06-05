import { dbConfig } from '../config/config';
import { initPostgres, db as postgresDb } from './postgreSQL';
import { initMongo } from './mongoDB/index';
import { dbConstants } from '../constants/repoConstants';
import mongoose from 'mongoose';
import { logger } from '../Logger/index';

const dbInit = async () => {
  if (dbConfig.type === dbConstants.POSTGRES) {
    await initPostgres();
    return postgresDb;
  } else {
    logger.error({ message: 'Unsupported database type' });
  }

  // if (dbConfig.type === dbConstants.BOTH) {
  //   await initMongo();
  //   return mongoose;
  //   await initPostgres();
  //   return postgresDb;
  // } else {
  //   logger.error({ message: 'Unsupported database type' });
  // }

  if (dbConfig.type === dbConstants.MONGO) {
    await initMongo();
    return mongoose; // or return any MongoDB-specific DB object if needed
  } else {
    logger.error({ message: 'Unsupported database type' });
  }
};

export { dbInit };
