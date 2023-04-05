import type { CombinedSearchAdapterInput } from './types';

export const PARAM_SEARCH_TYPE = 'searchType';
export const initialCombinedSearchFormValues: CombinedSearchAdapterInput = {
  text: '',
  venueOrderBy: null,
  eventOrderBy: null,
  courseOrderBy: null,
  sportsCategories: [],
  organization: null,
  keywords: [],
};
