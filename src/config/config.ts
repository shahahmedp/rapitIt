import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV ? `./env/${process.env.NODE_ENV}.env` : `./env/.env`,
});
export const config = {
  PORT: process.env.PORT,
};
export const postgreSQLdbConfig = {
  username: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.DB_NAME,
  host: '127.0.0.1',
  dialect: 'postgres',
  mongoUri: process.env.MONGO_URI
    ? `${process.env.MONGO_URI}/${process.env.DB_NAME}`
    : `mongodb://localhost:27017/${process.env.DB_NAME}`,
};

export const mongoDbConfig = {
  mongoUri: process.env.MONGO_URI
    ? `${process.env.MONGO_URI}/${process.env.DB_NAME}`
    : `mongodb://localhost:27017/${process.env.DB_NAME}`,
};
export const dbConfig = {
  type: 'postgreSQL',
};

export const redisConfig = {
  url: 'redis://localhost:6379', // Redis server URL
  // Optional: Include if your Redis server requires authentication
  password: '',
};
export const awsS3Bucket = process.env.IMAGEUpload + '';
export const nodemailerConfig = {
  includePortInDomain: process.env.INCLUDE_PORT_IN_NODE_DOMAIN || 'YES',
  serverPort: process.env.PORT,
  protocol: process.env.DEFAULT_NODE_PROTOCOL,
  serverUrl: process.env.SERVER_URL,
  prodDomain: process.env.NODE_DOMAIN_NAME || '',
  host: process.env.SMTP_HOST!,
  port: process.env.SMTP_PORT!,
  userName: process.env.MAILING_USERNAME!,
  pass: process.env.MAILING_PASSWORD!,
  sender: process.env.SENDER_INFO!,
};
export const secretKey = {
  secret: process.env.APP_SECRET,
  expiresIn: process.env.expiresIn,
};
