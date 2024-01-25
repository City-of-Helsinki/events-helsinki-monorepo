import type { AppLanguage } from '../../types';
import type { ResilientTranslationKey, ResilientTranslations } from './types';

/**
 * Resilient translations that should be used only for cases where next-i18next's
 * translation may fail.
 *
 * @warning DO NOT USE FOR NORMAL TRANSLATIONS, USE ONLY IF YOU NEED TO BE EXTRA SURE
 * THAT TRANSLATIONS WORK EVEN ON ERROR PAGES
 * @see https://github.com/i18next/next-i18next/issues/1020
 */
const RESILIENT_TRANSLATIONS = {
  'appEvents:appName': {
    en: 'Events',
    fi: 'Tapahtumat',
    sv: 'Evenemang',
  },
  'appHobbies:appName': {
    en: 'Hobbies',
    fi: 'Harrastukset',
    sv: 'Hobbyer',
  },
  'appSports:appName': {
    en: 'Sports and recreation',
    fi: 'Helsinki Liikkuu',
    sv: 'Idrott och motion',
  },
} as const satisfies ResilientTranslations;

/**
 * Translate resiliently i.e. so that it works even if next-i18next's translation fails,
 * which it does e.g. when an error occurs during an error.
 * @see https://github.com/i18next/next-i18next/issues/1020
 */
const getResilientTranslation = (
  translationKey: ResilientTranslationKey,
  language: AppLanguage
) => RESILIENT_TRANSLATIONS[translationKey][language];

export default getResilientTranslation;
