export type AgeFilterType = 'maxAge' | 'minAge' | 'exactAge';
export type DateFilterType = 'date' | 'dateType';
export type TextFilterType = 'text' | 'fullText';

export type FilterType =
  | AgeFilterType
  | DateFilterType
  | TextFilterType
  | 'helsinkiOnly'
  | 'reservable'
  | 'organization'
  | 'place'
  | 'sportsCategories'
  | 'targetGroups'
  | 'accessibility'
  | 'category' // Used in events-helsinki and hobbies-helsinki
  | 'division' // Used in events-helsinki and hobbies-helsinki
  | 'publisher' // Used in events-helsinki and hobbies-helsinki
  | 'targetAgeGroup'; // Used in events-helsinki
