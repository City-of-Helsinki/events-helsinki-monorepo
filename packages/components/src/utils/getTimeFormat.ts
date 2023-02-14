import type { AppLanguage } from '../types';

/**
 * Get localised time format
 */
const getTimeFormat = (lng: AppLanguage): string => {
  switch (lng) {
    case 'en':
      return 'h:mm aaaa';
    case 'sv':
      return 'HH:mm';
    case 'fi':
    default:
      return 'HH.mm';
  }
};

export default getTimeFormat;
