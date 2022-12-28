import { ApolloServer } from 'apollo-server';
import type { ApolloServerExpressConfig } from 'apollo-server-express';
import type { ApolloServerTestClient } from 'apollo-server-testing';
import { createTestClient } from 'apollo-server-testing';

import schema from '../schema';

export const getApolloTestServer = (
  config?: Partial<ApolloServerExpressConfig>
): ApolloServerTestClient => {
  return createTestClient(
    // FIXME: the current createTestClient is not supporting the latest ApolloServer
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new ApolloServer({
      schema,
      context: () => ({ token: '123' }),
      ...config,
    })
  );
};
