import { EVENT_SORT_OPTIONS } from '@events-helsinki/components/constants';
import {
  EventTypeId,
  UnifiedSearchLanguage,
} from '@events-helsinki/components/types';
import {
  HELSINKI_OCD_DIVISION_ID,
  SPORTS_DEPARTMENT_ONTOLOGY_TREE_ID,
} from '../../app/appConstants';
import { SPORT_COURSES_KEYWORDS } from '../eventSearch/constants';
import type {
  CombinedSearchAdapterInput,
  EventSearchParams,
  VenueSearchParams,
} from './types';

export const PARAM_SEARCH_TYPE = 'searchType';
export const initialCombinedSearchFormValues: CombinedSearchAdapterInput = {
  text: '',
  venueOrderBy: undefined,
  eventOrderBy: undefined,
  courseOrderBy: undefined,
  sportsCategories: [],
  organization: undefined,
  keywords: [],
};
export const initialVenueSearchAdapterValues: VenueSearchParams = {
  includeHaukiFields: false,
  language: UnifiedSearchLanguage.Finnish,
  q: '*',
  ontologyTreeIds: [SPORTS_DEPARTMENT_ONTOLOGY_TREE_ID.toString()],
  ontologyWordIds: [],
  administrativeDivisionIds: [HELSINKI_OCD_DIVISION_ID],
  openAt: null,
  after: '',
  first: 10,
};

export const initialEventSearchAdapterValues: EventSearchParams = {
  allOngoingAnd: [],
  start: 'now',
  end: '',
  include: ['keywords', 'location'],
  keywordAnd: [],
  keywordNot: [],
  keywordOrSet1: SPORT_COURSES_KEYWORDS,
  keywordOrSet2: [],
  location: [],
  sort: EVENT_SORT_OPTIONS.END_TIME,
  eventType: EventTypeId.General,
  superEventType: ['umbrella', 'none'],
  publisher: null,
  pageSize: 10,
};
