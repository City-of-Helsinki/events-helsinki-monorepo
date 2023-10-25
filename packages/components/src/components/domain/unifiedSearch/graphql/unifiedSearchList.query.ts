import { gql } from '@apollo/client';

export const SEARCH_LIST_QUERY = gql`
  query SearchList(
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
    $orderByAccessibilityProfile: AccessibilityProfile
    $showAccessibilityShortcomingsFor: AccessibilityProfile
    $includeHaukiFields: Boolean = true
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
      orderByAccessibilityProfile: $orderByAccessibilityProfile
    ) {
      count
      pageInfo {
        endCursor
        hasNextPage
      }
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
            description {
              fi
            }
            images {
              url
            }
            openingHours @include(if: $includeHaukiFields) {
              today {
                startTime
                endTime
                endTimeOnNextDay
                fullDay
                resourceState
              }
              data {
                date
                times {
                  startTime
                  endTime
                  endTimeOnNextDay
                  fullDay
                  resourceState
                }
              }
            }
            location {
              address {
                streetAddress {
                  fi
                  sv
                  en
                }
                postalCode
                city {
                  fi
                  sv
                  en
                }
              }
              geoLocation {
                geometry {
                  coordinates
                }
              }
            }
            ontologyWords {
              id
              label {
                fi
                sv
                en
              }
            }
            serviceOwner {
              name {
                fi
                sv
                en
              }
              providerType
              type
            }
            targetGroups
            accessibilityShortcomingFor(
              profile: $showAccessibilityShortcomingsFor
            ) {
              profile
              count
            }
          }
        }
      }
    }
  }
`;
