import type { Language } from '../../types';

export type TranslationsObject = {
  fi?: string;
  en?: string;
  sv?: string;
};

export default function getTranslation(
  translation: TranslationsObject,
  locale: Language
) {
  return translation[locale] ?? translation.fi;
}
