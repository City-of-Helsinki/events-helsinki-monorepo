import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';
import type EventContext from '../context/EventContext.js';
import schema from '../schema/index.js';

export const createTestApolloServer = (
  override?: Partial<ConstructorParameters<typeof ApolloServer>>
): ApolloServer<EventContext> => {
  return new ApolloServer<EventContext>({
    schema,
    plugins: [ApolloServerPluginInlineTraceDisabled()],
    ...override,
  });
};
