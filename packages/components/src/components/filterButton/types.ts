export type AgeFilterType = 'maxAge' | 'minAge';
export type DateFilterType = 'date' | 'dateType';
export type TextFilterType = 'text' | 'xFullText';

/**
 * @deprecated since the CombinedSearch refactoring its new types and adapters should
 * be used instead (e.g CombinedSearchAdapterInput) i.e. this should be a subset of
 * keyof CombinedSearchAdapterInput
 */
type CombinedSearchInputSubset =
  | 'helsinkiOnly'
  | 'reservable'
  | 'organization'
  | 'place'
  | 'sportsCategories'
  | 'targetGroups'
  | 'accessibility';

export type FilterType =
  | AgeFilterType
  | DateFilterType
  | TextFilterType
  | CombinedSearchInputSubset
  | 'category' // Used in events-helsinki and hobbies-helsinki
  | 'division' // Used in events-helsinki and hobbies-helsinki
  | 'publisher' // Used in events-helsinki and hobbies-helsinki
  | 'targetAgeGroup'; // Used in events-helsinki
