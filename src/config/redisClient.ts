import { createClient } from 'redis';

import { logger } from '../Logger';

import { redisConfig } from './config';

const redisClient = createClient({
  url: redisConfig.url,
  password: redisConfig.password
});

redisClient.on('error', (err: object) => {
  logger.error({ 'Redis error:': err });
});

redisClient.on('connect', () => {
  logger.info('Connected to Redis');
});

(async () => {
  await redisClient.connect();
})();

export { redisClient };
