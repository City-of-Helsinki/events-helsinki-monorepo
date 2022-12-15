import type { I18nActiveNamespaces } from '@/lib/i18n';

export type VenueConfig = {
  i18nNamespaces: I18nActiveNamespaces<'venue'>;
};

export const venueConfig: VenueConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['venue'],
};
