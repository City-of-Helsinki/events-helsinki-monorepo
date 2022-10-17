import type { I18nActiveNamespaces } from '@/lib/i18n';

export type EventConfig = {
  i18nNamespaces: I18nActiveNamespaces<'event'>;
};

export const eventConfig: EventConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['event'],
};
