import type {
  EventListQuery,
  QueryEventListArgs,
  UnifiedSearchParameters,
  UnifiedSearchVenue,
} from '@events-helsinki/components';
import type { FormEvent } from 'react';
import type { Config } from 'react-helsinki-headless-cms';
import type { SearchRoute } from '../../../types';

export type CombinedSearchAdapterInput = {
  text: string;
  orderBy: string;
  sportsCategories: string[];
  organization: string | null;
  keywords: string[];
};

export type EventSearchParams = {
  text: string;
  keywords: string[];
  sort: string;
};

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
