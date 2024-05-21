import { createClient } from 'redis';
import { config } from './config';

const redisClient = createClient({
  url: config.redisConfig.url,
  password: config.redisConfig.password,
});

redisClient.on('error', (err: any) => {
  console.error('Redis error:', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

(async () => {
  await redisClient.connect();
})();

export { redisClient };
