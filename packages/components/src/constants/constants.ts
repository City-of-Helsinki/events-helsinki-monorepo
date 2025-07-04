import { LanguageCodeEnum } from '../types';
import type { Language, AppLanguage } from '../types';

export const MAIN_CONTENT_ID = 'main-content';

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

/**
 * If logic for selecting the fallback language priority is needed,
 * then prioritize order is English, Finnish, Swedish.
 * Ref: https://helsinkisolutionoffice.atlassian.net/browse/HH-110
 */
export const APP_LANGUAGES = ['en', 'fi', 'sv'] as const;

export const APP_LANGUAGE_LABELS: Record<AppLanguage, string> = {
  en: 'English',
  fi: 'Suomi',
  sv: 'Svenska',
} as const;

export const DEFAULT_LANGUAGE: AppLanguage = 'fi';

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

export const DEFAULT_HEADER_MENU_NAME: Record<AppLanguage, string> = {
  fi:
    process.env.NEXT_PUBLIC_CMS_HEADER_MENU_NAME_FI ??
    'Events Helsinki Header FI',
  en:
    process.env.NEXT_PUBLIC_CMS_HEADER_MENU_NAME_EN ??
    'Events Helsinki Header EN',
  sv:
    process.env.NEXT_PUBLIC_CMS_HEADER_MENU_NAME_SV ??
    'Events Helsinki Header SV',
};

export const DEFAULT_FOOTER_MENU_NAME: Record<AppLanguage, string> = {
  fi:
    process.env.NEXT_PUBLIC_CMS_FOOTER_MENU_NAME_FI ??
    'Events Helsinki Footer FI',
  en:
    process.env.NEXT_PUBLIC_CMS_FOOTER_MENU_NAME_EN ??
    'Events Helsinki Footer EN',
  sv:
    process.env.NEXT_PUBLIC_CMS_FOOTER_MENU_NAME_SV ??
    'Events Helsinki Footer SV',
};

export const DEFAULT_HEADER_UNIVERSAL_BAR_MENU_NAME: Record<
  AppLanguage,
  string
> = {
  fi:
    process.env.NEXT_PUBLIC_CMS_HEADER_UNIVERSAL_BAR_MENU_NAME_FI ??
    'Events Helsinki Universal bar FI',
  en:
    process.env.NEXT_PUBLIC_CMS_HEADER_UNIVERSAL_BAR_MENU_NAME_EN ??
    'Events Helsinki Universal bar EN',
  sv:
    process.env.NEXT_PUBLIC_CMS_HEADER_UNIVERSAL_BAR_MENU_NAME_SV ??
    'Events Helsinki Universal bar SV',
};

/**
 * This is just a mock of list of Languages.
 * The react-helsinki-headless-cms needs typeof `Language[]` in a list of lanugages,
 * and at least the current language must present in the list.
 * The error page should not fetch langauges by using the Apollo client,
 * because the network error in the Apollo client is
 * usually the reason to show the error page.
 */
export const HARDCODED_LANGUAGES: Language[] = [
  {
    __typename: 'Language',
    id: 'TGFuZ3VhZ2U6Zmk=',
    locale: 'fi',
    name: 'Suomi',
    code: LanguageCodeEnum.Fi,
    slug: 'fi',
  },
  {
    __typename: 'Language',
    id: 'TGFuZ3VhZ2U6ZW4=',
    locale: 'en',
    name: 'English',
    code: LanguageCodeEnum.En,
    slug: 'en',
  },
  {
    __typename: 'Language',
    id: 'TGFuZ3VhZ2U6c3Y=',
    locale: 'sv',
    name: 'Svenska',
    code: LanguageCodeEnum.Sv,
    slug: 'sv',
  },
];
