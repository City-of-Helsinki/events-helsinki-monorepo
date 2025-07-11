import { gql } from 'graphql-tag';

export const ADMINISTRATIVE_DIVISION_QUERY = gql`
  query AdministrativeDivisions {
    administrativeDivisions(helsinkiCommonOnly: true) {
      id
      type
      name {
        fi
        sv
        en
      }
    }
  }
`;
