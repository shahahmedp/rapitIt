import mongoose from 'mongoose';

import { dbConfig } from '../config/config';

import { initMongo } from './mongoDB/index';
import { db as postgresDb, initPostgres } from './postgreSQL';
// import {
//   postgresDbInterface,
//   //mongoDbInterface
// } from '@db/db.interface';

let db: any; //postgresDbInterface| void; // | mongoDbInterface
const dbInit = async () => {
  if (dbConfig.type === 'postgreSQL') {
    db = await initPostgres();
    return postgresDb;
  } else if (dbConfig.type === 'mongoDB') {
    db = await initMongo();
    return mongoose; // or return any MongoDB-specific DB object if needed
  } else {
    throw new Error('Unsupported database type');
  }
};

export { db, dbInit };
