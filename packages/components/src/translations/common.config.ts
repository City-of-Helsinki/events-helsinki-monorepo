import type { I18nActiveNamespaces } from '../lib/i18n';

export type CommonConfig = {
  i18nNamespaces: I18nActiveNamespaces<'common'>;
};

export const commonConfig: CommonConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['common'],
};
