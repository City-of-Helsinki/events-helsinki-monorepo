import { APP_LANGUAGES } from '../constants';
import type { AppLanguage } from '../types';

const isAppLanguage = (value: unknown): value is AppLanguage => {
  return APP_LANGUAGES.includes(value as AppLanguage);
};

export default isAppLanguage;
