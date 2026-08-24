import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEn from '../../common-i18n/src/locales/en/common.json';
import commonFi from '../../common-i18n/src/locales/fi/common.json';
import commonSv from '../../common-i18n/src/locales/sv/common.json';

const resources = {
  en: { common: commonEn },
  fi: { common: commonFi },
  sv: { common: commonSv },
};

void i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    supportedLngs: ['en', 'fi', 'sv'],
    resources,
  });

export default i18n;
