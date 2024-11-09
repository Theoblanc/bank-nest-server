export interface ICacheStore {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T, options?: { ttl: number }): Promise<void>;
  del(key: string): Promise<void>;
  reset(): Promise<void>;
}
