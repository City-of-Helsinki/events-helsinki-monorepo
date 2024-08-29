import type { AppLanguage } from '../../types';

export type ResilientTranslationKey =
  | 'appEvents:appName'
  | 'appHobbies:appName'
  | 'appSports:appName'
  | 'errors:feedbackFormLink'
  | 'errors:moveToHomePageButton'
  | 'errors:unknownError.descriptionPrefix'
  | 'errors:unknownError.descriptionSuffixLinkText'
  | 'errors:unknownError.title'
  | 'footer:allRightsReserved'
  | 'footer:backToTop'
  | 'footer:copyright'
  | 'page:preview'
  | 'page:minutes';

export type ResilientTranslation = Record<AppLanguage, string>;

export type ResilientTranslations = Record<
  ResilientTranslationKey,
  ResilientTranslation
>;
