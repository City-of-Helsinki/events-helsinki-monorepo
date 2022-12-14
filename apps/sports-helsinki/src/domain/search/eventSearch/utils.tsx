import {
  addDays,
  endOfWeek,
  isPast,
  isToday,
  startOfWeek,
  subDays,
} from 'date-fns';
import {
  buildQueryFromObject,
  DATE_TYPES,
  formatDate,
  getUrlParamAsArray,
} from 'events-helsinki-components';
import type {
  FilterType,
  AppLanguage,
  Meta,
  QueryEventListArgs,
  EventFields,
  EventTypeId,
} from 'events-helsinki-components';
import isEmpty from 'lodash/isEmpty';
import type { TFunction } from 'next-i18next';
import type { EVENT_SORT_OPTIONS, SPORTS_CATEGORIES } from './constants';
import {
  CATEGORY_CATALOG,
  EVENT_SEARCH_FILTERS,
  MAPPED_PLACES,
  MAPPED_COURSE_CATEGORIES,
  sportsCategoryData,
} from './constants';
import type {
  CategoryOption,
  Filters,
  MappedFilters,
  SearchCategoryOption,
  SearchCategoryType,
} from './types';

export const MIN_AGE = 0;
export const MAX_AGE = 99;

export const sortExtendedCategoryOptions = (
  a: CategoryOption,
  b: CategoryOption
) => (a.text > b.text ? 1 : b.text > a.text ? -1 : 0);

export const getCategoryOptions = (
  category: SearchCategoryType,
  categoryOption: SearchCategoryOption,
  t: TFunction
): CategoryOption => {
  const { icon, labelKey, seasons } = categoryOption;
  return {
    icon,
    text: t(labelKey),
    value: category,
    seasons,
  };
};

export const getSportsCategoryOptions = (
  t: TFunction,
  sportsCategories: SPORTS_CATEGORIES[] = CATEGORY_CATALOG.sportsCategories
    .default
): CategoryOption[] =>
  sportsCategories.map((sportsCategory) =>
    getCategoryOptions(sportsCategory, sportsCategoryData[sportsCategory], t)
  );

/**
 * Get start and end dates to event list filtering
 * @param dayTypes
 * @param startTime
 * @param endTime
 * @return {object}
 */
const getFilterDates = ({
  dateTypes,
  startTime,
  endTime,
}: {
  dateTypes: string[];
  startTime: string | null;
  endTime: string | null;
}) => {
  const dateFormat = 'yyyy-MM-dd';

  if (startTime || endTime) {
    return { end: endTime, start: startTime };
  }

  const today = new Date();
  const sunday = endOfWeek(today, { weekStartsOn: 1 });
  const saturday = formatDate(subDays(sunday, 1), dateFormat);
  const monday = startOfWeek(today, { weekStartsOn: 1 });

  let end = '';
  let start = '';

  if (dateTypes.includes(DATE_TYPES.TODAY)) {
    end = formatDate(today, dateFormat);
    start = formatDate(today, dateFormat);
  }

  if (dateTypes.includes(DATE_TYPES.TOMORROW)) {
    end = formatDate(addDays(today, 1), dateFormat);
    start = start ? start : formatDate(addDays(today, 1), dateFormat);
  }

  if (dateTypes.includes(DATE_TYPES.WEEKEND)) {
    end = formatDate(sunday, dateFormat);
    start = start && start < saturday ? start : saturday;
  }

  if (dateTypes.includes(DATE_TYPES.THIS_WEEK)) {
    end = formatDate(sunday, dateFormat);
    start = formatDate(monday, dateFormat);
  }

  return { end, start };
};

/**
 * Get event list request filters from url parameters
 * @param {object} filterOptions
 * @return {object}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getEventSearchVariables = ({
  include,
  language,
  pageSize,
  params,
  sortOrder,
  superEventType,
  place,
  eventType,
}: {
  include: string[];
  language?: AppLanguage;
  pageSize: number;
  params: URLSearchParams;
  sortOrder: EVENT_SORT_OPTIONS;
  superEventType: string[];
  place?: string;
  eventType?: (EventTypeId.Course | EventTypeId.General)[];
  // eslint-disable-next-line sonarjs/cognitive-complexity
}): QueryEventListArgs => {
  const { keyword, keywordNot, places, publisher, text, dateTypes, isFree } =
    getSearchFilters(params);
  const pathPlace = place && MAPPED_PLACES[place.toLowerCase()];

  if (pathPlace) {
    places.push(pathPlace);
  }

  let { start, end } = getFilterDates({
    dateTypes,
    endTime: params.get(EVENT_SEARCH_FILTERS.END),
    startTime: params.get(EVENT_SEARCH_FILTERS.START),
  });

  if (!start || isToday(new Date(start)) || isPast(new Date(start))) {
    start = 'now';
  }

  if (end && (isToday(new Date(end)) || isPast(new Date(end)))) {
    end = 'today';
  }

  const keywordAnd: string[] = [];

  const hasLocation = !isEmpty(places);

  const getSearchParam = () => {
    const hasText = !isEmpty(text);
    if (hasText && hasLocation) {
      // show helsinki events matching to text
      return { localOngoingAnd: text };
    } else if (hasText) {
      // show internet and helsinki events matching to text
      return { allOngoingAnd: text };
    } else {
      // show all internet and helsinki events
      return { allOngoing: true };
    }
  };

  return {
    ...getSearchParam(),
    isFree: isFree || undefined,
    end,
    include,
    keywordOrSet2: [...(keyword ?? [])],
    keywordAnd,
    keywordNot,
    language,
    location: places.sort(),
    pageSize,
    publisher,
    sort: sortOrder,
    start,
    superEventType,
    eventType,
  };
};

/**
 * Get next page number from linkedevents response meta field
 * @param meta
 * @return {number}
 */
export const getNextPage = (meta: Meta): number | null => {
  if (!meta.next) return null;

  const urlParts = meta.next.split('?');
  const searchParams = new URLSearchParams(decodeURIComponent(urlParts[1]));
  const page = searchParams.get(EVENT_SEARCH_FILTERS.PAGE);
  return page ? Number(page) : null;
};

// /**
//  * Get next page number from linkedevents response meta field
//  * @param meta
//  * @return {number}
//  */
// export const getNextPage = (meta: Meta): number | null => {
//   if (!meta.next) return null;

//   const urlParts = meta.next.split("?");
//   const searchParams = new URLSearchParams(decodeURIComponent(urlParts[1]));
//   const page = searchParams.get(EVENT_SEARCH_FILTERS.PAGE);
//   return page ? Number(page) : null;
// };

export const getSearchFilters = (searchParams: URLSearchParams): Filters => {
  const endTime = searchParams.get(EVENT_SEARCH_FILTERS.END);
  const end = endTime ? new Date(endTime) : null;

  const startTime = searchParams.get(EVENT_SEARCH_FILTERS.START);
  const start = startTime ? new Date(startTime) : null;

  const freeText: string[] = [];
  if (searchParams.get(EVENT_SEARCH_FILTERS.TEXT)) {
    freeText.push(
      searchParams.get(EVENT_SEARCH_FILTERS.TEXT)?.toString() || ''
    );
  }

  return {
    dateTypes: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.DATE_TYPES
    ),
    end,
    isFree: searchParams.get(EVENT_SEARCH_FILTERS.IS_FREE) === 'true',
    keyword: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.KEYWORD),
    keywordNot: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.KEYWORD_NOT
    ),
    places: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.PLACES),
    publisher: searchParams.get(EVENT_SEARCH_FILTERS.PUBLISHER),
    start,
    text: freeText,
    eventType: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.EVENT_TYPE
    ),
  };
};

export const normalizeSuitableFor = (values: (number | string)[]): number[] => {
  if (!values?.length) return [];

  const [minAge, maxAge] = values.map((value) => {
    const parsed = parseInt(value.toString());
    return isNaN(parsed) ? null : parsed;
  });

  // If no range is given, return an empty list.
  if (minAge == null && maxAge == null) {
    return [];
  }

  // Sort should be done last, so the right number is full filled with a default.
  return [minAge ?? MIN_AGE, maxAge ?? MAX_AGE].sort((a, b) => a - b);
};

export const getSuitableForFilterValue = (
  initValue: number[] | undefined,
  type: FilterType
) => {
  if (['minAge', 'maxAge', 'exactAge'].includes(type)) return undefined;
  return initValue;
};

export const getSearchQuery = (filters: Filters): string => {
  const newFilters: MappedFilters = {
    ...filters,
    end: formatDate(filters.end, 'yyyy-MM-dd'),
    isFree: filters.isFree ? true : undefined,
    start: formatDate(filters.start, 'yyyy-MM-dd'),
  };

  if (newFilters.end || newFilters.start) {
    delete newFilters.dateTypes;
  }

  if (newFilters.text?.length && !newFilters.text[0]) {
    delete newFilters.text;
  }

  return buildQueryFromObject(newFilters);
};

/** Get a list of all the keywords that can be mapped as a category */
export const getAllHobbyCategories = () =>
  Object.values(MAPPED_COURSE_CATEGORIES).flat();

/** Filter the kewords from the event that can be mapped as categories */
export const getEventCategories = (event: EventFields) => {
  const allHobbyTypes = getAllHobbyCategories();
  return event.keywords.filter(
    (keyword) => keyword.id && allHobbyTypes.includes(keyword.id)
  );
};
