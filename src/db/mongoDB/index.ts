import mongoose from 'mongoose';
import { config } from '../../config/config';

const initMongo = async () => {
  try {
    await mongoose.connect(config.dbConfig.mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export { initMongo };
