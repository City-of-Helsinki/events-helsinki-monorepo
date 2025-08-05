import { gql } from 'graphql-tag';

export const ONTOLOGY_TREE_QUERY = gql`
  query OntologyTree($rootId: ID) {
    ontologyTree(rootId: $rootId, leavesOnly: true) {
      id
      name {
        fi
        sv
        en
      }
    }
  }
`;
