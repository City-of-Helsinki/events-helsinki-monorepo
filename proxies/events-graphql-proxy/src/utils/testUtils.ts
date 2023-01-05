import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';
import type ContextValue from '../context/context-value';
import schema from '../schema';

export const createTestApolloServer = (
  override?: Partial<ConstructorParameters<typeof ApolloServer>>
): ApolloServer<ContextValue> => {
  return new ApolloServer<ContextValue>({
    schema,
    plugins: [ApolloServerPluginInlineTraceDisabled()],
    ...override,
  });
};
