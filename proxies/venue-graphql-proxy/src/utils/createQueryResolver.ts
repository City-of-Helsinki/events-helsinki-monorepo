import type { GraphQLResolveInfo } from 'graphql';
import { GraphQLError } from 'graphql';
import type VenueContext from '../context/VenueContext';
import type { Source } from '../types';

type ResolverFunction<T = unknown> = (
  source: Source,
  args: unknown,
  context: VenueContext,
  info: GraphQLResolveInfo
) => Promise<T | null>;

type OnErrorFunction<E = unknown> = (error: E) => void;

const createQueryResolver =
  <T>(resolver: ResolverFunction<T>, onError?: OnErrorFunction) =>
  async (
    source: Source,
    args: unknown,
    context: VenueContext,
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
