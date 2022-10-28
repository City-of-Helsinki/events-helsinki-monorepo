import type { I18nActiveNamespaces } from '@/lib/i18n';

export type CommonConfig = {
  i18nNamespaces: I18nActiveNamespaces<
    'common' | 'hobbiesCommon' | 'eventsCommon'
  >;
};

export const commonConfig: CommonConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['common', 'hobbiesCommon', 'eventsCommon'],
};
