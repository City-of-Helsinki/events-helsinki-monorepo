import { gql } from '@apollo/client';

export const VENUE_QUERY = gql`
  fragment venueFields on Venue {
    addressLocality
    addressPostalFull
    dataSource
    departmentId
    description
    displayedServiceOwner
    displayedServiceOwnerType
    email
    id
    isOpen @include(if: $includeHaukiFields)
    image
    infoUrl
    name
    organizationId
    accessibilitySentences {
      groupName
      sentences
    }
    openingHours @include(if: $includeHaukiFields) {
      date
      times {
        startTime
        endTime
        endTimeOnNextDay
        resourceState
        fullDay
      }
    }
    position {
      type
      coordinates
    }
    postalCode
    providerType
    shortDescription
    streetAddress
    telephone
    ontologyWords {
      id
      label
    }
    connections {
      sectionType
      name
      phone
      url
    }
  }

  query Venue($id: ID!, $includeHaukiFields: Boolean = true) {
    venue(id: $id) {
      ...venueFields
    }
  }
`;
