import gql from 'graphql-tag';

const typeDefs = gql`
  input EventQuery {
    ids: [ID!]
    start: String
    location: ID
    sort: String
    superEventType: String
    language: String
    text: String
    translation: String
    keywords: [String!]
  }

  extend type Query {
    events(where: EventQuery, first: Int, after: String): EventsConnection!
  }

  type EventsConnection {
    edges: [EventEdge!]!
    pageInfo: PageInfo
    totalCount: Int
  }

  type EventEdge {
    node: Event!
    cursor: String!
  }

  type Image {
    id: String!
    url: String!
    alt: String
  }

  type Offer {
    isFree: Boolean!
    description: String
    infoUrl: String
    price: String
  }

  type Event {
    id: String!
    name: String!
    shortDescription: String
    offers: [Offer!]!
    startTime: String!
    endTime: String
    images: [Image!]!
    infoUrl: String
  }
`;

export default typeDefs;
