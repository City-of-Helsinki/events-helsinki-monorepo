import type { Season, SPORTS_CATEGORIES } from '@events-helsinki/components';
import type React from 'react';

import type { COURSE_CATEGORIES, EVENT_SEARCH_FILTERS } from './constants';

export interface CategoryOption {
  icon: React.ReactElement;
  text: string;
  value: COURSE_CATEGORIES | SPORTS_CATEGORIES;
  seasons?: Season[];
}

export type SearchCategoryType = COURSE_CATEGORIES | SPORTS_CATEGORIES;

export interface SearchCategoryOption {
  icon: React.ReactElement;
  labelKey: string;
  seasons?: Season[];
  keywords: string[];
}

export type SearchCategoryRecord = Record<
  SearchCategoryType,
  SearchCategoryOption
>;

export interface Filters {
  [EVENT_SEARCH_FILTERS.DATE_TYPES]: string[];
  [EVENT_SEARCH_FILTERS.SPORTS_CATEGORIES]: string[];
  [EVENT_SEARCH_FILTERS.END]: Date | null;
  [EVENT_SEARCH_FILTERS.IS_FREE]?: boolean;
  [EVENT_SEARCH_FILTERS.KEYWORD]?: string[];
  [EVENT_SEARCH_FILTERS.KEYWORD_NOT]?: string[];
  [EVENT_SEARCH_FILTERS.PLACES]: string[];
  [EVENT_SEARCH_FILTERS.PUBLISHER]?: string | null;
  [EVENT_SEARCH_FILTERS.START]: Date | null;
  [EVENT_SEARCH_FILTERS.EVENT_TYPE]: string[];
  q?: string[];
  orderBy?: string | null;
  orderDir?: string | null;
  sort?: string | null;
}

export type MappedFilters = Partial<Omit<Filters, 'start' | 'end'>> & {
  [EVENT_SEARCH_FILTERS.START]?: string | null;
  [EVENT_SEARCH_FILTERS.END]?: string | null;
};
