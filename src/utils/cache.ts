import { redis } from "@config";

export const cacheSet = async (key: string, value: any, expiry = 3600) => {
  await redis.set(key, JSON.stringify(value), 'EX', expiry); 
};

export const cacheGet = async (key: string) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

export const cacheDelete = async (key: string) => {
    await redis.del(key);
  };