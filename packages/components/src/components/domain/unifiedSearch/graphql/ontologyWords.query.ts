import { gql } from 'graphql-tag';

export const ONTOLOGY_WORDS_QUERY = gql`
  query OntologyWords($ids: [ID!]) {
    ontologyWords(ids: $ids) {
      id
      label {
        fi
        sv
        en
      }
    }
  }
`;
