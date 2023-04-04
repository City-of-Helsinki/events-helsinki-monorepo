import type {
  EventFields,
  AppLanguage,
  Meta,
  QueryEventListArgs,
  EVENT_SORT_OPTIONS,
} from '@events-helsinki/components';
import {
  buildQueryFromObject,
  DATE_TYPES,
  formatDate,
  getUrlParamAsArray,
  EventTypeId,
  scrollToTop,
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
import type { EVENT_CATEGORIES } from './constants';
import {
  EVENT_SEARCH_FILTERS,
  eventCategories,
  MAPPED_PLACES,
  CATEGORY_CATALOG,
  MAPPED_EVENT_CATEGORIES,
  EVENT_DEFAULT_SEARCH_FILTERS,
} from './constants';
import type {
  CategoryOption,
  Filters,
  MappedFilters,
  SearchCategoryOption,
  SearchCategoryType,
} from './types';

export const sortExtendedCategoryOptions = (
  a: CategoryOption,
  b: CategoryOption
) => (a.text > b.text ? 1 : b.text > a.text ? -1 : 0);

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

export const getEventCategoryOptions = (
  t: TFunction,
  categories: EVENT_CATEGORIES[] = CATEGORY_CATALOG[EventTypeId.General].default
): CategoryOption[] =>
  categories.map((category) =>
    getCategoryOptions(category, eventCategories[category], t)
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
}: {
  include: string[];
  language?: AppLanguage;
  pageSize: number;
  params: URLSearchParams;
  sortOrder: EVENT_SORT_OPTIONS;
  superEventType: string[];
  place?: string;
  // eslint-disable-next-line sonarjs/cognitive-complexity
}): QueryEventListArgs => {
  const {
    categories,
    dateTypes,
    divisions,
    isFree,
    keyword,
    keywordNot,
    onlyChildrenEvents,
    onlyEveningEvents,
    onlyRemoteEvents,
    places,
    publisher,
    text,
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

  if (onlyChildrenEvents) {
    keywordAnd.push('yso:p4354');
  }

  const getMappedPropertyValues = (
    list: string[],
    map: Record<string, readonly string[]>
  ) =>
    list?.reduce<string[]>(
      (prev, val: string) => prev.concat(map[val] ?? []),
      []
    );

  const mappedCategories = getMappedPropertyValues(
    categories,
    MAPPED_EVENT_CATEGORIES
  );

  const hasLocation = !isEmpty(divisions) || !isEmpty(places);

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
  // const divisionParam = hasLocation && { division: divisions.sort() };

  return {
    ...getSearchParam(),
    // ...divisionParam,
    end,
    include,
    isFree: isFree || undefined,
    internetBased: onlyRemoteEvents || undefined,
    keywordOrSet2: [...(keyword ?? []), ...mappedCategories],
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
    dateTypes: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.DATE_TYPES
    ),
    divisions: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.DIVISIONS),
    end,
    isFree: searchParams.get(EVENT_SEARCH_FILTERS.IS_FREE) === 'true',
    keyword: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.KEYWORD),
    keywordNot: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.KEYWORD_NOT
    ),
    onlyChildrenEvents:
      searchParams.get(EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS) === 'true',
    onlyEveningEvents:
      searchParams.get(EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS) === 'true',
    onlyRemoteEvents:
      searchParams.get(EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS) === 'true',
    places: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.PLACES),
    publisher: searchParams.get(EVENT_SEARCH_FILTERS.PUBLISHER),
    start,
    text: freeText,
  };
};

export const getSearchQuery = (filters: Filters): string => {
  const newFilters: MappedFilters = {
    ...filters,
    end: formatDate(filters.end, 'yyyy-MM-dd'),
    isFree: filters.isFree ? true : undefined,
    onlyChildrenEvents: filters.onlyChildrenEvents ? true : undefined,
    onlyEveningEvents: filters.onlyEveningEvents ? true : undefined,
    onlyRemoteEvents: filters.onlyRemoteEvents ? true : undefined,
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
  Object.values(MAPPED_EVENT_CATEGORIES).flat();

/** Filter the kewords from the event that can be mapped as categories */
export const getEventCategories = (event: EventFields) => {
  const allHobbyTypes = getAllHobbyCategories();
  return event.keywords.filter(
    (keyword) => keyword.id && allHobbyTypes.includes(keyword.id)
  );
};

export const getEventUrl = (
  event: EventFields,
  router: NextRouter,
  locale: AppLanguage
): string => {
  return routerHelper.getLocalizedCmsItemUrl(
    ROUTES.EVENTS,
    {
      eventId: event.id,
      returnPath: routerHelper.getLocalizedCmsItemUrl(
        ROUTES.SEARCH,
        {
          ...router.query,
          eventId: event.id,
        },
        locale
      ),
    },
    locale
  );
};

export const getEventListLinkUrl = (
  event: EventFields,
  router: NextRouter,
  locale: AppLanguage
) => {
  const search = router.asPath.split('?')[1];
  return (
    routerHelper.getLocalizedCmsItemUrl(
      ROUTES.EVENTS,
      { eventId: event.id },
      locale
    ) + (search ? `?${search}` : '')
  );
};

export const getKeywordOnClickHandler =
  (
    router: NextRouter,
    locale: AppLanguage,
    type: 'dateType' | 'isFree' | 'text',
    value = ''
  ) =>
  () => {
    const search = getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      dateTypes: type === 'dateType' ? [value] : [],
      isFree: type === 'isFree',
      text: type === 'text' ? [value] : [],
    });

    router.push(`${routerHelper.getI18nPath(ROUTES.SEARCH, locale)}${search}`);
    scrollToTop();
  };
