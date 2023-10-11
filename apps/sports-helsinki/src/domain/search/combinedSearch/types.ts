import type {
  EventListQuery,
  EventListQueryVariables,
  SearchListQueryVariables,
  UnifiedSearchVenue,
  KeysOfArrayFields,
} from '@events-helsinki/components';
import type { FormEvent } from 'react';
import type { Config } from 'react-helsinki-headless-cms';
import type { SearchRoute } from '../../../types';

export type SearchType = 'venue' | 'event' | 'course';

/**
 * Rename properties of a type with a given namespace.
 * For example, if the namespace is set to `'namespace'`,
 * a property called `field` in a type `Type`
 * would become `namespaceField`. Note the capitalized format.
 * */
type RenameKeyWithNamespace<Type, Namespace> = {
  [Property in keyof Type as `${string & Namespace}${Capitalize<
    string & Property
  >}`]: Type[Property];
};

/**
 * The properties that are cloned once per a search adapter and
 * they are prefixed with a given search related namespace.
 * For example the `orderBy` property could be cloned so
 * that there is a specific orderBy-field for every search adapter:
 * `venueOrderBy`, `eventOrderBy`, `courseOrderBy`, etc.
 * */
export type CombinedSearchAdapterInputPerAdapter = {
  orderBy?: string | null;
};

/** Rename properties, e.g `orderBy` becomes `venueOrderBy`, etc. */
type CombinedSearchAdapterInputForVenues = RenameKeyWithNamespace<
  CombinedSearchAdapterInputPerAdapter,
  'venue'
>;

/** Rename properties, e.g `orderBy` becomes `eventOrderBy`, etc. */
type CombinedSearchAdapterInputForEvents = RenameKeyWithNamespace<
  CombinedSearchAdapterInputPerAdapter,
  'event'
>;

/** Rename properties, e.g `orderBy` becomes `courseOrderBy`, etc. */
type CombinedSearchAdapterInputForCourses = RenameKeyWithNamespace<
  CombinedSearchAdapterInputPerAdapter,
  'course'
>;

/** All the input fields used by the combined search form adapter. */
export type CombinedSearchAdapterInput = {
  text: string | null;
  sportsCategories: string[];
  targetGroups: string[];
  organization?: string | null;
  helsinkiOnly?: boolean | string | null;
  place?: string | null;
  keywords: string[];
} & CombinedSearchAdapterInputForVenues &
  CombinedSearchAdapterInputForEvents &
  CombinedSearchAdapterInputForCourses;

export type CombinedSearchAdapterInputArrayFields =
  KeysOfArrayFields<CombinedSearchAdapterInput>;

export type CombinedSearchAdapterInputNonArrayFields = Exclude<
  keyof CombinedSearchAdapterInput,
  CombinedSearchAdapterInputArrayFields
>;

/**
 * List of backward compatibility fallback fields for combined search adapter
 * input fields.
 */
export const combinedSearchAdapterInputFallbacks = [
  'orderBy',
  'places',
  'publisher',
  'q',
  'sort',
] as const;

/** Backward compatibility fallback fields for combined search adapter input fields. */
export type CombinedSearchAdapterInputFallback =
  (typeof combinedSearchAdapterInputFallbacks)[number];

/** The fields that are used by the Event and Course search. */
export type EventSearchParams = Pick<
  EventListQueryVariables,
  | 'text'
  | 'allOngoingAnd'
  | 'allOngoing'
  | 'localOngoingAnd'
  | 'start'
  | 'end'
  | 'include'
  | 'keyword'
  | 'keywordAnd'
  | 'keywordNot'
  | 'keywordOrSet1'
  | 'keywordOrSet2'
  | 'keywordOrSet3'
  | 'location'
  | 'sort'
  | 'eventType'
  | 'superEventType'
  | 'superEvent'
  | 'publisher'
  | 'publisherAncestor'
  | 'page'
  | 'pageSize'
>;

/** The fields that are used by the Venue search. */
export type VenueSearchParams = Pick<
  SearchListQueryVariables,
  | 'includeHaukiFields'
  | 'language'
  | 'q'
  | 'ontologyTreeIds'
  | 'ontologyTreeIdsOrSet2'
  | 'ontologyWordIds'
  | 'providerTypes'
  | 'serviceOwnerTypes'
  | 'targetGroups'
  | 'administrativeDivisionIds'
  | 'openAt'
  | 'orderByName'
  | 'orderByDistance'
  | 'after'
  | 'first'
>;

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
