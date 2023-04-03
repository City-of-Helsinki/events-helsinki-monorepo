import type {
  EventListQuery,
  QueryEventListArgs,
  UnifiedSearchParameters,
  UnifiedSearchVenue,
} from '@events-helsinki/components';
import type { FormEvent } from 'react';
import type { Config } from 'react-helsinki-headless-cms';
import type { SearchRoute } from '../../../types';

/**
 * The EventSearchParams fields.
 * NOTE: not needed when the TS has Exact types (https://github.com/microsoft/TypeScript/issues/12936) or similar.
 * These are needed only until the types properties can be generated as a string list.
 */
export const eventSearchParamsFields = <const>['text', 'keywords', 'sort'];
/**
 * A field for EventSearchParams.
 * NOTE: not needed when the TS has Exact types (https://github.com/microsoft/TypeScript/issues/12936) or similar.
 * These are needed only until the types properties can be generated as a string list.
 */
export type EventSearchParamsField = (typeof eventSearchParamsFields)[number];
export type EventSearchParams = {
  text: string;
  keywords: string[];
  sort: string;
};

/**
 * The VenueSearchParams fields.
 * NOTE: not needed when the TS has Exact types (https://github.com/microsoft/TypeScript/issues/12936) or similar.
 * These are needed only until the types properties can be generated as a string list.
 */
export const venueSearchParamsFields = <const>['q', 'ontologyWords', 'orderBy'];
/**
 * A field for VenueSearchParams.
 * NOTE: not needed when the TS has Exact types (https://github.com/microsoft/TypeScript/issues/12936) or similar.
 * These are needed only until the types properties can be generated as a string list.
 */
export type VenueSearchParamsField = (typeof venueSearchParamsFields)[number];
export type VenueSearchParams = {
  q: string;
  ontologyWords: string[];
  orderBy: string;
};

export type CombinedSearchAdapterOutput = EventSearchParams | VenueSearchParams;

export type CombinedSearchAdapter<
  TCombinedSearchAdapterOutput extends CombinedSearchAdapterOutput
> = {
  getQueryVariables: () => TCombinedSearchAdapterOutput;
} & TCombinedSearchAdapterOutput;

/**
 * The CombinedSearchAdapterInput fields.
 * NOTE: not needed when the TS has Exact types (https://github.com/microsoft/TypeScript/issues/12936) or similar.
 * These are needed only until the types properties can be generated as a string list.
 */
export const combinedSearchAdapterInputFields = <const>[
  'text',
  'orderBy',
  'sportsCategories',
  'organization',
  'keywords',
];
/**
 * A field for CombinedSearchAdapterInput
 * NOTE: not needed when the TS has Exact types (https://github.com/microsoft/TypeScript/issues/12936) or similar.
 * These are needed only until the types properties can be generated as a string list.
 */
export type CombinedSearchAdapterInputField =
  (typeof combinedSearchAdapterInputFields)[number];
export type CombinedSearchAdapterInput = {
  text: string;
  orderBy: string;
  sportsCategories: string[];
  organization: string | null;
  keywords: string[];
};

/**
 * Clean the given input value so that it can be used in the search.
 * Same idea as in Django forms: https://docs.djangoproject.com/en/4.2/ref/forms/validation/#form-and-field-validation
 * */
export type InputFieldValueCleaner<T> = {
  [Property in keyof T as `clean${Capitalize<string & Property>}`]: () => void;
} & { clean: () => void };

/**
 * An interface that helps the search forms
 * to implement similar features.
 * */
export interface SearchForm {
  searchParams: URLSearchParams;
  searchFilters: object;
  goToSearch: (search: string) => void;
  moveToSearchPage: () => void;
  clearInputValues: () => void;
  clearFilters: () => void;
  handleSubmit: (event?: FormEvent) => void;
  updateFilters: () => void;
  scrollToResultList?: () => void;
}

export interface SearchPage {
  resultList?: EventListQuery['eventList'] | UnifiedSearchVenue[];
  searchFilters: QueryEventListArgs | UnifiedSearchParameters;
  meta?: Config['meta'];
  isSmallScreen: boolean;
  isLoading: boolean;
  isFetchingMore: boolean;
  count: number;
  hasNext: boolean;
  handleLoadMore: () => Promise<void>;
  scrollToResultList: () => void;
  scrollToResultCard: (id: string) => void;
  initialPageOnLoad: () => void;
}

export type SearchComponentType = {
  scrollToResultList: () => void;
  'data-testid'?: string;
  showTitle?: boolean;
  searchRoute?: SearchRoute; // TODO: Allow only SEARCH_ROUTE values
};
