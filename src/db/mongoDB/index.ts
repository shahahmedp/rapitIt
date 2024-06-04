import mongoose from 'mongoose';

import { dbConfig } from '../../config/config';

const initMongo = async () => {
  try {
    await mongoose.connect(dbConfig.mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export { initMongo };
