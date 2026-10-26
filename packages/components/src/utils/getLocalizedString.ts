import { APP_LANGUAGES } from '../constants';
import type { AppLanguage } from '../types';

/**
 * Check is the instance that is rendering component client (not SSR)
 */

type LocalizedObject = {
  en?: string | null;
  fi?: string | null;
  sv?: string | null;
};

const getLocalizedString = (
  obj: Partial<LocalizedObject> | undefined | null,
  language: AppLanguage
): string => {
  if (obj === null) {
    return '';
  }

  const localizedObject = obj ?? {};
  const languages = [
    language,
    ...APP_LANGUAGES.filter((item) => item !== language),
  ];
  // Find first language which has value
  const locale = languages.find((lng) => localizedObject[lng]);
  // Return value in correct language
  return (locale && localizedObject[locale]) || '';
};

export default getLocalizedString;
