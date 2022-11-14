import type { Language } from 'events-helsinki-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../../../next-i18next.config';

const COMMON_TRANSLATIONS = [
  'appHobbies',
  'common',
  'consent',
  'footer',
  'notFound',
  'home',
];

export default async function serverSideTranslationsWithCommon(
  locale: Language,
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
