import type { I18nActiveNamespaces } from '@/lib/i18n';

export type ErrorsConfig = {
  i18nNamespaces: I18nActiveNamespaces<'errors'>;
};

export const errorsConfig: ErrorsConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['errors'],
};
