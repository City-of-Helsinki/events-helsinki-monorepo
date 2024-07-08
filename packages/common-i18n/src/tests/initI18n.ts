import i18n from 'i18next';
// eslint-disable-next-line no-restricted-imports
import { initReactI18next } from 'react-i18next';

import appEventsEn from '../locales/en/appEvents.json';
import appHobbiesEn from '../locales/en/appHobbies.json';
import appSportsEn from '../locales/en/appSports.json';
import cmsEn from '../locales/en/cms.json';
import commonEn from '../locales/en/common.json';
import consentEn from '../locales/en/consent.json';
import errorsEn from '../locales/en/errors.json';
import eventEn from '../locales/en/event.json';
import footerEn from '../locales/en/footer.json';
import geolocationProviderEn from '../locales/en/geolocationProvider.json';
import homeEn from '../locales/en/home.json';
import notFoundEn from '../locales/en/notFound.json';
import searchEn from '../locales/en/search.json';
import venueEn from '../locales/en/venue.json';
import appEvents from '../locales/fi/appEvents.json';
import appHobbies from '../locales/fi/appHobbies.json';
import appSports from '../locales/fi/appSports.json';
import cms from '../locales/fi/cms.json';
import common from '../locales/fi/common.json';
import consent from '../locales/fi/consent.json';
import errors from '../locales/fi/errors.json';
import event from '../locales/fi/event.json';
import footer from '../locales/fi/footer.json';
import geolocationProvider from '../locales/fi/geolocationProvider.json';
import home from '../locales/fi/home.json';
import notFound from '../locales/fi/notFound.json';
import search from '../locales/fi/search.json';
import venue from '../locales/fi/venue.json';
import appEventsSv from '../locales/sv/appEvents.json';
import appHobbiesSv from '../locales/sv/appHobbies.json';
import appSportsSv from '../locales/sv/appSports.json';
import cmsSv from '../locales/sv/cms.json';
import commonSv from '../locales/sv/common.json';
import consentSv from '../locales/sv/consent.json';
import errorsSv from '../locales/sv/errors.json';
import eventSv from '../locales/sv/event.json';
import footerSv from '../locales/sv/footer.json';
import geolocationProviderSv from '../locales/sv/geolocationProvider.json';
import homeSv from '../locales/sv/home.json';
import notFoundSv from '../locales/sv/notFound.json';
import searchSv from '../locales/sv/search.json';
import venueSv from '../locales/sv/venue.json';

export const translations = {
  cms,
  common,
  appHobbies,
  appSports,
  appEvents,
  consent,
  errors,
  event,
  venue,
  footer,
  geolocationProvider,
  home,
  notFound,
  search,
};

export const config = {
  lng: 'fi',
  fallbackLng: 'fi',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  react: {
    useSuspense: false,
  },
  resources: {
    fi: translations,
    en: {
      cms: cmsEn,
      common: commonEn,
      appEvents: appEventsEn,
      appHobbies: appHobbiesEn,
      appSports: appSportsEn,
      consent: consentEn,
      errors: errorsEn,
      event: eventEn,
      venue: venueEn,
      footer: footerEn,
      geolocationProvider: geolocationProviderEn,
      home: homeEn,
      notFound: notFoundEn,
      search: searchEn,
    },
    sv: {
      cms: cmsSv,
      common: commonSv,
      appEvents: appEventsSv,
      appHobbies: appHobbiesSv,
      appSports: appSportsSv,
      consent: consentSv,
      errors: errorsSv,
      event: eventSv,
      venue: venueSv,
      footer: footerSv,
      geolocationProvider: geolocationProviderSv,
      home: homeSv,
      notFound: notFoundSv,
      search: searchSv,
    },
  },
};

i18n.use(initReactI18next).init(config);

export default i18n;
