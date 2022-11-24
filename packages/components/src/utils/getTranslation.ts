import type { LanguageString } from '../types';

export default function getTranslation(
  translation: LanguageString,
  locale: keyof LanguageString
) {
  return translation[locale] ?? translation.fi;
}
