import type { Language } from 'events-helsinki-core';
import useCommonTranslation from './useCommonTranslation';

const useLocale = (): Language => {
  const { i18n } = useCommonTranslation();
  const language = i18n.language;

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
