import { gql } from '@apollo/client';

export const VENUES_BY_IDS_QUERY = gql`
  query VenuesByIds($ids: [ID!], $includeHaukiFields: Boolean = true) {
    venuesByIds(ids: $ids) {
      ...venueFields
    }
  }
`;
