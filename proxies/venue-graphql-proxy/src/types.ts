import type { AppLanguage } from '@events-helsinki/graphql-proxy-server';
import type { Sources } from './contants/constants.js';
import type {
  Point,
  OpeningHour,
  ResourceState,
} from './types/__generated__.js';

export type Source = (typeof Sources)[keyof typeof Sources];
export type Locale = AppLanguage;

type VenueDetailsTextType = string | TranslationsObject; // 1 locale | 3 locales

export type TranslatableAccessibilitySentences = Record<
  Locale,
  Array<AccessibilitySentences>
>;
export type TranslatedAccessibilitySentences = Array<AccessibilitySentences>;

type AccessibilitySentencesTypeFor<T extends VenueDetailsTextType> =
  T extends TranslationsObject
    ? TranslatableAccessibilitySentences // 3 locales
    : T extends string
      ? TranslatedAccessibilitySentences // 1 locale
      : never;

export type OntologyIdLabel<T extends VenueDetailsTextType> = {
  id: number;
  label: T | null;
};

export type TranslatableOntologyIdLabel = OntologyIdLabel<TranslationsObject>;
export type TranslatedOntologyIdLabel = OntologyIdLabel<string>;

type VenueDetails<T extends VenueDetailsTextType> = {
  id: string;
  organizationId: string | null;
  organization: Department<T> | null;
  departmentId: string | null;
  department: Department<T> | null;
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
  telephone: string | null;
  openingHours: OpeningHour[] | null;
  isOpen: boolean | null;
  ontologyTree: OntologyIdLabel<T>[];
  ontologyWords: OntologyIdLabel<T>[];
  accessibilitySentences: AccessibilitySentencesTypeFor<T>;
  connections: Array<{
    sectionType: string;
    name: T | null;
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

export type TprekOntologyWord = {
  can_add_clarification: boolean;
  can_add_schoolyear: boolean;
  extra_searchwords_en?: string;
  extra_searchwords_fi?: string;
  extra_searchwords_sv?: string;
  id: number;
  ontologyword_en: string;
  ontologyword_fi: string;
  ontologyword_sv: string;
};

export type TprekOntologyVocabulary = TprekOntologyWord[];

export type TprekOntologyTreeNode = {
  child_ids: number[];
  extra_searchwords_en?: string;
  extra_searchwords_fi?: string;
  extra_searchwords_sv?: string;
  id: number;
  name_en: string;
  name_fi: string;
  name_sv: string;
  ontologyword_reference?: string;
  parent_id?: number;
};

export type TprekOntologyForest = TprekOntologyTreeNode[];

export type TprekDepartmentWithoutNull = {
  abbr_en?: string;
  abbr_fi?: string;
  abbr_sv?: string;
  address_city_en?: string;
  address_city_fi?: string;
  address_city_sv?: string;
  address_postal_full_en?: string;
  address_postal_full_fi?: string;
  address_postal_full_sv?: string;
  address_zip?: string;
  business_id?: string;
  email?: string;
  hierarchy_level?: number;
  id: string;
  municipality_code?: number;
  name_en?: string;
  name_fi?: string;
  name_sv?: string;
  oid?: string;
  org_id?: string;
  organization_type?: string;
  parent_id?: string;
  phone?: string;
  street_address_en?: string;
  street_address_fi?: string;
  street_address_sv?: string;
  www_en?: string;
  www_fi?: string;
  www_sv?: string;
};

export type TprekDepartment = TprekDepartmentWithoutNull | null;

export type Department<T extends VenueDetailsTextType> = {
  abbreviation: T | null;
  addressCity: T | null;
  addressPostalFull: T | null;
  addressZip: string | null;
  businessId: string | null;
  email: string | null;
  hierarchyLevel: number | null;
  id: string;
  municipalityCode: number | null;
  name: T | null;
  oid: string | null;
  organizationId: string | null;
  organizationType: string | null;
  parentId: string | null;
  phone: string | null;
  streetAddress: T | null;
  www: T | null;
};

export type TranslatableDepartment = Department<TranslationsObject>;
export type TranslatedDepartment = Department<string>;

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

export type TranslationsObject = {
  name(locale: AppLanguage, name: unknown): unknown;
  url(locale: AppLanguage, url: unknown): unknown;
  fi?: string;
  en?: string;
  sv?: string;
};

export type HaukiTimeElement = {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  end_time_on_next_day: boolean;
  resource_state: ResourceState;
  full_day: boolean;
  periods: number[];
};

export type HaukiOpeningHours = {
  date: string;
  times: HaukiTimeElement[];
};

export type HaukiIsOpen = {
  is_open: boolean;
};
