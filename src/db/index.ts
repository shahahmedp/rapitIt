import { dbConfig } from '../config/config';
import { 
  initPostgres,
} from './postgreSQL';
import { initMongo } from './mongoDB/index';
import { dbConstants } from '../constants/repoConstants';
//import mongoose from 'mongoose';
import { logger } from '../Logger/index';

const dbInit = async () => {
  try{
    dbConfig.type === dbConstants.MONGO ? await initMongo()
      :dbConfig.type === dbConstants.POSTGRES ? await initPostgres()
      :dbConfig.type === dbConstants.BOTH ? async () => { await initPostgres(); await initMongo()}
      : () => { throw new Error('Unsupported database type')}
  }catch(err){
    logger.error({ message:  err });
  }
  
};

export { dbInit };
