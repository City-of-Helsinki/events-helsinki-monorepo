import { gql } from 'graphql-tag';

export const QUERY_EVENT_DETAILS = gql`
  fragment localizedFields on LocalizedObject {
    en
    fi
    sv
  }

  fragment offerFields on Offer {
    isFree
    price {
      ...localizedFields
    }
    description {
      ...localizedFields
    }
    infoUrl {
      ...localizedFields
    }
  }

  fragment eventFields on EventDetails {
    audienceMinAge
    audienceMaxAge
    id
    eventStatus
    externalLinks {
      name
      link
    }
    images {
      id
      name
      url
      photographerName
    }
    subEvents {
      internalId
    }
    typeId
    superEvent {
      internalId
    }
    inLanguage {
      name {
        ...localizedFields
      }
    }
    keywords {
      ...keywordFields
    }
    location {
      ...placeFields
    }
    offers {
      ...offerFields
    }
    name {
      ...localizedFields
    }
    description {
      ...localizedFields
    }
    shortDescription {
      ...localizedFields
    }
    endTime
    startTime
    publisher
    provider {
      ...localizedFields
    }
    providerContactInfo {
      ...localizedFields
    }
    infoUrl {
      ...localizedFields
    }
    audience {
      id
      name {
        ...localizedFields
      }
    }
    locationExtraInfo {
      ...localizedFields
    }
    enrolmentStartTime
    enrolmentEndTime
    remainingAttendeeCapacity
  }

  query EventDetails($id: ID!, $include: [String]) {
    eventDetails(id: $id, include: $include) {
      ...eventFields
    }
  }
`;
