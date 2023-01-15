import type { GraphQLResolveInfo } from 'graphql';
import { GraphQLError } from 'graphql';
import type { Context } from '../types';

type ResolverFunction<T = unknown> = (
  source: unknown,
  args: unknown,
  context: Context | unknown,
  info: GraphQLResolveInfo
) => Promise<T>;

type OnErrorFunction<E = unknown> = (error: E) => void;

const createQueryResolver =
  (resolver: ResolverFunction, onError?: OnErrorFunction) =>
  async (
    source: unknown,
    args: unknown,
    context: Context | unknown,
    info: GraphQLResolveInfo
  ) => {
    try {
      return await resolver(source, args, context, info);
    } catch (e) {
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
