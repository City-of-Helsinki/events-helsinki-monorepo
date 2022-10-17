import type { I18nActiveNamespaces } from '@/lib/i18n';

export type HomeConfig = {
  i18nNamespaces: I18nActiveNamespaces<'home'>;
};

export const homeConfig: HomeConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['home'],
};
