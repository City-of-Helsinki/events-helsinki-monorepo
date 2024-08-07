import gql from 'graphql-tag';

const typeDefs = gql`
  type VenueProxyPageInfo {
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
    startCursor: String
    endCursor: String
    count: Int!
  }
`;

export default typeDefs;
