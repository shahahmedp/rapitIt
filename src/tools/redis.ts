import { logger } from '../Logger/index';
import { redisClient } from '../config/redisClient';

// Function to set a value in the cache
export const setCache = async (key: string, value: string, expirationInSeconds: number) => {
  try {
    await redisClient.set(key, value, {
      EX: expirationInSeconds,
    });
    logger.info(`Cache set for key: ${key}`);
  } catch (err) {
    logger.error({ error: err, message: 'Error setting cache:' });
  }
};

// Function to get a value from the cache
export const getCache = async (key: string) => {
  try {
    const data = await redisClient.get(key);
    logger.info(`Cache retrieved for key: ${key}`);
    return data;
  } catch (err) {
    logger.error({ error: err, message: 'Error getting cache:' });
    return null;
  }
};

// Example usage
const cacheKey = 'sampleKey';
const cacheValue = 'sampleValue';
const cacheExpiration = 3600; // 1 hour

setCache(cacheKey, cacheValue, cacheExpiration);

getCache(cacheKey).then((data) => {
  if (data) {
    console.log('Cache hit:', data);
  } else {
    console.log('Cache miss');
  }
});
