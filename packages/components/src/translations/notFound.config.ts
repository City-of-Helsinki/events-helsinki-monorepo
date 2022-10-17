import type { I18nActiveNamespaces } from '@/lib/i18n';

export type NotFoundConfig = {
  i18nNamespaces: I18nActiveNamespaces<'notFound'>;
};

export const notFoundConfig: NotFoundConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['notFound'],
};
