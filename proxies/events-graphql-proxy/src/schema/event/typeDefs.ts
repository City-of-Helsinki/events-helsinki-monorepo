import { gql } from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    eventDetails(id: ID, include: [String]): EventDetails!
    eventsByIds(
      eventType: [EventTypeId] = [General]
      ids: [ID!]!
      include: [String]
      sort: String
      pageSize: Int
      page: Int
      start: String
      end: String
    ): EventListResponse!
    eventList(
      eventType: [EventTypeId] = [General]
      internetBased: Boolean
      localOngoingAnd: [String]
      localOngoingOr: [String]
      localOngoingOrSet1: [String]
      localOngoingOrSet2: [String]
      localOngoingOrSet3: [String]
      internetOngoingAnd: [String]
      internetOngoingOr: [String]
      allOngoing: Boolean
      allOngoingAnd: [String]
      allOngoingOr: [String]
      combinedText: [String]
      division: [String]
      end: String
      endsAfter: String
      endsBefore: String
      ids: [String]
      inLanguage: String
      include: [String]
      isFree: Boolean
      keywordAnd: [String]
      keywordOrSet1: [String]
      keywordOrSet2: [String]
      keywordOrSet3: [String]
      keywordNot: [String]
      keyword: [String]
      language: String
      location: [String]
      page: Int
      pageSize: Int
      publisher: ID
      publisherAncestor: ID
      sort: String
      start: String
      startsAfter: String
      startsBefore: String
      superEvent: ID
      superEventType: [String]
      text: String
      translation: String
      suitableFor: [Int]
      audienceMinAgeGt: String
      audienceMinAgeLt: String
      audienceMaxAgeGt: String
      audienceMaxAgeLt: String
      # Experimental fields (prefixed with "x_")
      xFullText: String
      xOngoing: Boolean
    ): EventListResponse!
  }

  type EventListResponse {
    meta: Meta!
    data: [EventDetails!]!
  }

  type EventDetails {
    id: ID!
    typeId: EventTypeId
    location: Place
    keywords: [Keyword!]!
    superEvent: InternalIdObject
    eventStatus: String
    externalLinks: [ExternalLink!]!
    offers: [Offer!]!
    dataSource: String
    publisher: ID
    subEvents: [InternalIdObject!]!
    images: [EventImage!]!
    inLanguage: [InLanguage!]!
    audience: [Audience!]!
    createdTime: String
    lastModifiedTime: String
    datePublished: String
    startTime: String
    endTime: String
    customData: String
    audienceMinAge: String
    audienceMaxAge: String
    superEventType: String
    name: LocalizedObject!
    locationExtraInfo: LocalizedObject
    shortDescription: LocalizedObject
    provider: LocalizedObject
    infoUrl: LocalizedObject
    providerContactInfo: LocalizedObject
    description: LocalizedObject
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }

  # Course fields
  extend type EventDetails {
    enrolmentStartTime: String
    enrolmentEndTime: String
    maximumAttendeeCapacity: Int
    minimumAttendeeCapacity: Int
    remainingAttendeeCapacity: Int
  }

  type Audience {
    id: ID
    name: LocalizedObject
    internalId: String
    internalContext: String
    internalType: String
  }

  type ExternalLink {
    name: String
    link: String
    language: String
  }

  type InLanguage {
    id: ID
    translationAvailable: Boolean
    name: LocalizedObject
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }

  type Offer {
    isFree: Boolean
    description: LocalizedObject
    price: LocalizedObject
    infoUrl: LocalizedObject
  }

  type EventImage {
    id: ID
    license: String
    createdTime: String
    lastModifiedTime: String
    name: String!
    url: String!
    cropping: String
    photographerName: String
    dataSource: String
    publisher: String
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String!
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }
`;

export default typeDefs;
