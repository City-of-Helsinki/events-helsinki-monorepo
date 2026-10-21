import type { AppLanguage, LocalizedString } from './../types';

export default function getTranslation(
  locale: AppLanguage,
  translation?: LocalizedString | undefined | null
) {
  return translation?.[locale] ?? translation?.fi ?? '';
}
