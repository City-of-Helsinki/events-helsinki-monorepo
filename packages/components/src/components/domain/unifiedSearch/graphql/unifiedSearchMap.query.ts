import { gql } from 'graphql-tag';

export const SEARCH_MAP_QUERY = gql`
  query SearchMap(
    $text: String
    $first: Int
    $after: String
    $language: UnifiedSearchLanguage!
    $administrativeDivisionIds: [ID!]
    $ontologyTreeIdOrSets: [[ID!]!]
    $ontologyWordIdOrSets: [[ID!]!]
    $providerTypes: [ProviderType]
    $serviceOwnerTypes: [ServiceOwnerType]
    $targetGroups: [TargetGroup]
    $openAt: String
    $orderByDistance: OrderByDistance
    $orderByName: OrderByName
  ) {
    unifiedSearch(
      text: $text
      index: location
      first: $first
      after: $after
      languages: [$language]
      administrativeDivisionIds: $administrativeDivisionIds
      ontologyTreeIdOrSets: $ontologyTreeIdOrSets
      ontologyWordIdOrSets: $ontologyWordIdOrSets
      providerTypes: $providerTypes
      serviceOwnerTypes: $serviceOwnerTypes
      targetGroups: $targetGroups
      openAt: $openAt
      orderByDistance: $orderByDistance
      orderByName: $orderByName
    ) {
      count
      edges {
        node {
          venue {
            meta {
              id
            }
            name {
              fi
              sv
              en
            }
            location {
              geoLocation {
                geometry {
                  coordinates
                }
              }
            }
          }
        }
      }
    }
  }
`;
