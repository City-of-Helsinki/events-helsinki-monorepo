import { gql } from '@apollo/client';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const QUERY_NEIGHBORHOOD = gql`
  query NeighborhoodList {
    neighborhoodList {
      meta {
        count
        next
        previous
      }
      data {
        id
        name {
          fi
          sv
          en
        }
      }
    }
  }
`;
