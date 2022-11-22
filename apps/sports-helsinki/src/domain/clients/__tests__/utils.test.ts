import {
  initializeApolloClient,
  MutableReference,
} from 'events-helsinki-components';

describe('client utils', () => {
  describe('initializeApolloClient', () => {
    it('should mutate references used for caching the client', () => {
      // @ts-ignore
      const mutableCache = new MutableReference();

      // @ts-ignore
      initializeApolloClient({
        initialState: null,
        // @ts-ignore
        mutableCachedClient: mutableCache,
        // @ts-ignore
        createClient: () => 1,
      });

      expect(mutableCache.reference).toStrictEqual(1);
    });
  });
});
