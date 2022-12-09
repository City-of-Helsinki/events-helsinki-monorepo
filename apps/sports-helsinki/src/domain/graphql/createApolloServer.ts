import type { DocumentNode } from '@apollo/client';

// import { gql } from '@apollo/client';
import type { ApolloServerOptions } from '@apollo/server';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
// import Event from './event/eventResolver';
// import eventSchema from './event/eventSchema';
// import eventsQueryResolver from './event/eventsQueryResolver';
// import paginationSchema from './paginationSchema';
// import LinkedPaginatedConnectionResolver from './services/linked/LinkedPaginatedConnectionResolver';
import venueQueryResolver from './venue/venueQueryResolver';
import Venue from './venue/venueResolver';
import venuesByIdsResolver from './venue/venuesByIdsResolver';
import createVenueSchema from './venue/venueSchema';

const isProd = process.env.NODE_ENV === 'production';

// Note: In the current version of GraphQL, you can’t have an empty type even if
// you intend to extend it later. So we need to make sure the Query type has at
// least one field — in this case we can add a fake _empty field. Hopefully in
// future versions it will be possible to have an empty type to be extended
// later.
// https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/
// const initQueryTypeDefs = gql`
//   type Query {
//     _empty: String
//   }
// `;

const typeDefs = (liikuntaServerConfig?: LiikuntaServerConfig) => [
  // initQueryTypeDefs,
  // paginationSchema,
  createVenueSchema(liikuntaServerConfig),
  // eventSchema,
];

const resolvers = {
  Query: {
    venue: venueQueryResolver,
    venuesByIds: venuesByIdsResolver,
    // events: eventsQueryResolver,
  },
  Venue,
  // EventsConnection: LinkedPaginatedConnectionResolver,
  // Event,
};

export type LiikuntaServerConfig = {
  haukiEnabled?: boolean;
};

type ServerConfig = Omit<
  ApolloServerOptions<LiikuntaServerConfig>,
  'typeDefs'
> &
  LiikuntaServerConfig & {
    typeDefs?: (
      liikuntaServerConfig?: LiikuntaServerConfig
    ) => DocumentNode | DocumentNode[];
  };

export default function createApolloServer(apolloServerConfig?: ServerConfig) {
  const liikuntaServerConfig = {
    haukiEnabled: apolloServerConfig?.haukiEnabled,
  };

  return new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs: (apolloServerConfig?.typeDefs ?? typeDefs)(
        liikuntaServerConfig
      ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolvers: apolloServerConfig?.resolvers ?? (resolvers as any),
    }),

    // Turn off introspection in production because this endpoint is meant
    // for the liikunta site application only
    introspection: !isProd,
  });
}
