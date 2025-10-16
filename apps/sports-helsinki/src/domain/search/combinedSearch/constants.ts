import {
  EventTypeId,
  UnifiedSearchLanguage,
  EVENT_SORT_OPTIONS,
  HELSINKI_OCD_DIVISION_ID,
} from '@events-helsinki/components';
import AppConfig from '../../app/AppConfig';
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
  first: AppConfig.pageSize,
} as const satisfies VenueSearchParams;

export const initialEventSearchAdapterValues = {
  xFullText: '',
  xOngoing: true,
  start: 'now',
  end: '',
  include: AppConfig.eventSearchQueryIncludeParamValue,
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
  // Always filter with HELSINKI_OCD_DIVISION_ID to limit the results to city of Helsinki events.
  // NOTE: This is not needed if using any `*Ongoing` -filter as
  // they automatically limit the results to city of Helsinki events.
  division: [HELSINKI_OCD_DIVISION_ID],
  pageSize: AppConfig.pageSize,
} as const satisfies EventSearchParams;
