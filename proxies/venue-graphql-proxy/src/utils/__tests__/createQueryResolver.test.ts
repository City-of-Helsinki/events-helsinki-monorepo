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

  describe('Successful resolver calls', () => {
    it('should return the result from a successful resolver call', async () => {
      const mockResolver = vi.fn().mockResolvedValue(mockResult);
      const resolver = createQueryResolver(mockResolver);

      const result = await resolver(
        mockSource,
        mockArgs,
        mockContext,
        mockInfo
      );

      expect(result).toStrictEqual(mockResult);
      expect(mockResolver).toHaveBeenCalledExactlyOnceWith(
        mockSource,
        mockArgs,
        mockContext,
        mockInfo
      );
    });

    it('should handle resolver with null return value', async () => {
      const mockResolver = vi.fn().mockResolvedValue(null);
      const resolver = createQueryResolver(mockResolver);

      const result = await resolver(
        mockSource,
        mockArgs,
        mockContext,
        mockInfo
      );

      expect(result).toBeNull();
      expect(mockResolver).toHaveBeenCalledOnce();
    });

    it('should handle resolver that returns undefined', async () => {
      const mockResolver = vi.fn().mockResolvedValue(undefined);
      const resolver = createQueryResolver(mockResolver);

      const result = await resolver(
        mockSource,
        mockArgs,
        mockContext,
        mockInfo
      );

      expect(result).toBeUndefined();
    });

    it('should handle resolver that returns complex object', async () => {
      const complexResult = {
        id: '123',
        name: 'Test',
        nested: {
          field: 'value',
          array: [1, 2, 3],
        },
      };
      const mockResolver = vi.fn().mockResolvedValue(complexResult);
      const resolver = createQueryResolver(mockResolver);

      const result = await resolver(
        mockSource,
        mockArgs,
        mockContext,
        mockInfo
      );

      expect(result).toStrictEqual(complexResult);
    });

    it('should handle resolver that returns array', async () => {
      const arrayResult = [
        { id: '1', name: 'Venue 1' },
        { id: '2', name: 'Venue 2' },
      ];
      const mockResolver = vi.fn().mockResolvedValue(arrayResult);
      const resolver = createQueryResolver(mockResolver);

      const result = await resolver(
        mockSource,
        mockArgs,
        mockContext,
        mockInfo
      );

      expect(result).toStrictEqual(arrayResult);
    });

    it('should pass arguments correctly to the resolver', async () => {
      const mockResolver = vi.fn().mockResolvedValue(mockResult);
      const resolver = createQueryResolver(mockResolver);
      const customArgs = { filter: 'test', limit: 10 };

      await resolver(mockSource, customArgs, mockContext, mockInfo);

      expect(mockResolver).toHaveBeenCalledWith(
        mockSource,
        customArgs,
        mockContext,
        mockInfo
      );
    });
  });

  describe('GraphQLError handling', () => {
    it('should rethrow GraphQLError as-is in development mode', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const graphqlError = new GraphQLError('GraphQL error message');
      const mockResolver = vi.fn().mockRejectedValue(graphqlError);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBe(graphqlError);
        expect((error as any).message).toBe('GraphQL error message');
      }
    });

    it('should rethrow GraphQLError as-is in production mode', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      const graphqlError = new GraphQLError('Original GraphQL error');
      const mockResolver = vi.fn().mockRejectedValue(graphqlError);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBe(graphqlError);
        expect((error as any).message).toBe('Original GraphQL error');
      }
    });

    it('should rethrow GraphQLError with extensions', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const graphqlError = new GraphQLError('Error with extensions', {
        extensions: { code: 'CUSTOM_ERROR_CODE' },
      });
      const mockResolver = vi.fn().mockRejectedValue(graphqlError);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBe(graphqlError);
        expect((error as any).extensions).toStrictEqual({
          code: 'CUSTOM_ERROR_CODE',
        });
      }
    });
  });

  describe('Non-GraphQLError handling - Development mode', () => {
    it('should rethrow standard Error in development mode', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const error = new Error('Database connection failed');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      await expect(
        resolver(mockSource, mockArgs, mockContext, mockInfo)
      ).rejects.toThrow('Database connection failed');
    });

    it('should rethrow TypeError in development mode', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const error = new TypeError('Cannot read property of undefined');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      await expect(
        resolver(mockSource, mockArgs, mockContext, mockInfo)
      ).rejects.toThrow(TypeError);
    });

    it('should rethrow custom error in development mode', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      class CustomError extends Error {
        constructor(message: string) {
          super(message);
          this.name = 'CustomError';
        }
      }
      const error = new CustomError('Custom error message');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        expect(thrown).toStrictEqual(error);
        expect((thrown as any).name).toBe('CustomError');
      }
    });

    it('should rethrow RangeError in development mode', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const error = new RangeError('Invalid array length');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      await expect(
        resolver(mockSource, mockArgs, mockContext, mockInfo)
      ).rejects.toThrow(RangeError);
    });
  });

  describe('Non-GraphQLError handling - Production mode', () => {
    it('should throw "Internal server error" GraphQLError for Error in production', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      const error = new Error('Database connection failed');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        expect(thrown).toBeInstanceOf(GraphQLError);
        expect((thrown as any).message).toBe('Internal server error');
      }
    });

    it('should throw "Internal server error" GraphQLError for TypeError in production', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      const error = new TypeError('Cannot read property of undefined');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        expect(thrown).toBeInstanceOf(GraphQLError);
        expect((thrown as any).message).toBe('Internal server error');
      }
    });

    it('should throw "Internal server error" GraphQLError for custom error in production', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      class CustomError extends Error {
        constructor(message: string) {
          super(message);
          this.name = 'CustomError';
        }
      }
      const error = new CustomError('Sensitive information exposed');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        expect(thrown).toBeInstanceOf(GraphQLError);
        expect((thrown as any).message).toBe('Internal server error');
        // Verify original error message is not exposed
        expect((thrown as any).message).not.toContain(
          'Sensitive information exposed'
        );
      }
    });

    it('should throw "Internal server error" GraphQLError for RangeError in production', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      const error = new RangeError('Invalid array length');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        expect(thrown).toBeInstanceOf(GraphQLError);
        expect((thrown as any).message).toBe('Internal server error');
      }
    });

    it('should not expose error stack trace in production', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      const error = new Error('Stack trace should be hidden');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        expect((thrown as any).message).toBe('Internal server error');
        expect((thrown as any).message).not.toContain(
          'Stack trace should be hidden'
        );
      }
    });
  });

  describe('onError callback - Called on error', () => {
    it('should call onError callback when GraphQLError is thrown', async () => {
      const onError = vi.fn();
      const graphqlError = new GraphQLError('Test error');
      const mockResolver = vi.fn().mockRejectedValue(graphqlError);
      const resolver = createQueryResolver(mockResolver, onError);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
      } catch (_e) {
        // Expected to throw
      }

      expect(onError).toHaveBeenCalledExactlyOnceWith(graphqlError);
    });

    it('should call onError callback with correct error object', async () => {
      const onError = vi.fn();
      const error = new Error('Test error');
      const mockResolver = vi.fn().mockRejectedValue(error);
      vi.stubEnv('NODE_ENV', 'development');
      const resolver = createQueryResolver(mockResolver, onError);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
      } catch (_e) {
        // Expected to throw
      }

      expect(onError).toHaveBeenCalledExactlyOnceWith(error);
    });

    it('should call onError callback in development mode for non-GraphQLError', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const onError = vi.fn();
      const error = new TypeError('Type error');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver, onError);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
      } catch (_e) {
        // Expected to throw
      }

      expect(onError).toHaveBeenCalledWith(error);
    });

    it('should call onError callback in production mode for non-GraphQLError', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      const onError = vi.fn();
      const error = new Error('Database error');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver, onError);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
      } catch (_e) {
        // Expected to throw
      }

      expect(onError).toHaveBeenCalledExactlyOnceWith(error);
    });

    it('should call onError before throwing error', async () => {
      const callOrder: string[] = [];
      const onError = vi.fn(() => callOrder.push('onError'));
      const error = new Error('Test');
      const mockResolver = vi.fn().mockRejectedValue(error);
      vi.stubEnv('NODE_ENV', 'development');
      const resolver = createQueryResolver(mockResolver, onError);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
      } catch (_e) {
        callOrder.push('throw');
      }

      expect(callOrder).toStrictEqual(['onError', 'throw']);
    });
  });

  describe('onError callback - Not called on success', () => {
    it('should not call onError callback when resolver succeeds', async () => {
      const onError = vi.fn();
      const mockResolver = vi.fn().mockResolvedValue(mockResult);
      const resolver = createQueryResolver(mockResolver, onError);

      await resolver(mockSource, mockArgs, mockContext, mockInfo);

      expect(onError).not.toHaveBeenCalled();
    });

    it('should not call onError callback when resolver returns null', async () => {
      const onError = vi.fn();
      const mockResolver = vi.fn().mockResolvedValue(null);
      const resolver = createQueryResolver(mockResolver, onError);

      await resolver(mockSource, mockArgs, mockContext, mockInfo);

      expect(onError).not.toHaveBeenCalled();
    });

    it('should not call onError callback when resolver returns undefined', async () => {
      const onError = vi.fn();
      const mockResolver = vi.fn().mockResolvedValue(undefined);
      const resolver = createQueryResolver(mockResolver, onError);

      await resolver(mockSource, mockArgs, mockContext, mockInfo);

      expect(onError).not.toHaveBeenCalled();
    });
  });

  describe('onError callback - Optional parameter', () => {
    it('should work without onError callback', async () => {
      const mockResolver = vi.fn().mockResolvedValue(mockResult);
      const resolver = createQueryResolver(mockResolver);

      const result = await resolver(
        mockSource,
        mockArgs,
        mockContext,
        mockInfo
      );

      expect(result).toStrictEqual(mockResult);
    });

    it('should handle error without onError callback in development', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const error = new Error('Test error');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      await expect(
        resolver(mockSource, mockArgs, mockContext, mockInfo)
      ).rejects.toThrow('Test error');
    });

    it('should handle error without onError callback in production', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      const error = new Error('Test error');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        expect(thrown).toBeInstanceOf(GraphQLError);
        expect((thrown as any).message).toBe('Internal server error');
      }
    });
  });

  describe('Multiple error scenarios with different NODE_ENV values', () => {
    it('should rethrow Error in development but hide in production', async () => {
      const error = new Error('Sensitive database error');
      const mockResolver = vi.fn().mockRejectedValue(error);

      // Test in development
      vi.stubEnv('NODE_ENV', 'development');
      const devResolver = createQueryResolver(mockResolver);
      try {
        await devResolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown in dev');
      } catch (devError) {
        expect((devError as any).message).toBe('Sensitive database error');
      }

      // Test in production
      vi.unstubAllEnvs();
      vi.stubEnv('NODE_ENV', 'production');
      const prodResolver = createQueryResolver(mockResolver);
      try {
        await prodResolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown in prod');
      } catch (prodError) {
        expect(prodError).toBeInstanceOf(GraphQLError);
        expect((prodError as any).message).toBe('Internal server error');
      }
    });

    it('should always rethrow GraphQLError in both dev and prod', async () => {
      const graphqlError = new GraphQLError('GraphQL specific error');

      // Test in development
      vi.stubEnv('NODE_ENV', 'development');
      const devResolver = vi.fn().mockRejectedValue(graphqlError);
      const wrappedDevResolver = createQueryResolver(devResolver);
      try {
        await wrappedDevResolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown in dev');
      } catch (devError) {
        expect(devError).toBe(graphqlError);
        expect((devError as any).message).toBe('GraphQL specific error');
      }

      // Test in production
      vi.unstubAllEnvs();
      vi.stubEnv('NODE_ENV', 'production');
      const prodResolver = vi.fn().mockRejectedValue(graphqlError);
      const wrappedProdResolver = createQueryResolver(prodResolver);
      try {
        await wrappedProdResolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown in prod');
      } catch (prodError) {
        expect(prodError).toBe(graphqlError);
        expect((prodError as any).message).toBe('GraphQL specific error');
      }
    });

    it('should handle TypeError consistently across environments', async () => {
      const typeError = new TypeError('Cannot read property x of undefined');

      // Test in development - should rethrow
      vi.stubEnv('NODE_ENV', 'development');
      const devResolver = vi.fn().mockRejectedValue(typeError);
      const wrappedDevResolver = createQueryResolver(devResolver);
      try {
        await wrappedDevResolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown in dev');
      } catch (devError) {
        expect(devError).toBeInstanceOf(TypeError);
      }

      // Test in production - should hide
      vi.unstubAllEnvs();
      vi.stubEnv('NODE_ENV', 'production');
      const prodResolver = vi.fn().mockRejectedValue(typeError);
      const wrappedProdResolver = createQueryResolver(prodResolver);
      try {
        await wrappedProdResolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown in prod');
      } catch (prodError) {
        expect(prodError).toBeInstanceOf(GraphQLError);
        expect((prodError as any).message).toBe('Internal server error');
      }
    });
  });

  describe('Async operation handling', () => {
    it('should return a Promise', async () => {
      const mockResolver = vi.fn().mockResolvedValue(mockResult);
      const resolver = createQueryResolver(mockResolver);

      const result = resolver(mockSource, mockArgs, mockContext, mockInfo);

      expect(result).toBeInstanceOf(Promise);
      await result;
    });

    it('should handle async resolver that takes time', async () => {
      const mockResolver = vi.fn(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return mockResult;
      });
      const resolver = createQueryResolver(mockResolver);

      const result = await resolver(
        mockSource,
        mockArgs,
        mockContext,
        mockInfo
      );

      expect(result).toStrictEqual(mockResult);
    });

    it('should handle rejected promise', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const error = new Error('Promise rejected');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      await expect(
        resolver(mockSource, mockArgs, mockContext, mockInfo)
      ).rejects.toThrow('Promise rejected');
    });

    it('should handle resolver that throws synchronously', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const error = new Error('Sync error');
      const mockResolver = vi.fn(() => {
        throw error;
      });
      const resolver = createQueryResolver(mockResolver);

      await expect(
        resolver(mockSource, mockArgs, mockContext, mockInfo)
      ).rejects.toThrow('Sync error');
    });
  });

  describe('Different error types', () => {
    it('should handle SyntaxError', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const error = new SyntaxError('Unexpected token');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      await expect(
        resolver(mockSource, mockArgs, mockContext, mockInfo)
      ).rejects.toThrow(SyntaxError);
    });

    it('should hide SyntaxError in production', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      const error = new SyntaxError('Unexpected token');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        expect(thrown).toBeInstanceOf(GraphQLError);
        expect((thrown as any).message).toBe('Internal server error');
      }
    });

    it('should handle ReferenceError', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const error = new ReferenceError('variable is not defined');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      await expect(
        resolver(mockSource, mockArgs, mockContext, mockInfo)
      ).rejects.toThrow(ReferenceError);
    });

    it('should handle non-Error objects thrown', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const mockResolver = vi.fn().mockRejectedValue('String error');
      const resolver = createQueryResolver(mockResolver);

      await expect(
        resolver(mockSource, mockArgs, mockContext, mockInfo)
      ).rejects.toBe('String error');
    });

    it('should handle non-Error objects thrown in production', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      const mockResolver = vi.fn().mockRejectedValue('String error');
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        expect(thrown).toBeInstanceOf(GraphQLError);
        expect((thrown as any).message).toBe('Internal server error');
      }
    });

    it('should handle object errors', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const errorObj = { message: 'Object error', code: 'ERR_001' };
      const mockResolver = vi.fn().mockRejectedValue(errorObj);
      const resolver = createQueryResolver(mockResolver);

      await expect(
        resolver(mockSource, mockArgs, mockContext, mockInfo)
      ).rejects.toStrictEqual(errorObj);
    });

    it('should hide object errors in production', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      const errorObj = { message: 'Sensitive object', code: 'ERR_001' };
      const mockResolver = vi.fn().mockRejectedValue(errorObj);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        expect(thrown).toBeInstanceOf(GraphQLError);
        expect((thrown as any).message).toBe('Internal server error');
      }
    });
  });

  describe('Integration - Real-world scenarios', () => {
    it('should handle resolver with onError logging and recovery attempt', async () => {
      vi.stubEnv('NODE_ENV', 'development');
      const logs: string[] = [];
      const onError = vi.fn((error) => {
        logs.push(`Error logged: ${(error as Error).message}`);
      });
      const error = new Error('Database connection failed');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver, onError);

      await expect(
        resolver(mockSource, mockArgs, mockContext, mockInfo)
      ).rejects.toThrow();

      expect(onError).toHaveBeenCalledOnce();
      expect(logs).toContain('Error logged: Database connection failed');
    });

    it('should handle resolver that has side effects before throwing', async () => {
      const sideEffects: string[] = [];
      const mockResolver = vi.fn(async () => {
        sideEffects.push('operation started');
        throw new Error('Failed mid-operation');
      });
      vi.stubEnv('NODE_ENV', 'development');
      const resolver = createQueryResolver(mockResolver);

      await expect(
        resolver(mockSource, mockArgs, mockContext, mockInfo)
      ).rejects.toThrow();

      expect(sideEffects).toContain('operation started');
    });

    it('should handle resolver called multiple times independently', async () => {
      const mockResolver = vi.fn(async (_, args) => {
        if ((args as any).shouldFail) {
          throw new Error('Intentional error');
        }
        return { id: (args as any).id };
      });
      const resolver = createQueryResolver(mockResolver);
      vi.stubEnv('NODE_ENV', 'development');

      // First call succeeds
      const result1 = await resolver(
        mockSource,
        { id: '1' },
        mockContext,
        mockInfo
      );
      expect(result1).toStrictEqual({ id: '1' });

      // Second call fails
      await expect(
        resolver(
          mockSource,
          { id: '2', shouldFail: true },
          mockContext,
          mockInfo
        )
      ).rejects.toThrow();

      // Third call succeeds again
      const result3 = await resolver(
        mockSource,
        { id: '3' },
        mockContext,
        mockInfo
      );
      expect(result3).toStrictEqual({ id: '3' });

      expect(mockResolver).toHaveBeenCalledTimes(3);
    });
  });

  describe('Environment variable edge cases', () => {
    it('should treat missing NODE_ENV as production', async () => {
      vi.stubEnv('NODE_ENV', '');
      const error = new Error('Test error');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        expect(thrown).toBeInstanceOf(GraphQLError);
        expect((thrown as any).message).toBe('Internal server error');
      }
    });

    it('should handle NODE_ENV value case-sensitively', async () => {
      vi.stubEnv('NODE_ENV', 'Development');
      const error = new Error('Test error');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        // 'Development' !== 'development', so it should be treated as production
        expect(thrown).toBeInstanceOf(GraphQLError);
        expect((thrown as any).message).toBe('Internal server error');
      }
    });

    it('should handle NODE_ENV with test value', async () => {
      vi.stubEnv('NODE_ENV', 'test');
      const error = new Error('Test error');
      const mockResolver = vi.fn().mockRejectedValue(error);
      const resolver = createQueryResolver(mockResolver);

      try {
        await resolver(mockSource, mockArgs, mockContext, mockInfo);
        expect.fail('Should have thrown');
      } catch (thrown) {
        // 'test' !== 'development', so it should be treated as production
        expect(thrown).toBeInstanceOf(GraphQLError);
        expect((thrown as any).message).toBe('Internal server error');
      }
    });
  });
});
