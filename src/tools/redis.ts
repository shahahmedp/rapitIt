import { redisClient } from '../config/redisClient';

// Function to set a value in the cache
export const setCache = async (key: string, value: string, expirationInSeconds: number) => {
  try {
    await redisClient.set(key, value, {
      EX: expirationInSeconds
    });
    console.log(`Cache set for key: ${key}`);
  } catch (err) {
    console.error('Error setting cache:', err);
  }
};

// Function to get a value from the cache
export const getCache = async (key: string) => {
  try {
    const data = await redisClient.get(key);
    console.log(`Cache retrieved for key: ${key}`);
    return data;
  } catch (err) {
    console.error('Error getting cache:', err);
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
