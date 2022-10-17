import type { I18nActiveNamespaces } from '@/lib/i18n';

export type FooterConfig = {
  i18nNamespaces: I18nActiveNamespaces<'footer'>;
};

export const footerConfig: FooterConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['footer'],
};
