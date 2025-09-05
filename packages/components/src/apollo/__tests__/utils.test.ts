import { LanguageCodeEnum } from '../../types';
import {
  initializeApolloClient,
  MutableReference,
  getQlLanguage,
  getUnifiedSearchLanguage,
  getMenuLocationFromLanguage,
} from '../utils';

describe('client utils', () => {
  describe('MutableReference', () => {
    it('should initialize with undefined reference', () => {
      const ref = new MutableReference();
      expect(ref.reference).toBeUndefined();
    });

    it('should allow setting and getting reference', () => {
      const ref = new MutableReference();
      ref.reference = 42;
      expect(ref.reference).toBe(42);
    });
  });

  describe('initializeApolloClient', () => {
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

    it('should return the cached client if already set', () => {
      // @ts-ignore
      const mutableCache = new MutableReference();
      mutableCache.reference = 123;

      const client = initializeApolloClient({
        // @ts-ignore
        mutableCachedClient: mutableCache,
        // @ts-ignore
        createClient: () => 456,
      });

      expect(client).toBe(123);
    });

    it('should create and cache a new client if not cached', () => {
      // @ts-ignore
      const mutableCache = new MutableReference();

      const client = initializeApolloClient({
        // @ts-ignore
        mutableCachedClient: mutableCache,
        // @ts-ignore
        createClient: () => 'new-client',
      });

      expect(client).toBe('new-client');
      expect(mutableCache.reference).toBe('new-client');
    });
  });

  describe('getQlLanguage', () => {
    const cases: Array<[string, LanguageCodeEnum]> = [
      ['fi', LanguageCodeEnum.Fi],
      ['sv', LanguageCodeEnum.Sv],
      ['en', LanguageCodeEnum.En],
      ['de', LanguageCodeEnum.Fi],
      ['', LanguageCodeEnum.Fi],
      [undefined as unknown as string, LanguageCodeEnum.Fi],
    ];

    it.each(cases)('should return %s as %s', (input, expected) => {
      expect(getQlLanguage(input)).toBe(expected);
    });
  });

  describe('getUnifiedSearchLanguage', () => {
    const cases: Array<[string, string | undefined]> = [
      ['fi', 'FINNISH'],
      ['sv', 'SWEDISH'],
      ['en', 'ENGLISH'],
      ['de', undefined],
      ['', undefined],
      [undefined as unknown as string, undefined],
    ];

    it.each(cases)('should return "%s" as "%s"', (input, expected) => {
      expect(getUnifiedSearchLanguage(input)).toBe(expected);
    });
  });

  describe('getMenuLocationFromLanguage', () => {
    const cases: Array<[string, string]> = [
      ['fi', 'PRIMARY'],
      ['sv', 'PRIMARY___SV'],
      ['en', 'PRIMARY___EN'],
      ['de', 'PRIMARY'],
      ['', 'PRIMARY'],
      [undefined as unknown as string, 'PRIMARY'],
    ];

    it.each(cases)('should return "%s" as "%s"', (input, expected) => {
      expect(getMenuLocationFromLanguage(input)).toBe(expected);
    });
  });
});
