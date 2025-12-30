import {
  LanguageCodeEnum,
  LanguageCodeFilterEnum,
} from '@city-of-helsinki/react-helsinki-headless-cms';

const languageCodeFilterMap: Record<LanguageCodeEnum, LanguageCodeFilterEnum> =
  {
    [LanguageCodeEnum.En]: LanguageCodeFilterEnum.En,
    [LanguageCodeEnum.Fi]: LanguageCodeFilterEnum.Fi,
    [LanguageCodeEnum.Sv]: LanguageCodeFilterEnum.Sv,
  } as const;

export default function getLanguageCodeFilter(languageCode: LanguageCodeEnum) {
  return languageCodeFilterMap[languageCode];
}
