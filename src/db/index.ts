import { config } from '../config/config';
import { initPostgres, db as postgresDb } from './postgres/index';
import { initMongo } from './mongoDB/index';
import mongoose from 'mongoose';

const dbInit = async () => {
  if (config.dbConfig.type === 'Postgres') {
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
