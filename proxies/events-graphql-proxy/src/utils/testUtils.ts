import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';
import type EventContext from '../context/EventContext';
import schema from '../schema';

export const createTestApolloServer = (
  override?: Partial<ConstructorParameters<typeof ApolloServer>>
): ApolloServer<EventContext> => {
  return new ApolloServer<EventContext>({
    schema,
    plugins: [ApolloServerPluginInlineTraceDisabled()],
    ...override,
  });
};
