import type { Language, LocalizedString } from 'types';

export default function getTranslation(
  locale: Language,
  translation?: LocalizedString | undefined | null
) {
  return ((translation && translation[locale]) ?? translation?.fi) || '';
}
