import mongoose from 'mongoose';
import { dbConfig } from '../../config/config';
import { logger } from '../../Logger';

const initMongo = async () => {
  try {
    await mongoose.connect(dbConfig.mongoUri);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error({
      message: 'Error connecting to MongoDB',
      error: error,
    });
    console.error();
    process.exit(1);
  }
};

export { initMongo };
