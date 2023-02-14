import i18n from 'i18next';
// eslint-disable-next-line no-restricted-imports
import { initReactI18next } from 'react-i18next';

import appEvents_en from '../locales/en/appEvents.json';
import appHobbies_en from '../locales/en/appHobbies.json';
import appSports_en from '../locales/en/appSports.json';
import cms_en from '../locales/en/cms.json';
import common_en from '../locales/en/common.json';
import consent_en from '../locales/en/consent.json';
import errors_en from '../locales/en/errors.json';
import event_en from '../locales/en/event.json';
import footer_en from '../locales/en/footer.json';
import geolocationProvider_en from '../locales/en/geolocationProvider.json';
import home_en from '../locales/en/home.json';
import notFound_en from '../locales/en/notFound.json';
import search_en from '../locales/en/search.json';
import venue_en from '../locales/en/venue.json';
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
import appEvents_sv from '../locales/sv/appEvents.json';
import appHobbies_sv from '../locales/sv/appHobbies.json';
import appSports_sv from '../locales/sv/appSports.json';
import cms_sv from '../locales/sv/cms.json';
import common_sv from '../locales/sv/common.json';
import consent_sv from '../locales/sv/consent.json';
import errors_sv from '../locales/sv/errors.json';
import event_sv from '../locales/sv/event.json';
import footer_sv from '../locales/sv/footer.json';
import geolocationProvider_sv from '../locales/sv/geolocationProvider.json';
import home_sv from '../locales/sv/home.json';
import notFound_sv from '../locales/sv/notFound.json';
import search_sv from '../locales/sv/search.json';
import venue_sv from '../locales/sv/venue.json';

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
      cms: cms_en,
      common: common_en,
      appEvents: appEvents_en,
      appHobbies: appHobbies_en,
      appSports: appSports_en,
      consent: consent_en,
      errors: errors_en,
      event: event_en,
      venue: venue_en,
      footer: footer_en,
      geolocationProvider: geolocationProvider_en,
      home: home_en,
      notFound: notFound_en,
      search: search_en,
    },
    sv: {
      cms: cms_sv,
      common: common_sv,
      appEvents: appEvents_sv,
      appHobbies: appHobbies_sv,
      appSports: appSports_sv,
      consent: consent_sv,
      errors: errors_sv,
      event: event_sv,
      venue: venue_sv,
      footer: footer_sv,
      geolocationProvider: geolocationProvider_sv,
      home: home_sv,
      notFound: notFound_sv,
      search: search_sv,
    },
  },
};

i18n.use(initReactI18next).init(config);

export default i18n;
