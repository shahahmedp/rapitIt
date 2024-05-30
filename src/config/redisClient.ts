import { createClient } from 'redis';
import { config } from './config';
import { logger } from '../Logger';

const redisClient = createClient({
  url: config.redisConfig.url,
  password: config.redisConfig.password,
});

redisClient.on('error', (err: object) => {
  logger.error({'Redis error:': err})
});

redisClient.on('connect', () => {
  logger.info('Connected to Redis')
});

(async () => {
  await redisClient.connect();
})();

export { redisClient };
