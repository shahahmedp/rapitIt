import { dbConfig } from '../config/config';
import { initPostgres, db as postgresDb } from './postgreSQL';
import { initMongo } from './mongoDB/index';
import mongoose from 'mongoose';
import { logger } from '../Logger/index';

const dbInit = async () => {
  if (dbConfig.type === 'postgreSQL') {
    await initPostgres();
    return postgresDb;
  } else if (dbConfig.type === 'mongoDB') {
    await initMongo();
    return mongoose; // or return any MongoDB-specific DB object if needed
  } else {
    logger.error({ message: 'Unsupported database type' });
  }
};

export { dbInit };
