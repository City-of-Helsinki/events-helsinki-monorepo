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
});
