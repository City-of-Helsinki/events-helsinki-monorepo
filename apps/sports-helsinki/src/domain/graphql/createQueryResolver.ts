import { captureException } from '@sentry/nextjs';
import type { GraphQLResolveInfo } from 'graphql';
import { GraphQLError } from 'graphql';
import type { Context } from '../../domain/nextApi/types';

type ResolverFunction<T = unknown> = (
  source: unknown,
  args: unknown,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<T>;

type OnErrorFunction<E = unknown> = (error: E) => void;

const createQueryResolver =
  (resolver: ResolverFunction, onError?: OnErrorFunction) =>
  async (
    source: unknown,
    args: unknown,
    context: Context,
    info: GraphQLResolveInfo
  ) => {
    try {
      return await resolver(source, args, context, info);
    } catch (e) {
      // Sentry logging
      captureException(e);

      if (onError) {
        onError(e);
      }
      if (e instanceof GraphQLError) {
        throw e;
      }

      if (process.env.NODE_ENV === 'development') {
        throw e;
      } else {
        // Hide any unexpected errors in order to avoid accidentally leaking too
        // much information when in production.
        throw new GraphQLError('Internal server error');
      }
    }
  };

export default createQueryResolver;
