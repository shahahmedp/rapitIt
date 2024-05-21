import { config } from '../config/config';
import { initPostgres, db as postgresDb } from './postgresSQL/index';
import { initMongo } from './mongoDB/index';
import mongoose from 'mongoose';

const dbInit = async () => {
  if (config.dbConfig.type === 'postgresSQL') {
    await initPostgres();
    return postgresDb;
  } else if (config.dbConfig.type === 'mongoDB') {
    await initMongo();
    return mongoose; // or return any MongoDB-specific DB object if needed
  } else {
    throw new Error('Unsupported database type');
  }
};

export { dbInit };
