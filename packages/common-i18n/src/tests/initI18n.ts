import i18n from 'i18next';
// eslint-disable-next-line no-restricted-imports
import { initReactI18next } from 'react-i18next';

import appEvents_en from '../locales/en/appEvents.json';
import appHobbies_en from '../locales/en/appHobbies.json';
import cms_en from '../locales/en/cms.json';
import common_en from '../locales/en/common.json';
import event_en from '../locales/en/event.json';
import footer_en from '../locales/en/footer.json';
import home_en from '../locales/en/home.json';
import notFound_en from '../locales/en/notFound.json';
import search_en from '../locales/en/search.json';
import appEvents from '../locales/fi/appEvents.json';
import appHobbies from '../locales/fi/appHobbies.json';
import cms from '../locales/fi/cms.json';
import common from '../locales/fi/common.json';
import event from '../locales/fi/event.json';
import footer from '../locales/fi/footer.json';
import home from '../locales/fi/home.json';
import notFound from '../locales/fi/notFound.json';
import search from '../locales/fi/search.json';
import appEvents_sv from '../locales/sv/appEvents.json';
import appHobbies_sv from '../locales/sv/appHobbies.json';
import cms_sv from '../locales/sv/cms.json';
import common_sv from '../locales/sv/common.json';
import event_sv from '../locales/sv/event.json';
import footer_sv from '../locales/sv/footer.json';
import home_sv from '../locales/sv/home.json';
import notFound_sv from '../locales/sv/notFound.json';
import search_sv from '../locales/sv/search.json';

export const translations = {
  cms,
  common,
  event,
  footer,
  home,
  notFound,
  search,
  appEvents,
  appHobbies,
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
      event: event_en,
      footer: footer_en,
      home: home_en,
      notFound: notFound_en,
      search: search_en,
      appEvents: appEvents_en,
      appHobbies: appHobbies_en,
    },
    sv: {
      cms: cms_sv,
      common: common_sv,
      event: event_sv,
      footer: footer_sv,
      home: home_sv,
      notFound: notFound_sv,
      search: search_sv,
      appEvents: appEvents_sv,
      appHobbies: appHobbies_sv,
    },
  },
};

i18n.use(initReactI18next).init(config);

export default i18n;
