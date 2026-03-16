import { config } from "../config.js";
import logger from "./logger.js";
import NodeCache from "node-cache";

interface CacheData {
  updateTime: string;
  data: unknown;
}

// init NodeCache
const cache = new NodeCache({
  // 缓存过期时间（ 秒 ）
  stdTTL: config.CACHE_TTL,
  // 定期检查过期缓存（ 秒 ）
  checkperiod: 600,
  // 克隆变量
  useClones: false,
  // 最大键值对
  maxKeys: 100,
});

// NodeCache 事件监听
cache.on("expired", (key) => {
  logger.info(`⏳ [NodeCache] Key "${key}" has expired.`);
});

cache.on("del", (key) => {
  logger.info(`🗑️ [NodeCache] Key "${key}" has been deleted.`);
});

/**
 * 从缓存中获取数据
 * @param key 缓存键
 * @returns 缓存数据
 */
export const getCache = async (key: string): Promise<CacheData | undefined> => {
  return cache.get(key);
};

/**
 * 将数据写入缓存
 * @param key 缓存键
 * @param value 缓存值
 * @param ttl 缓存过期时间（ 秒 ）
 * @returns 是否写入成功
 */
export const setCache = async (
  key: string,
  value: CacheData,
  ttl: number = config.CACHE_TTL,
): Promise<boolean> => {
  const success = cache.set(key, value, ttl);
  if (logger) logger.info(`💾 [NodeCache] ${key} has been cached`);
  return success;
};

/**
 * 从缓存中删除数据
 * @param key 缓存键
 * @returns 是否删除成功
 */
export const delCache = async (key: string): Promise<boolean> => {
  const success = cache.del(key) > 0;
  if (logger) logger.info(`🗑️ [NodeCache] ${key} has been deleted`);
  return success;
};
