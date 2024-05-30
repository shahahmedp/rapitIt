import { config } from '../config/config';
import { initPostgres, db as postgresDb } from './postgreSQL';
import { initMongo } from './mongoDB/index';
import mongoose from 'mongoose';
// import { 
//   postgresDbInterface, 
//   //mongoDbInterface 
// } from '@db/db.interface';

let db: any//postgresDbInterface| void; // | mongoDbInterface 
const dbInit = async () => {
  if (config.dbConfig.type === 'postgreSQL') {
    db = await initPostgres();
    return postgresDb;
  } else if (config.dbConfig.type === 'mongoDB') {
    db = await initMongo();
    return mongoose; // or return any MongoDB-specific DB object if needed
  } else {
    throw new Error('Unsupported database type');
  }
};

export { dbInit, db };
