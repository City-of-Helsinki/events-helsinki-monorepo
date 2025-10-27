import { APP_LANGUAGES } from '../constants';
import type { AppLanguage } from '../types';

const isAppLanguage = (value: unknown): value is AppLanguage => {
  return (
    typeof value === 'string' &&
    (APP_LANGUAGES as readonly string[]).includes(value)
  );
};

export default isAppLanguage;
