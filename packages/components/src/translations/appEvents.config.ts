import type { I18nActiveNamespaces } from '@/lib/i18n';

export type AppEventsConfig = {
  i18nNamespaces: I18nActiveNamespaces<'appEvents'>;
};

export const appEventsConfig: AppEventsConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['appEvents'],
};
