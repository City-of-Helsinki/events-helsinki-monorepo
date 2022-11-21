import type { I18nActiveNamespaces } from '@/lib/i18n';

export type ConsentConfig = {
  i18nNamespaces: I18nActiveNamespaces<'consent'>;
};

export const consentConfig: ConsentConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['consent'],
};
