import { LOCALES } from '../constants';
import type Locale from '../types/locale';

const isLocale = (value: string): value is Locale => {
  return LOCALES.includes(value as Locale);
};

export default isLocale;
