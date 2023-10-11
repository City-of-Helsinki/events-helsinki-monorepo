import type {
  AppLanguage,
  EVENT_SORT_OPTIONS,
  EventFields,
  FilterType,
  KeywordOnClickHandlerType,
  Meta,
  QueryEventListArgs,
  SPORTS_CATEGORIES,
  TARGET_GROUPS,
  Venue,
} from '@events-helsinki/components';
import {
  buildQueryFromObject,
  DATE_TYPES,
  EventTypeId,
  formatDate,
  getUrlParamAsArray,
  isEventFields,
  isVenue,
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
import routerHelper from '../../app/routerHelper';
import { PARAM_SEARCH_TYPE } from '../combinedSearch/constants';
import {
  CATEGORY_CATALOG,
  EVENT_DEFAULT_SEARCH_FILTERS,
  EVENT_SEARCH_FILTERS,
  MAPPED_COURSE_CATEGORIES,
  MAPPED_PLACES,
  SPORT_COURSES_KEYWORDS,
  sportsCategoryData,
  TARGET_GROUP_DATA,
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

export const getTargetGroupOptions = (
  t: TFunction,
  targetGroups: TARGET_GROUPS[] = CATEGORY_CATALOG.targetGroups.default
): CategoryOption[] =>
  targetGroups.map((targetGroup) =>
    getCategoryOptions(targetGroup, TARGET_GROUP_DATA[targetGroup], t)
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
 * @deprecated since the CombinedSearchContext should be used instead.
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
  eventType,
}: {
  include: string[];
  language?: AppLanguage;
  pageSize: number;
  params: URLSearchParams;
  sortOrder: EVENT_SORT_OPTIONS;
  superEventType?: string[];
  superEvent?: string;
  place?: string;
  eventType?: (EventTypeId.Course | EventTypeId.General)[];
  // eslint-disable-next-line sonarjs/cognitive-complexity
}): QueryEventListArgs => {
  const {
    keyword,
    keywordNot,
    places,
    publisher,
    q,
    dateTypes,
    sportsCategories,
    isFree,
  } = getSearchFilters(params);
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
    const hasText = !isEmpty(q);
    if (hasText && hasLocation) {
      // show helsinki events matching to text
      return { localOngoingAnd: q };
    } else if (hasText) {
      // show internet and helsinki events matching to text
      return { allOngoingAnd: q };
    } else {
      // show all internet and helsinki events
      return { allOngoing: true };
    }
  };

  const sportsKeywords = [
    ...new Set( // unique keywords
      sportsCategories.flatMap(
        (category) => sportsCategoryData?.[category].keywords ?? []
      )
    ),
  ];

  return {
    ...getSearchParam(),
    isFree: isFree || undefined,
    end,
    include,
    keywordOrSet1: SPORT_COURSES_KEYWORDS, // Limit search to sport keywords only
    keywordOrSet2: [...(keyword ?? []), ...sportsKeywords],
    keywordAnd,
    keywordNot,
    language,
    location: places.sort(),
    pageSize,
    publisher,
    sort: sortOrder,
    start,
    superEventType,
    superEvent,
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

/**
 * Get an object of the search variables that can be used with a Apollo-queryhook.
 * @deprecated since the combined search should use the CombinedSearchContext instead.
 * @param searchParams
 * @returns
 */
export const getSearchFilters = (searchParams: URLSearchParams): Filters => {
  const endTime = searchParams.get(EVENT_SEARCH_FILTERS.END);
  const end = endTime ? new Date(endTime) : null;

  const startTime = searchParams.get(EVENT_SEARCH_FILTERS.START);
  const start = startTime ? new Date(startTime) : null;

  const freeText: string[] = [];
  if (searchParams.get('q')) {
    freeText.push(searchParams.get('q')?.toString() || '');
  }

  return {
    dateTypes: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.DATE_TYPES
    ),
    sportsCategories: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.SPORTS_CATEGORIES
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
    q: freeText,
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

  if (newFilters.q?.length && !newFilters.q[0]) {
    delete newFilters.q;
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
      [PARAM_SEARCH_TYPE]: event.typeId ?? '',
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

export const getCardUrl = (
  event: EventFields,
  locale: AppLanguage,
  returnPath?: string
): string => {
  return routerHelper.getLocalizedCmsItemUrl(
    ROUTES.COURSES,
    { eventId: event.id, returnPath },
    locale
  );
};

export const getOrganizationSearchUrl = (
  event: EventFields,
  router: NextRouter,
  locale: AppLanguage
): string => {
  return routerHelper.getLocalizedCmsItemUrl(
    ROUTES.SEARCH,
    {
      searchType: event.typeId ?? EventTypeId.General,
      organization: event.publisher ?? '',
    },
    locale
  );
};

export const getHelsinkiOnlySearchUrl = (
  source: EventFields | Venue,
  router: NextRouter,
  locale: AppLanguage
): string => {
  if (isVenue(source)) {
    return routerHelper.getLocalizedCmsItemUrl(
      ROUTES.SEARCH,
      { searchType: 'Venue', helsinkiOnly: 'true' },
      locale
    );
  } else if (isEventFields(source)) {
    return routerHelper.getLocalizedCmsItemUrl(
      ROUTES.SEARCH,
      {
        searchType: source.typeId ?? EventTypeId.General,
        helsinkiOnly: 'true',
      },
      locale
    );
  }
  throw new Error('Invalid source type for getHelsinkiOnlySearchUrl');
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
    const disableOnClick = true; // Disable onClick as per LIIKUNTA-411 comment
    if (!disableOnClick) {
      const search = getSearchQuery({
        ...EVENT_DEFAULT_SEARCH_FILTERS,
        [EVENT_SEARCH_FILTERS.DATE_TYPES]: type === 'dateType' ? [value] : [],
        [EVENT_SEARCH_FILTERS.IS_FREE]: type === 'isFree',
        q: type === 'text' ? [value] : [],
      });

      router.push(
        `${routerHelper.getI18nPath(ROUTES.SEARCH, locale)}${search}`
      );
      scrollToTop();
    }
  };
