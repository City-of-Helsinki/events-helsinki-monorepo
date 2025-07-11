// Amount of the similar events

export const SIMILAR_EVENTS_AMOUNT = 8;

export const EVENT_KEYWORD_BLACK_LIST = [
  'helmet:10592', // Yleinen
  'helmet:10689', // Helsinki
  'helmet:11916', // Infonäytöt (Helsinki)
  'kulke:53', // Suomi
  'kulke:54', // Ruotsi
  'kulke:55', // Englanti
  'kulke:616', // Näkyy TV-sovelluksessa
  'kulke:671', // Normaali
  'kulke:673', // Suomi (TV)
];

export const EVENT_SOME_IMAGE = '/images/activities_SoMe-share.jpg';

export const EVENT_LOCATIONS = { INTERNET: 'helsinki:internet' };

export enum EVENT_SORT_OPTIONS {
  DURATION = 'duration',
  DURATION_DESC = '-duration',
  END_TIME = 'end_time',
  END_TIME_DESC = '-end_time',
  LAST_MODIFIED_TIME = 'last_modified_time',
  LAST_MODIFIED_TIME_DESC = '-last_modified_time',
  START_TIME = 'start_time',
  START_TIME_DESC = '-start_time',
}

export const isEventSortOption = (
  value: unknown
): value is EVENT_SORT_OPTIONS =>
  Object.values(EVENT_SORT_OPTIONS).includes(value as EVENT_SORT_OPTIONS);

export const DEFAULT_EVENT_SORT_OPTION = EVENT_SORT_OPTIONS.END_TIME;

export enum EnrolmentStatusLabel {
  enrollable = 'enrollable',
  noEnrolmentTimes = 'noEnrolmentTimes',
  full = 'full',
  enrolmentNotStartedYet = 'enrolmentNotStartedYet',
  enrolmentEnded = 'enrolmentEnded',
  queueable = 'queueable',
}

export enum EVENT_SEARCH_FILTERS {
  CATEGORIES = 'categories',
  HOBBY_TYPES = 'hobbyTypes',
  DATE_TYPES = 'dateTypes',
  DIVISIONS = 'divisions',
  END = 'end',
  HELSINKI_ONLY = 'helsinkiOnly',
  IS_FREE = 'isFree',
  KEYWORD = 'keyword',
  KEYWORD_NOT = 'keywordNot',
  ONLY_CHILDREN_EVENTS = 'onlyChildrenEvents',
  ONLY_EVENING_EVENTS = 'onlyEveningEvents',
  ONLY_REMOTE_EVENTS = 'onlyRemoteEvents',
  PAGE = 'page',
  PLACES = 'places',
  PUBLISHER = 'publisher',
  START = 'start',
  TEXT = 'xFullText',
  ONGOING = 'xOngoing',
  MIN_AGE = 'audienceMinAgeLt',
  MAX_AGE = 'audienceMaxAgeGt',
  SUITABLE = 'suitableFor',
}

/**
 * City of Helsinki's organization ID in Linked Events
 * @see https://api.hel.fi/linkedevents/v1/organization/ahjo:00001/
 */
export const CITY_OF_HELSINKI_LINKED_EVENTS_ORGANIZATION_ID =
  'ahjo:00001' as const;

/**
 * Prefixes of organization IDs under City of Helsinki root organization 'ahjo:00001',
 * @see https://api.hel.fi/linkedevents/v1/organization/ahjo:00001/
 *
 * Kultus subtree of the organization tree starts at 'kultus:0' and is excluded,
 * @see https://api.hel.fi/linkedevents/v1/organization/kultus:0/
 */
export const CITY_OF_HELSINKI_LINKED_EVENTS_ORGANIZATION_PREFIXES = [
  'ahjo',
  'helsinki',
];
