import { ApolloServer, type ApolloServerOptions } from '@apollo/server';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';
import type VenueContext from '../context/VenueContext.js';
import schema from '../schema/index.js';

type TestServerOverrides = Partial<
  Omit<ApolloServerOptions<VenueContext>, 'schema' | 'gateway' | 'typeDefs'>
>;

export const createTestApolloServer = (
  override?: TestServerOverrides
): ApolloServer<VenueContext> => {
  return new ApolloServer<VenueContext>({
    schema,
    plugins: [ApolloServerPluginInlineTraceDisabled()],
    ...override,
  } as ApolloServerOptions<VenueContext>);
};

// Compile-time validation: ensure options like introspection: false are accepted
const _validateServerOptions: TestServerOverrides = {
  introspection: false,
};
