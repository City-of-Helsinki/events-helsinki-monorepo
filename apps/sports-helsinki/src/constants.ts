export const SEARCH_ROUTES = {
  SEARCH: '/search',
  MAPSEARCH: '/search/map',
};

// TODO: Set a typing that tells that it is extending SEARCH_ROUTES
export const ROUTES = {
  ...SEARCH_ROUTES,
  FRONT_PAGE: '/',
  COURSES: '/courses/[eventId]',
  VENUES: '/venues/[venueId]',
  ARTICLE_ARCHIVE: '/article-archive',
  ARTICLES: '/articles/[...slug]',
  PAGES: '/pages/[...slug]',
  COOKIE_CONSENT: '/cookie-consent',
  LINK: '',
};

export const AUTOSUGGEST_KEYWORD_BLACK_LIST = [
  'kulke:354', // Seniorit
];

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

export const MAIN_CONTENT_ID = 'main-content';

export const FEEDBACK_LINKS = {
  fi: 'https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute',
  en: 'https://www.hel.fi/helsinki/en/administration/participate/feedback',
  sv: 'https://www.hel.fi/helsinki/sv/stad-och-forvaltning/delta/feedback',
};
