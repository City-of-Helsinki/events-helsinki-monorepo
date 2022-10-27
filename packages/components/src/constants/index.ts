/* eslint-disable @typescript-eslint/naming-convention */

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

export enum AUTOSUGGEST_TYPES {
  KEYWORD = 'keyword',
  TEXT = 'text',
}

export enum SUPPORT_LANGUAGES {
  EN = 'en',
  FI = 'fi',
  SV = 'sv',
}

/**
 * If logic for selecting the fallback language priority is needed,
 * then prioritize order is English, Finnish, Swedish.
 * Ref: https://helsinkisolutionoffice.atlassian.net/browse/HH-110
 */
export const supportedLanguages = Object.values(SUPPORT_LANGUAGES);

export enum DATE_PICKER_INPUT {
  START = 'start',
  END = 'end',
}

export enum DATE_PICKER_INPUT_STATE {
  NOT_SELECTED = 'not-selected',
  START_TIME_SELECTED = 'start-time-selected',
  END_TIME_SELECTED = 'end-time-selected',
}

export const DEFAULT_LANGUAGE = SUPPORT_LANGUAGES.FI;

export const DEFAULT_SOME_IMAGE = '/images/activities_SoMe-share.jpg';

export const FEEDBACK_LINKS = {
  fi: 'https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute',
  en: 'https://www.hel.fi/helsinki/en/administration/participate/feedback',
  sv: 'https://www.hel.fi/helsinki/sv/stad-och-forvaltning/delta/feedback',
};
