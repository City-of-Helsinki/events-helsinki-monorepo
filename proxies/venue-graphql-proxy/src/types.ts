import type { Sources } from './contants/constants';
import type { Ontology, Point } from './types/types';

export type Source = (typeof Sources)[keyof typeof Sources];

export type AnyObject = Record<string, unknown>;

export type Locale = 'fi' | 'sv' | 'en';

type VenueDetailsTextType = string | TranslationsObject; // 1 locale | 3 locales
type AccessibilitySentencesTypeFor<T extends VenueDetailsTextType> =
  T extends TranslationsObject
    ? Record<Locale, Array<AccessibilitySentences>> // 3 locales
    : T extends string
    ? Array<AccessibilitySentences> // 1 locale
    : never;

type VenueDetails<T extends VenueDetailsTextType> = {
  id: string;
  organizationId: string | null;
  departmentId: string | null;
  providerType: string | null;
  dataSource: string | null;
  email: string | null;
  postalCode: string | null;
  image: string | null;
  addressLocality: T | null;
  addressPostalFull: T | null;
  position: Point | null;
  description: T | null;
  shortDescription: T | null;
  displayedServiceOwnerType: string | null;
  displayedServiceOwner: T | null;
  name: T | null;
  infoUrl: T | null;
  streetAddress: T | null;
  telephone: T | null;
  ontologyTree: Ontology[];
  ontologyWords: Ontology[];
  accessibilitySentences: AccessibilitySentencesTypeFor<T>;
  connections: Array<{
    sectionType: string;
    name: T;
    phone: string;
    url: T | null;
  }>;
};

export type TranslatableVenueDetails = VenueDetails<TranslationsObject>;
export type TranslatedVenueDetails = VenueDetails<string>;

export type TprekUnitSource = {
  source: string;
  id: string;
};

export type TprekUnitOntologywordDetails = {
  id: number;
  // Some fields are likely missing from this type.
};

export type TprekUnitServiceDescriptions = {
  id: number;
  available_languages: string[];
};

export type TprekAccessibilitySentence = {
  sentence_group_name: string;
  sentence_group_fi?: string;
  sentence_group_sv?: string;
  sentence_group_en?: string;
  sentence_fi?: string;
  sentence_sv?: string;
  sentence_en?: string;
};

export type TprekUnitConnection = {
  section_type: string;
  name_fi: string;
  name_en: string;
  name_sv: string;
  phone: string;
  www_fi: string;
  www_en: string;
  www_sv: string;
};

// No clear type information was available so all of the fields are marked as
// optional besides the ID. Some may in fact be required.
export type TprekUnitWithoutNull = {
  id: number;
  org_id?: string;
  dept_id?: string;
  provider_type?: string;
  data_source_url?: string;
  name_fi: string;
  name_sv?: string;
  name_en?: string;
  desc_fi?: string;
  desc_sv?: string;
  desc_en?: string;
  short_desc_fi?: string;
  short_desc_sv?: string;
  short_desc_en?: string;
  displayed_service_owner_type: string;
  displayed_service_owner_fi?: string;
  displayed_service_owner_sv?: string;
  displayed_service_owner_en?: string;
  www_fi?: string;
  www_sv?: string;
  www_en?: string;
  ontologyword_ids?: number[];
  ontologytree_ids?: number[];
  sources?: TprekUnitSource[];
  latitude?: number;
  longitude?: number;
  northing_etrs_gk25?: number;
  easting_etrs_gk25?: number;
  northing_etrs_tm35fin?: number;
  easting_etrs_tm35fin?: number;
  manual_coordinates?: boolean;
  street_address_fi?: string;
  street_address_sv?: string;
  street_address_en?: string;
  address_zip?: string;
  address_city_fi?: string;
  address_city_sv?: string;
  address_city_en?: string;
  address_postal_full_fi?: string;
  address_postal_full_sv?: string;
  address_postal_full_en?: string;
  accessibility_viewpoints?: string;
  created_time: string;
  modified_time: string;
  connections: TprekUnitConnection[];
  ontologyword_details: TprekUnitOntologywordDetails[];
  service_descriptions: TprekUnitServiceDescriptions[];
  accessibility_sentences: TprekAccessibilitySentence[];
  email?: string;
  phone?: string;
  picture_url?: string;
};

export type TprekUnit = TprekUnitWithoutNull | null;

export type AccessibilitySentences = {
  groupName: string;
  sentences: string[];
};

export type AccessibilityTranslationsObject = {
  fi?: AccessibilitySentences[];
  en?: AccessibilitySentences[];
  sv?: AccessibilitySentences[];
};

export type TranslationsObject = {
  fi?: string;
  en?: string;
  sv?: string;
};
