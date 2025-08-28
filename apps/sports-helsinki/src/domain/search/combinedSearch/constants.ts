import {
  EventTypeId,
  UnifiedSearchLanguage,
  EVENT_SORT_OPTIONS,
  HELSINKI_OCD_DIVISION_ID,
} from '@events-helsinki/components';
import { SPORTS_DEPARTMENT_ONTOLOGY_TREE_ID } from '../../app/appConstants';
import { SPORT_COURSES_KEYWORDS } from '../eventSearch/constants';
import type {
  CombinedSearchAdapterInput,
  EventSearchParams,
  VenueSearchParams,
} from './types';

export const PARAM_SEARCH_TYPE = 'searchType';

export const initialCombinedSearchFormValues = {
  text: '',
  venueOrderBy: undefined,
  eventOrderBy: undefined,
  courseOrderBy: undefined,
  sportsCategories: [] as string[],
  targetGroups: [] as string[],
  helsinkiOnly: undefined,
  reservable: undefined,
  organization: undefined,
  place: undefined,
  keywords: [] as string[],
  accessibilityProfile: undefined,
} as const satisfies CombinedSearchAdapterInput;

export const initialVenueSearchAdapterValues = {
  includeHaukiFields: false,
  language: UnifiedSearchLanguage.Finnish,
  text: '*',
  ontologyTreeIdOrSets: [
    [SPORTS_DEPARTMENT_ONTOLOGY_TREE_ID.toString()],
  ] as string[][],
  ontologyWordIdOrSets: [] as string[][],
  administrativeDivisionIds: [HELSINKI_OCD_DIVISION_ID] as string[],
  providerTypes: undefined,
  serviceOwnerTypes: undefined,
  openAt: null,
  after: '',
  first: 10,
} as const satisfies VenueSearchParams;

export const initialEventSearchAdapterValues = {
  fullText: '',
  ongoing: true,
  start: 'now',
  end: '',
  include: ['keywords', 'location'] as string[],
  keywordAnd: [] as string[],
  keywordNot: [] as string[],
  keywordOrSet1: SPORT_COURSES_KEYWORDS,
  keywordOrSet2: [] as string[],
  location: [] as string[],
  sort: EVENT_SORT_OPTIONS.END_TIME,
  eventType: EventTypeId.General,
  // Don't use superEventType when experimenting:
  //  LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512)
  superEventType: undefined,
  // Only the course type search should use this param;
  // LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512)
  superEvent: undefined,
  publisher: null,
  publisherAncestor: null,
  pageSize: 10,
} as const satisfies EventSearchParams;
