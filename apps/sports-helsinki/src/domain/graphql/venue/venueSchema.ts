import gql from 'graphql-tag';
import type { LiikuntaServerConfig } from '../createApolloServer';

function addHaukiDependentField(content: string, haukiEnabled: boolean) {
  return `${
    !haukiEnabled
      ? `""" This field is currently disabled because the Hauki integration is not enabled """`
      : ''
  }
  ${content} ${
    !haukiEnabled
      ? `@deprecated(reason: "Hauki integration is currently disabled so this field can not be accessed")`
      : ''
  }`;
}

const createVenueSchema = ({
  haukiEnabled = true,
}: LiikuntaServerConfig = {}) => gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  extend type Query {
    venue(id: ID!): Venue!
    venuesByIds(ids: [ID!]): [Venue!]!
  }

  type Point {
    type: String
    coordinates: [Float!]!
  }

  enum ResourceState {
    open
    closed
    undefined
    self_service
    with_key
    with_reservation
    open_and_reservable
    with_key_and_reservation
    enter_only
    exit_only
    weather_permitting
  }

  type Time {
    name: String!
    description: String!
    startTime: String!
    endTime: String!
    endTimeOnNextDay: Boolean!
    resourceState: ResourceState!
    fullDay: Boolean!
    periods: [Int!]!
  }

  type OpeningHour {
    date: String!
    times: [Time!]!
  }

  type Ontology {
    id: Int
    label: String
  }

  type AccessibilitySentences {
    groupName: String
    sentences: [String]
  }

  type Connection {
    sectionType: String
    name: String
    phone: String
    url: String
  }

  type Venue {
    addressLocality: String
    dataSource: String
    description: String
    email: String
    id: String!
    image: String
    infoUrl: String
    name: String
    position: Point
    postalCode: String
    streetAddress: String
    telephone: String
    ${addHaukiDependentField('openingHours: [OpeningHour!]', haukiEnabled)}
    ${addHaukiDependentField('isOpen: Boolean', haukiEnabled)}
    ontologyTree: [Ontology]!
    ontologyWords: [Ontology]!
    accessibilitySentences: [AccessibilitySentences]!
    connections: [Connection]!
  }
`;

export default createVenueSchema;
