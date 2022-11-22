import type { I18nActiveNamespaces } from '@/lib/i18n';

export type AppSportsConfig = {
  i18nNamespaces: I18nActiveNamespaces<'appSports'>;
};

export const appSportsConfig: AppSportsConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['appSports'],
};
