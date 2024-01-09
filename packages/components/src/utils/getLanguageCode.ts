import { LanguageCodeEnum } from 'react-helsinki-headless-cms';
import type { AppLanguage } from '../types';

const appLanguageToLanguageCode: Record<AppLanguage, LanguageCodeEnum> = {
  en: LanguageCodeEnum.En,
  fi: LanguageCodeEnum.Fi,
  sv: LanguageCodeEnum.Sv,
} as const;

export default function getLanguageCode(language: AppLanguage) {
  return appLanguageToLanguageCode[language];
}
