import {
  buildQueryFromObject,
  DATE_TYPES,
  formatDate,
  getUrlParamAsArray,
  EventTypeId,
  scrollToTop,
  EVENT_SEARCH_FILTERS,
  CITY_OF_HELSINKI_LINKED_EVENTS_ORGANIZATION_ID,
} from '@events-helsinki/components';
import type {
  FilterType,
  AppLanguage,
  Meta,
  QueryEventListArgs,
  EventFields,
  EVENT_SORT_OPTIONS,
  KeywordOnClickHandlerType,
  Venue,
} from '@events-helsinki/components';
import {
  addDays,
  endOfWeek,
  isPast,
  isToday,
  startOfWeek,
  subDays,
} from 'date-fns';
import isEmpty from 'lodash/isEmpty';
import type { NextRouter } from 'next/router';
import type { TFunction } from 'next-i18next';

import { ROUTES } from '../../../constants';
import AppConfig from '../../app/AppConfig';
import routerHelper from '../../app/routerHelper';
import type { COURSE_CATEGORIES, COURSE_HOBBY_TYPES } from './constants';
import {
  COURSE_DEFAULT_SEARCH_FILTERS,
  courseCategories,
  MAPPED_PLACES,
  CATEGORY_CATALOG,
  MAPPED_COURSE_CATEGORIES,
  courseHobbyTypes,
  MAPPED_COURSE_HOBBY_TYPES,
} from './constants';
import type {
  CategoryOption,
  Filters,
  HobbyTypeOption,
  MappedFilters,
  SearchCategoryOption,
  SearchCategoryType,
  SearchHobbyType,
  SearchHobbyTypeOption,
} from './types';

export const MIN_AGE = 0;
export const MAX_AGE = 99;

export const sortExtendedCategoryOptions = (
  a: CategoryOption,
  b: CategoryOption
) => a.text.localeCompare(b.text);

export const getCategoryOptions = (
  category: SearchCategoryType,
  categoryOption: SearchCategoryOption,
  t: TFunction
): CategoryOption => {
  const { icon, labelKey } = categoryOption;
  return {
    icon,
    text: t(labelKey),
    value: category,
  };
};

export const sortExtendedHobbyTypeOptions = (
  a: HobbyTypeOption,
  b: HobbyTypeOption
) => a.text.localeCompare(b.text);

export const getHobbyTypeOptions = (
  hobbyType: SearchHobbyType,
  hobbyTypeOption: SearchHobbyTypeOption,
  t: TFunction
): HobbyTypeOption => {
  const { icon, labelKey } = hobbyTypeOption;
  return {
    icon,
    text: t(labelKey),
    value: hobbyType,
  };
};

export const getEventCategoryOptions = (
  t: TFunction,
  categories: COURSE_CATEGORIES[] = CATEGORY_CATALOG[EventTypeId.Course].default
): CategoryOption[] =>
  categories
    .map((category) =>
      getCategoryOptions(category, courseCategories[category], t)
    )
    .sort(sortExtendedCategoryOptions);

export const getCourseHobbyTypeOptions = (
  t: TFunction,
  hobbytTypes: COURSE_HOBBY_TYPES[] = CATEGORY_CATALOG.hobbyTypes.default
): HobbyTypeOption[] =>
  hobbytTypes
    .map((hobbyType) =>
      getHobbyTypeOptions(hobbyType, courseHobbyTypes[hobbyType], t)
    )
    .sort(sortExtendedHobbyTypeOptions);

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
    start = start || formatDate(addDays(today, 1), dateFormat);
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

export const getEventSearchVariables = ({
  include,
  language,
  pageSize,
  params,
  sortOrder,
  superEventType,
  superEvent,
  place,
  division,
}: {
  include: string[];
  language?: AppLanguage;
  pageSize: number;
  params: URLSearchParams;
  sortOrder: EVENT_SORT_OPTIONS;
  superEventType?: string[];
  superEvent?: string;
  place?: string;
  division?: string[];
}): QueryEventListArgs => {
  const {
    categories,
    hobbyTypes,
    dateTypes,
    helsinkiOnly,
    isFree,
    keyword,
    keywordNot,
    onlyChildrenEvents,
    onlyEveningEvents,
    // onlyRemoteEvents,
    places,
    publisher,
    [EVENT_SEARCH_FILTERS.TEXT]: text,
    audienceMinAgeLt,
    audienceMaxAgeGt,
  } = getSearchFilters(params);
  const pathPlace = place && MAPPED_PLACES[place.toLowerCase()];

  if (pathPlace) {
    places.push(pathPlace);
  }
  const startsAfter = onlyEveningEvents ? '16' : undefined;
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

  const publisherAncestor = helsinkiOnly
    ? CITY_OF_HELSINKI_LINKED_EVENTS_ORGANIZATION_ID
    : null;

  if (onlyChildrenEvents) {
    keywordAnd.push('yso:p4354');
  }

  const getMappedPropertyValues = (
    list: string[],
    map: Record<string, string[]>
  ) =>
    list?.reduce<string[]>(
      (prev, val: string) => prev.concat(map[val] ?? []),
      []
    );

  const mappedCategories = getMappedPropertyValues(
    categories,
    MAPPED_COURSE_CATEGORIES
  );
  const mappedHobbyTypes = getMappedPropertyValues(
    hobbyTypes,
    MAPPED_COURSE_HOBBY_TYPES
  );

  return {
    [EVENT_SEARCH_FILTERS.TEXT]: !isEmpty(text) ? text?.join(',') : undefined, // NOTE: only *OngoingAnd supports Array.
    [EVENT_SEARCH_FILTERS.ONGOING]: true,
    [EVENT_SEARCH_FILTERS.DIVISIONS]: division,
    end,
    include,
    publisherAncestor,
    isFree: isFree || undefined,
    // internetBased: onlyRemoteEvents || undefined,
    keywordOrSet2: [...(keyword ?? []), ...mappedCategories],
    keywordOrSet3: [...(keyword ?? []), ...mappedHobbyTypes],
    keywordAnd,
    keywordNot,
    language,
    location: places.sort(),
    pageSize,
    publisher,
    sort: sortOrder,
    start,
    startsAfter,
    superEventType,
    superEvent,
    suitableFor: [Number(audienceMinAgeLt), Number(audienceMaxAgeGt)].filter(
      (v) => v
    ),
    audienceMinAgeLt,
    audienceMaxAgeGt,
    eventType: AppConfig.supportedEventTypes,
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
    categories: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.CATEGORIES
    ),
    hobbyTypes: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.HOBBY_TYPES
    ),
    dateTypes: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.DATE_TYPES
    ),
    end,
    helsinkiOnly:
      searchParams.get(EVENT_SEARCH_FILTERS.HELSINKI_ONLY) === 'true',
    isFree: searchParams.get(EVENT_SEARCH_FILTERS.IS_FREE) === 'true',
    keyword: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.KEYWORD),
    keywordNot: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.KEYWORD_NOT
    ),
    // onlyChildrenEvents:
    //   searchParams.get(EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS) === 'true',
    // onlyEveningEvents:
    //   searchParams.get(EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS) === 'true',
    // onlyRemoteEvents:
    //   searchParams.get(EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS) === 'true',
    places: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.PLACES),
    publisher: searchParams.get(EVENT_SEARCH_FILTERS.PUBLISHER),
    start,
    [EVENT_SEARCH_FILTERS.TEXT]: freeText,
    [EVENT_SEARCH_FILTERS.ONGOING]: true,
    suitableFor: normalizeSuitableFor(
      getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.SUITABLE, false)
    ),
    audienceMinAgeLt: searchParams.get(EVENT_SEARCH_FILTERS.MIN_AGE) || '',
    audienceMaxAgeGt: searchParams.get(EVENT_SEARCH_FILTERS.MAX_AGE) || '',
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

export const getSearchQuery = (
  filters: Omit<Filters, EVENT_SEARCH_FILTERS.ONGOING>
): string => {
  const newFilters: MappedFilters = {
    ...filters,
    [EVENT_SEARCH_FILTERS.END]: formatDate(filters.end, 'yyyy-MM-dd'),
    [EVENT_SEARCH_FILTERS.IS_FREE]: filters.isFree ? true : undefined,
    [EVENT_SEARCH_FILTERS.HELSINKI_ONLY]: filters.helsinkiOnly
      ? true
      : undefined,
    [EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS]: filters.onlyChildrenEvents
      ? true
      : undefined,
    [EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS]: filters.onlyEveningEvents
      ? true
      : undefined,
    [EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS]: filters.onlyRemoteEvents
      ? true
      : undefined,
    [EVENT_SEARCH_FILTERS.START]: formatDate(filters.start, 'yyyy-MM-dd'),
  };

  if (newFilters.end || newFilters.start) {
    delete newFilters.dateTypes;
  }

  if (
    newFilters[EVENT_SEARCH_FILTERS.TEXT]?.length &&
    !newFilters[EVENT_SEARCH_FILTERS.TEXT][0]
  ) {
    delete newFilters[EVENT_SEARCH_FILTERS.TEXT];
  }

  // ONGOING is hard coded to be always `true`, so it won't be needed in URL.
  if (newFilters[EVENT_SEARCH_FILTERS.ONGOING]) {
    delete newFilters[EVENT_SEARCH_FILTERS.ONGOING];
  }

  return buildQueryFromObject(newFilters);
};

/** Get a list of all the keywords that can be mapped as a category */
export const getAllHobbyCategories = () =>
  Object.values(MAPPED_COURSE_CATEGORIES).flat();

/** Filter the kewords from the event that can be mapped as categories */
export const getEventCategories = (event: EventFields) => {
  const allHobbyTypes = getAllHobbyCategories();
  return (
    event.keywords?.filter(
      (keyword) => keyword.id && allHobbyTypes.includes(keyword.id)
    ) ?? []
  );
};

export const getEventSearchReturnPath = (
  event: EventFields,
  router: NextRouter,
  locale: AppLanguage
): string => {
  return routerHelper.getLocalizedCmsItemUrl(
    ROUTES.SEARCH,
    {
      ...router.query,
      eventId: event.id,
    },
    locale
  );
};

export const getEventUrl = (
  event: EventFields,
  router: NextRouter,
  locale: AppLanguage
): string => {
  return routerHelper.getLocalizedCmsItemUrl(
    ROUTES.COURSES,
    {
      eventId: event.id,
      returnPath: getEventSearchReturnPath(event, router, locale),
    },
    locale
  );
};

export const getPlainEventUrl = (
  event: EventFields,
  locale: AppLanguage
): string => {
  return routerHelper.getLocalizedCmsItemUrl(
    ROUTES.COURSES,
    { eventId: event.id },
    locale
  );
};

export const getOrganizationSearchUrl = (
  event: EventFields,
  _router: NextRouter,
  locale: AppLanguage
): string => {
  return routerHelper.getLocalizedCmsItemUrl(
    ROUTES.SEARCH,
    { [EVENT_SEARCH_FILTERS.PUBLISHER]: event.publisher ?? '' },
    locale
  );
};

export const getHelsinkiOnlySearchUrl = (
  _source: EventFields | Venue,
  _router: NextRouter,
  locale: AppLanguage
): string => {
  return routerHelper.getLocalizedCmsItemUrl(
    ROUTES.SEARCH,
    { [EVENT_SEARCH_FILTERS.HELSINKI_ONLY]: 'true' },
    locale
  );
};

export const getCardUrl = (
  event: EventFields,
  locale: AppLanguage,
  _returnPath?: string
): string => getPlainEventUrl(event, locale);

export const getEventListLinkUrl = (
  event: EventFields,
  router: NextRouter,
  locale: AppLanguage
) => {
  const search = router.asPath.split('?')[1];
  return getPlainEventUrl(event, locale) + (search ? `?${search}` : '');
};

export const getKeywordOnClickHandler: KeywordOnClickHandlerType =
  (
    router: NextRouter,
    locale: AppLanguage,
    type: 'dateType' | 'isFree' | 'text',
    value = ''
  ) =>
  () => {
    const search = getSearchQuery({
      ...COURSE_DEFAULT_SEARCH_FILTERS,
      [EVENT_SEARCH_FILTERS.DATE_TYPES]: type === 'dateType' ? [value] : [],
      [EVENT_SEARCH_FILTERS.IS_FREE]: type === 'isFree',
      [EVENT_SEARCH_FILTERS.TEXT]: type === 'text' ? [value] : [],
    });

    router.push(`${routerHelper.getI18nPath(ROUTES.SEARCH, locale)}${search}`);
    scrollToTop();
  };
