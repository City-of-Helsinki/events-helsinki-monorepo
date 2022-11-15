import { useTranslation } from 'next-i18next';
import type { AppLanguage } from '../types';

const useLocale = (): AppLanguage => {
  const {
    i18n: { language },
  } = useTranslation();

  switch (language) {
    case 'en':
    case 'fi':
    case 'sv':
      return language;
    default:
      return 'fi';
  }
};

export default useLocale;
