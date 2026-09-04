import { GraphQLError } from 'graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type VenueContext from '../../context/VenueContext.js';
import type { Source } from '../../types.js';
import createQueryResolver from '../createQueryResolver.js';

// Mock data
const mockSource: Source = null;
const mockArgs = { id: '123' };
const mockContext = {} as VenueContext;
const mockInfo = {} as GraphQLResolveInfo;
const mockResult = { id: '123', name: 'Test Venue' };

describe('createQueryResolver', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should return the resolver result and pass source/args/context/info through unchanged', async () => {
    const mockResolver = vi.fn().mockResolvedValue(mockResult);
    const resolver = createQueryResolver(mockResolver);

    const result = await resolver(mockSource, mockArgs, mockContext, mockInfo);

    expect(result).toStrictEqual(mockResult);
    expect(mockResolver).toHaveBeenCalledExactlyOnceWith(
      mockSource,
      mockArgs,
      mockContext,
      mockInfo
    );
  });

  it('should not call onError when the resolver succeeds', async () => {
    const onError = vi.fn();
    const mockResolver = vi.fn().mockResolvedValue(mockResult);
    const resolver = createQueryResolver(mockResolver, onError);

    await resolver(mockSource, mockArgs, mockContext, mockInfo);

    expect(onError).not.toHaveBeenCalled();
  });

  it('should rethrow a GraphQLError as-is, unaffected by NODE_ENV', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    const graphqlError = new GraphQLError('GraphQL error message', {
      extensions: { code: 'CUSTOM_ERROR_CODE' },
    });
    const mockResolver = vi.fn().mockRejectedValue(graphqlError);
    const resolver = createQueryResolver(mockResolver);

    await expect(
      resolver(mockSource, mockArgs, mockContext, mockInfo)
    ).rejects.toBe(graphqlError);
  });

  it('should rethrow a non-GraphQLError as-is in development mode', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    const error = new Error('Database connection failed');
    const mockResolver = vi.fn().mockRejectedValue(error);
    const resolver = createQueryResolver(mockResolver);

    await expect(
      resolver(mockSource, mockArgs, mockContext, mockInfo)
    ).rejects.toBe(error);
  });

  it('should hide a non-GraphQLError behind a generic message in production mode', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    const error = new Error('Sensitive database error');
    const mockResolver = vi.fn().mockRejectedValue(error);
    const resolver = createQueryResolver(mockResolver);

    try {
      await resolver(mockSource, mockArgs, mockContext, mockInfo);
      expect.fail('Should have thrown');
    } catch (thrown) {
      expect(thrown).toBeInstanceOf(GraphQLError);
      expect((thrown as GraphQLError).message).toBe('Internal server error');
      expect((thrown as GraphQLError).message).not.toContain(
        'Sensitive database error'
      );
    }
  });

  it('should call onError with the original error before throwing', async () => {
    const callOrder: string[] = [];
    const onError = vi.fn(() => callOrder.push('onError'));
    const error = new Error('Test error');
    const mockResolver = vi.fn().mockRejectedValue(error);
    vi.stubEnv('NODE_ENV', 'development');
    const resolver = createQueryResolver(mockResolver, onError);

    try {
      await resolver(mockSource, mockArgs, mockContext, mockInfo);
    } catch {
      callOrder.push('throw');
    }

    expect(onError).toHaveBeenCalledExactlyOnceWith(error);
    expect(callOrder).toStrictEqual(['onError', 'throw']);
  });

  it('should work without an onError callback, in both success and error paths', async () => {
    const successResolver = createQueryResolver(
      vi.fn().mockResolvedValue(mockResult)
    );
    await expect(
      successResolver(mockSource, mockArgs, mockContext, mockInfo)
    ).resolves.toStrictEqual(mockResult);

    vi.stubEnv('NODE_ENV', 'development');
    const error = new Error('Test error');
    const errorResolver = createQueryResolver(vi.fn().mockRejectedValue(error));
    await expect(
      errorResolver(mockSource, mockArgs, mockContext, mockInfo)
    ).rejects.toBe(error);
  });

  it('should treat any NODE_ENV value other than exactly "development" as production', async () => {
    for (const nodeEnv of ['', 'Development', 'test']) {
      vi.stubEnv('NODE_ENV', nodeEnv);
      const error = new Error('Test error');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        expect(thrown).toBeInstanceOf(GraphQLError);
        expect((thrown as GraphQLError).message).toBe('Internal server error');
      }
      vi.unstubAllEnvs();
    }
  });
});
