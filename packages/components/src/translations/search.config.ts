import type { I18nActiveNamespaces } from '@/lib/i18n';

export type SearchConfig = {
  i18nNamespaces: I18nActiveNamespaces<'search'>;
};

export const searchConfig: SearchConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['search'],
};
