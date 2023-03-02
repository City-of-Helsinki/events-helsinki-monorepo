import { initializeApolloClient, MutableReference } from '../utils';

describe('client utils', () => {
  describe('createInstance', () => {
    it('should mutate references used for caching the client', () => {
      // @ts-ignore
      const mutableCache = new MutableReference();

      initializeApolloClient({
        // @ts-ignore
        mutableCachedClient: mutableCache,
        // @ts-ignore
        createClient: () => 1,
      });

      expect(mutableCache.reference).toStrictEqual(1);
    });
  });
});
