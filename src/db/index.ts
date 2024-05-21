import { config } from '../config/config';
import { initPostgres, db as postgresDb } from './PostgresSQL/index';
import { initMongo } from './MongoDB/index';
import mongoose from 'mongoose';

const dbInit = async () => {
  if (config.dbConfig.type === 'PostgresSQL') {
    await initPostgres();
    return postgresDb;
  } else if (config.dbConfig.type === 'MongoDB') {
    await initMongo();
    return mongoose; // or return any MongoDB-specific DB object if needed
  } else {
    throw new Error('Unsupported database type');
  }
};

export { dbInit };
