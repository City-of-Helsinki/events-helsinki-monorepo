import { gql } from 'graphql-tag';

export const SUGGESTION_QUERY = gql`
  query UnifiedSearchCompletionSuggestions(
    $prefix: String
    $language: UnifiedSearchLanguage!
  ) {
    unifiedSearchCompletionSuggestions(
      prefix: $prefix
      index: location
      languages: [$language]
    ) {
      suggestions {
        label
      }
    }
  }
`;
