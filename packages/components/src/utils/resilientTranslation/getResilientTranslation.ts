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
    fi: 'Helsinki liikkuu',
    sv: 'Idrott och motion',
  },
  'errors:feedbackFormLink': {
    en: 'https://palautteet.hel.fi/en/',
    fi: 'https://palautteet.hel.fi/fi/',
    sv: 'https://palautteet.hel.fi/sv/',
  },
  'errors:moveToHomePageButton': {
    en: 'Go to the front page',
    fi: 'Siirry etusivulle',
    sv: 'Gå till startsidan',
  },
  'errors:unknownError.descriptionPrefix': {
    en: 'Try again later. If the situation recurs, tell us about it via our',
    fi: 'Koita myöhemmin uudestaan. Jos tilanne toistuu, kerro siitä meille',
    sv: 'Försök igen om en stund. Om situationen återkommer, berätta om det för oss med',
  },
  'errors:unknownError.descriptionSuffixLinkText': {
    en: 'feedback form',
    fi: 'palautelomakkeella',
    sv: 'responsblanketten',
  },
  'errors:unknownError.title': {
    en: 'An error was detected!',
    fi: 'Sivustolla havaittiin virhe!',
    sv: 'Ett fel upptäcktes på webbplatsen!',
  },
  'footer:allRightsReserved': {
    en: 'All rights reserved',
    fi: 'Kaikki oikeudet pidätetään',
    sv: 'Alla rättigheter förbehållna',
  },
  'footer:backToTop': {
    en: 'Back to top',
    fi: 'Takaisin alkuun',
    sv: 'Tillbaka upp',
  },
  'footer:copyright': {
    en: 'Copyright',
    fi: 'Copyright',
    sv: 'Copyright',
  },
  'page:preview': {
    en: 'Preview mode (Time left: {0}min).',
    fi: 'Esikatselutila (Aikaa jäljellä: {0}min)',
    sv: 'Förhandsgranskningsläge (Tid kvar: {0}min)',
  },
  'page:minutes': {
    en: 'minutes',
    fi: 'minutes',
    sv: 'minutes',
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
