import type { EVENT_SEARCH_FILTERS } from '@events-helsinki/components';
import type React from 'react';

import type { EVENT_CATEGORIES } from './constants';

export interface CategoryOption {
  icon: React.ReactElement;
  text: string;
  value: EVENT_CATEGORIES;
}

export type SearchCategoryType = EVENT_CATEGORIES;

export interface SearchCategoryOption {
  icon: React.ReactElement;
  labelKey: string;
}

export type SearchCategoryRecord = Record<
  SearchCategoryType,
  SearchCategoryOption
>;

export interface Filters {
  [EVENT_SEARCH_FILTERS.CATEGORIES]: string[];
  [EVENT_SEARCH_FILTERS.DATE_TYPES]: string[];
  [EVENT_SEARCH_FILTERS.END]: Date | null;
  [EVENT_SEARCH_FILTERS.HELSINKI_ONLY]?: boolean;
  [EVENT_SEARCH_FILTERS.IS_FREE]?: boolean;
  [EVENT_SEARCH_FILTERS.KEYWORD]?: string[];
  [EVENT_SEARCH_FILTERS.KEYWORD_NOT]?: string[];
  [EVENT_SEARCH_FILTERS.TARGET_AGE_GROUP]?: string;
  [EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS]?: boolean;
  [EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS]?: boolean;
  [EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS]?: boolean;
  [EVENT_SEARCH_FILTERS.PLACES]: string[];
  [EVENT_SEARCH_FILTERS.PUBLISHER]?: string | null;
  [EVENT_SEARCH_FILTERS.START]: Date | null;
  [EVENT_SEARCH_FILTERS.TEXT]?: string[];
  [EVENT_SEARCH_FILTERS.ONGOING]: boolean;
}

export type MappedFilters = Partial<Omit<Filters, 'start' | 'end'>> & {
  [EVENT_SEARCH_FILTERS.START]?: string | null;
  [EVENT_SEARCH_FILTERS.END]?: string | null;
};
