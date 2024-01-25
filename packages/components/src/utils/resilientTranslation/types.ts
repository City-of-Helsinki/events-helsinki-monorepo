import type { AppLanguage } from '../../types';

export type ResilientTranslationKey =
  | 'appEvents:appName'
  | 'appHobbies:appName'
  | 'appSports:appName';

export type ResilientTranslation = Record<AppLanguage, string>;

export type ResilientTranslations = Record<
  ResilientTranslationKey,
  ResilientTranslation
>;
