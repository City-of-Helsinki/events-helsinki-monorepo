import gql from 'graphql-tag';

function addHaukiDependentField(content: string, isHaukiEnabled: boolean) {
  return `${
    !isHaukiEnabled
      ? `""" This field is currently disabled because the Hauki integration is not enabled """`
      : ''
  }
  ${content} ${
    !isHaukiEnabled
      ? `@deprecated(reason: "Hauki integration is currently disabled so this field can not be accessed")`
      : ''
  }`;
}

const createVenueSchema = (isHaukiEnabled = true) => gql`
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

  type VenueConnection {
    sectionType: String
    name: String
    phone: String
    url: String
  }

  type VenueDepartment {
    abbreviation: String
    addressCity: String
    addressPostalFull: String
    addressZip: String
    businessId: String
    email: String
    hierarchyLevel: Int
    id: ID!
    municipalityCode: Int
    name: String
    oid: ID
    organizationId: ID
    organizationType: String
    parentId: ID
    phone: String
    streetAddress: String
    www: String
  }

  type Venue {
    addressLocality: String
    addressPostalFull: String
    dataSource: String
    departmentId: ID
    department: VenueDepartment
    description: String
    displayedServiceOwner: String
    displayedServiceOwnerType: String
    email: String
    id: String!
    image: String
    infoUrl: String
    name: String
    organizationId: ID
    organization: VenueDepartment
    position: Point
    postalCode: String
    providerType: String
    shortDescription: String
    streetAddress: String
    telephone: String
    ${addHaukiDependentField('openingHours: [OpeningHour!]', isHaukiEnabled)}
    ${addHaukiDependentField('isOpen: Boolean', isHaukiEnabled)}
    ontologyTree: [Ontology]!
    ontologyWords: [Ontology]!
    accessibilitySentences: [AccessibilitySentences]!
    connections: [VenueConnection]!
  }
`;

export default createVenueSchema;
