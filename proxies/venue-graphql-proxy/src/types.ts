import type { Sources } from './contants/constants';
import type { Ontology, Point } from './types/types';

export type Source = typeof Sources[keyof typeof Sources];

export type AnyObject = Record<string, unknown>;

export type Locale = 'fi' | 'sv' | 'en';

export type Context = {
  language?: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSources?: any;
};

export type VenueDetails<T = TranslationsObject> = {
  id: string;
  dataSource: string | null;
  email: string | null;
  postalCode: string;
  image: string | null;
  addressLocality: T | null;
  position: Point | null;
  description: T | null;
  name: T | null;
  infoUrl: T | null;
  streetAddress: T | null;
  telephone: T | null;
  ontologyTree: Ontology[];
  ontologyWords: Ontology[];
  accessibilitySentences:
    | AccessibilityTranslationsObject
    | AccessibilitySentences;
  connections: Array<{
    sectionType: string;
    name: T;
    phone: string;
    url: T | null;
  }>;
};

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

// No clear type information was available so all of the fields are marked as
// optional besides the ID. Some may in fact be required.
export type TprekUnit = {
  id: number;
  org_id?: string;
  dept_id?: string;
  provider_type?: string;
  data_source_url?: string;
  name_fi: string;
  name_sv?: string;
  name_en?: string;
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
  accessibility_viewpoints?: string;
  created_time: string;
  modified_time: string;
  connections: Array<{
    section_type: string;
    name_fi: string;
    name_en: string;
    name_sv: string;
    phone: string;
    www_fi: string;
    www_en: string;
    www_sv: string;
  }>;
  ontologyword_details: TprekUnitOntologywordDetails[];
  service_descriptions: TprekUnitServiceDescriptions[];
  accessibility_sentences: Array<unknown>;
  email?: string;
  phone?: string;
  picture_url?: string;
};

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

export type LoggerFunction = (
  message?: string,
  ...optionalParameters: unknown[]
) => void;

export type Logger = {
  debug: LoggerFunction;
  info: LoggerFunction;
  warn: LoggerFunction;
  error: LoggerFunction;
};

export type DataSources = {
  // TODO
};
