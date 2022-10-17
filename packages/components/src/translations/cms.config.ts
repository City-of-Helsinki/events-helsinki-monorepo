import type { I18nActiveNamespaces } from '@/lib/i18n';

export type CMSConfig = {
  i18nNamespaces: I18nActiveNamespaces<'cms'>;
};

export const cmsConfig: CMSConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['cms'],
};
