import { CacheStore } from '@nestjs/cache-manager';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import Redis from 'ioredis';

export class KeyvStore implements CacheStore {
  private keyv: Keyv;

  constructor() {
    const redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD
    });

    this.keyv = new Keyv({
      store: new KeyvRedis(redis)
    });
  }

  async get<T>(key: string): Promise<T | undefined> {
    return await this.keyv.get(key);
  }

  async set<T>(
    key: string,
    value: T,
    options?: { ttl: number }
  ): Promise<void> {
    await this.keyv.set(key, value, options?.ttl);
  }

  async del(key: string): Promise<void> {
    await this.keyv.delete(key);
  }
}
