import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';
import type VenueContext from '../context/VenueContext.js';
import schema from '../schema/index.js';

export const createTestApolloServer = (
  override?: Partial<ConstructorParameters<typeof ApolloServer>>
): ApolloServer<VenueContext> => {
  return new ApolloServer<VenueContext>({
    schema,
    plugins: [ApolloServerPluginInlineTraceDisabled()],
    ...override,
  });
};
