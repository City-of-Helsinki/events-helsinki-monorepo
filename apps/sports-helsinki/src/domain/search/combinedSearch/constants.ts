import type { CombinedSearchAdapterInput } from './types';

export const PARAM_SEARCH_TYPE = 'searchType';
export const initialCombinedSearchFormValues: CombinedSearchAdapterInput = {
  text: '',
  orderBy: '',
  sportsCategories: [],
  organization: null,
  keywords: [],
};
