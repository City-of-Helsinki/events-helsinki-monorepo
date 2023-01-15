import gql from 'graphql-tag';

const typeDefs = gql`
  type PageInfo {
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
    startCursor: String
    endCursor: String
    count: Int!
  }
`;

export default typeDefs;
