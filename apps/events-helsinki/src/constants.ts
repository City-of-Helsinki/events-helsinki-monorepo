export const ROUTES = {
  FRONT_PAGE: '/',
  SEARCH: '/search',
  EVENTS: '/events/[eventId]',
  ARTICLE_ARCHIVE: '/articles',
  ARTICLES: '/articles/[...slug]',
  PAGES: '/pages/[...slug]',
  LINK: '',
  VENUES: '/venues/[venueId]',
  COOKIE_CONSENT: '/cookie-consent',
};

export const EXTLINK = {
  EXTLINK_FACEBOOK: 'extlink_facebook',
  EXTLINK_INSTAGRAM: 'extlink_instagram',
  EXTLINK_TWITTER: 'extlink_twitter',
  EXTLINK_YOUTUBE: 'extlink_youtube',
};

export const DATE_TYPES = {
  TODAY: 'today',
  TOMORROW: 'tomorrow',
  WEEKEND: 'weekend',
  THIS_WEEK: 'this_week',
};

export const EVENT_STATUS = {
  EVENT_CANCELLED: 'EventCancelled',
  EVENT_SCHEDULED: 'EventScheduled',
};

export enum DATE_PICKER_INPUT {
  START = 'start',
  END = 'end',
}

export enum DATE_PICKER_INPUT_STATE {
  NOT_SELECTED = 'not-selected',
  START_TIME_SELECTED = 'start-time-selected',
  END_TIME_SELECTED = 'end-time-selected',
}

export const DEFAULT_SOME_IMAGE = '/images/activities_SoMe-share.jpg';

export const FEEDBACK_LINKS = {
  fi: 'https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute',
  en: 'https://www.hel.fi/helsinki/en/administration/participate/feedback',
  sv: 'https://www.hel.fi/helsinki/sv/stad-och-forvaltning/delta/feedback',
};

export const TARGET_GROUP_AGE_GROUPS_IN_ORDER = [
  'babies',
  'children',
  'youth',
  'adults',
  'seniors',
] as const;

export type AgeGroup = (typeof TARGET_GROUP_AGE_GROUPS_IN_ORDER)[number];

/**
 * Maps age group names to their corresponding keyword IDs.
 * The use of a simple `Record` provides type safety and a clear structure.
 *
 * @see https://api.hel.fi/linkedevents/v1/keyword/ to check keyword-related data.
 * @see https://helsinkisolutionoffice.atlassian.net/browse/TH-1327 for spec.
 */
export const AGE_GROUP_KEYWORDS: Record<AgeGroup, readonly string[]> = {
  babies: ['yso:p20513', 'yso:p15937'], // Vauvaperheet
  children: [
    'yso:p4354', // Lapset
    'yso:p13050', // Lapsiperheet
  ],
  youth: ['yso:p11617'], // Nuoret
  seniors: ['yso:p2433'], // Ikääntyneet
  // NOTE: Adults is all the else excluded, @see `EVENT_SEARCH_ADULT_KEYWORD_EXCLUSIONS`
  adults: [],
} as const;

/**
 * A list of additional keywords that should be excluded when searching for events for adults.
 * These are not tied to a specific age group category.
 *
 * @see https://api.hel.fi/linkedevents/v1/keyword/ to check keyword-related data.
 */
const additionalAdultKeywordExclusion = [
  'yso:p8105', // Leikkipuistot
  'yso:p16485', // Koululaiset (schoolchildren)
  'yso:p38259', // Alakoululaiset (primary school students)
  'helsinki:aflfbat76e', // Palvelukeskuskortti (service center card)
] as const;

/**
 * All but adult tager age group keywords from `AGE_GROUP_KEYWORDS`.
 */
const targetAgeGroupKeywordsWithoutAdults = [
  ...Object.values(AGE_GROUP_KEYWORDS).flat(),
].filter((item) => !AGE_GROUP_KEYWORDS['adults'].includes(item));

/**
 * A comprehensive list of all keywords that should be excluded
 * when searching for events for adults. This list is programmatically generated
 * to prevent manual errors and ensure it stays in sync with `AGE_GROUP_KEYWORDS`.
 *
 * @remarks
 * The adults category is defined by excluding all other age groups.
 */
export const EVENT_SEARCH_ADULT_KEYWORD_EXCLUSIONS = [
  ...targetAgeGroupKeywordsWithoutAdults,
  ...additionalAdultKeywordExclusion,
] as const;
