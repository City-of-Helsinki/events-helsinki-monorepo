import type {
  EventFields,
  AppLanguage,
  Meta,
  QueryEventListArgs,
  EVENT_SORT_OPTIONS,
  KeywordOnClickHandlerType,
  Venue,
} from '@events-helsinki/components';
import {
  buildQueryFromObject,
  DATE_TYPES,
  formatDate,
  getUrlParamAsArray,
  EventTypeId,
  scrollToTop,
  CITY_OF_HELSINKI_LINKED_EVENTS_ORGANIZATION_ID,
  EVENT_SEARCH_FILTERS,
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

import type { AgeGroup } from '../../../constants';
import {
  AGE_GROUP_KEYWORDS,
  EVENT_SEARCH_ADULT_KEYWORD_EXCLUSIONS,
  ROUTES,
  TARGET_GROUP_AGE_GROUPS_IN_ORDER,
} from '../../../constants';
import AppConfig from '../../app/AppConfig';
import routerHelper from '../../app/routerHelper';
import type { EVENT_CATEGORIES } from './constants';
import {
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
 * Generates keyword filters for a given target age group.
 *
 * @returns An object containing the updated `keywordOrSet3` and `keywordNot` arrays.
 */
const _getTargetAgeGroupSearchVariables = ({
  targetAgeGroup,
  keywordOrSet3 = [],
  keywordNot = [],
}: {
  targetAgeGroup: AgeGroup | string | undefined;
  keywordOrSet3?: string[];
  keywordNot?: string[];
}) => {
  // If targetAgeGroup is not a valid option, there is nothing to convert or handle.
  if (!isTargetAgeGroup(targetAgeGroup)) {
    return { keywordOrSet3, keywordNot };
  }

  if (targetAgeGroup === 'adults') {
    // For adults, add all exclusion keywords to the 'keywordNot' list.
    return {
      keywordOrSet3,
      keywordNot: [...keywordNot, ...EVENT_SEARCH_ADULT_KEYWORD_EXCLUSIONS],
    };
  }
  // For all other age groups, add the specific keywords to the 'keywordOrSet3' list.
  return {
    keywordOrSet3: [...keywordOrSet3, ...AGE_GROUP_KEYWORDS[targetAgeGroup]],
    keywordNot,
  };
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
    dateTypes,
    helsinkiOnly,
    isFree,
    keyword,
    keywordNot: keywordNotParams,
    onlyChildrenEvents,
    onlyEveningEvents,
    onlyRemoteEvents,
    places,
    publisher,
    [EVENT_SEARCH_FILTERS.TEXT]: text,
    [EVENT_SEARCH_FILTERS.TARGET_AGE_GROUP]: targetAgeGroup,
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

  const { keywordOrSet3, keywordNot } = _getTargetAgeGroupSearchVariables({
    targetAgeGroup,
    keywordOrSet3: [],
    keywordNot: keywordNotParams,
  });

  return {
    [EVENT_SEARCH_FILTERS.TEXT]: !isEmpty(text) ? text?.join(',') : undefined, // NOTE: only *OngoingAnd supports Array.
    [EVENT_SEARCH_FILTERS.ONGOING]: true,
    [EVENT_SEARCH_FILTERS.DIVISIONS]: division,
    end,
    include,
    publisherAncestor,
    isFree: isFree || undefined,
    internetBased: onlyRemoteEvents || undefined,
    keywordOrSet2: [...(keyword ?? []), ...mappedCategories],
    keywordOrSet3,
    keywordAnd,
    keywordNot,
    language,
    location: places.sort((a, b) => a.localeCompare(b)),
    pageSize,
    publisher,
    sort: sortOrder,
    start,
    startsAfter,
    superEventType,
    superEvent,
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
    end,
    helsinkiOnly:
      searchParams.get(EVENT_SEARCH_FILTERS.HELSINKI_ONLY) === 'true',
    isFree: searchParams.get(EVENT_SEARCH_FILTERS.IS_FREE) === 'true',
    keyword: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.KEYWORD),
    keywordNot: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.KEYWORD_NOT
    ),
    [EVENT_SEARCH_FILTERS.TARGET_AGE_GROUP]:
      searchParams.get(EVENT_SEARCH_FILTERS.TARGET_AGE_GROUP) ?? '',
    onlyChildrenEvents:
      searchParams.get(EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS) === 'true',
    onlyEveningEvents:
      searchParams.get(EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS) === 'true',
    onlyRemoteEvents:
      searchParams.get(EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS) === 'true',
    places: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.PLACES),
    publisher: searchParams.get(EVENT_SEARCH_FILTERS.PUBLISHER),
    start,
    [EVENT_SEARCH_FILTERS.TEXT]: freeText,
    [EVENT_SEARCH_FILTERS.ONGOING]: true,
  };
};

export const getSearchQuery = (
  filters: Omit<Filters, EVENT_SEARCH_FILTERS.ONGOING>
): string => {
  const newFilters: MappedFilters = {
    ...filters,
    end: formatDate(filters.end, 'yyyy-MM-dd'),
    isFree: filters.isFree ? true : undefined,
    helsinkiOnly: filters.helsinkiOnly ? true : undefined,
    onlyChildrenEvents: filters.onlyChildrenEvents ? true : undefined,
    onlyEveningEvents: filters.onlyEveningEvents ? true : undefined,
    onlyRemoteEvents: filters.onlyRemoteEvents ? true : undefined,
    start: formatDate(filters.start, 'yyyy-MM-dd'),
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
  Object.values(MAPPED_EVENT_CATEGORIES).flat();

/** Filter the kewords from the event that can be mapped as categories */
export const getEventCategories = (event: EventFields) => {
  const allHobbyTypes = getAllHobbyCategories();
  return event.keywords.filter(
    (keyword) => keyword.id && allHobbyTypes.includes(keyword.id)
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
    ROUTES.EVENTS,
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
    ROUTES.EVENTS,
    { eventId: event.id },
    locale
  );
};

export const getCardUrl = (
  event: EventFields,
  locale: AppLanguage,
  _returnPath?: string
): string => getPlainEventUrl(event, locale);

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
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      [EVENT_SEARCH_FILTERS.DATE_TYPES]: type === 'dateType' ? [value] : [],
      [EVENT_SEARCH_FILTERS.IS_FREE]: type === 'isFree',
      [EVENT_SEARCH_FILTERS.TEXT]: type === 'text' ? [value] : [],
    });

    router.push(`${routerHelper.getI18nPath(ROUTES.SEARCH, locale)}${search}`);
    scrollToTop();
  };

export function isTargetAgeGroup(value?: string | null): value is AgeGroup {
  if (!value) {
    return false;
  }
  return (TARGET_GROUP_AGE_GROUPS_IN_ORDER as readonly string[]).includes(
    value
  );
}
