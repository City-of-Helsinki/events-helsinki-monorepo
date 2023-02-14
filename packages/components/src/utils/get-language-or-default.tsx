import { DEFAULT_LANGUAGE } from '../constants';
import isAppLanguage from '../type-guards/is-app-language';
import type { AppLanguage } from '../types';

const getLanguageOrDefault = (value: unknown): AppLanguage =>
  isAppLanguage(value) ? value : DEFAULT_LANGUAGE;

export default getLanguageOrDefault;
