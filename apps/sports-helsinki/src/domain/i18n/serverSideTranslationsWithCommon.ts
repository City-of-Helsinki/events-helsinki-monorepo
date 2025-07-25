import type { AppLanguage } from '@events-helsinki/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../../../next-i18next.config.mjs';

const COMMON_TRANSLATIONS = [
  'appSports',
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
  return serverSideTranslations(
    locale,
    [...new Set([...COMMON_TRANSLATIONS, ...namespaces])],
    {
      ...nextI18nextConfig,
    }
  );
}
