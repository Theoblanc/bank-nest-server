import { ICacheStore } from '@common/infrastructure/cache/cache-store.interface';

export const mockCacheStore: jest.Mocked<ICacheStore> = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  reset: jest.fn()
};
