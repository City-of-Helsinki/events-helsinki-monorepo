import { useTranslation } from 'next-i18next';
import type { Language } from '../types';

const useLocale = (): Language => {
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
