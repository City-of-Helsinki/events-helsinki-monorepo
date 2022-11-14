import type { I18nActiveNamespaces } from '@/lib/i18n';

export type AppHobbiesConfig = {
  i18nNamespaces: I18nActiveNamespaces<'appHobbies'>;
};

export const appHobbiesConfig: AppHobbiesConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['appHobbies'],
};
