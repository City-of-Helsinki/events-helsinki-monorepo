import type {
  EventListQuery,
  QueryEventListArgs,
  UnifiedSearchParameters,
  UnifiedSearchVenue,
} from 'events-helsinki-components';
import type { FormEvent } from 'react';
import type { Config } from 'react-helsinki-headless-cms';
import type { SearchRoute } from '../../../types';

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
