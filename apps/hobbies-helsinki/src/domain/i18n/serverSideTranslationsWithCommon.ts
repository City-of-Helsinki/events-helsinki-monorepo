import type { AppLanguage } from '@events-helsinki/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../../../next-i18next.config.mjs';

const COMMON_TRANSLATIONS = [
  'appHobbies',
  'cms',
  'common',
  'consent',
  'errors',
  'footer',
  'geolocationProvider',
  'notFound',
];

export default async function serverSideTranslationsWithCommon(
  locale: AppLanguage,
  namespaces: string[] = []
) {
  // By default, next-i18next will send only the active locale down to the client on each request.
  // This helps reduce the size of the initial payload sent to the client.
  // However, the cookie consent needs a full dictionary (meaning translations in every language),
  // so we need to provide extra locales.
  const extraLocales = [...nextI18nextConfig.i18n.locales].filter(
    (lng) => lng !== 'default'
  );

  return serverSideTranslations(
    locale,
    [...new Set([...COMMON_TRANSLATIONS, ...namespaces])],
    {
      ...nextI18nextConfig,
    },
    extraLocales
  );
}
