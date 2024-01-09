export type AgeFilterType = 'maxAge' | 'minAge';
export type DateFilterType = 'date' | 'dateType';

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
  | 'text'
  | 'accessibility';

export type FilterType =
  | AgeFilterType
  | DateFilterType
  | CombinedSearchInputSubset
  | 'category' // Used in events-helsinki and hobbies-helsinki
  | 'division' // Used in events-helsinki and hobbies-helsinki
  | 'hobbyType' // Used in hobbies-helsinki
  | 'publisher'; // Used in events-helsinki and hobbies-helsinki
