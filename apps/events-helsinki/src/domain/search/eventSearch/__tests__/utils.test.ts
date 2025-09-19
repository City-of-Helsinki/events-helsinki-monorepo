import type { AppLanguage } from '@events-helsinki/components';
import {
  DATE_TYPES,
  DEFAULT_EVENT_SORT_OPTION,
  EVENT_SEARCH_FILTERS,
} from '@events-helsinki/components';
import { advanceTo, clear } from 'jest-date-mock';

import {
  EVENT_DEFAULT_SEARCH_FILTERS,
  MAPPED_EVENT_CATEGORIES,
} from '../constants';
import { getEventSearchVariables, getNextPage, getSearchQuery } from '../utils';

afterAll(() => {
  clear();
});

describe('getSearchQuery function', () => {
  it('get search query', () => {
    expect(getSearchQuery(EVENT_DEFAULT_SEARCH_FILTERS)).toBe('');

    expect(
      getSearchQuery({
        ...EVENT_DEFAULT_SEARCH_FILTERS,
        [EVENT_SEARCH_FILTERS.CATEGORIES]: ['category1', 'category2'],
        [EVENT_SEARCH_FILTERS.DATE_TYPES]: ['type1', 'type2'],
        [EVENT_SEARCH_FILTERS.TEXT]: ['test'],
      })
    ).toBe(
      // eslint-disable-next-line @stylistic/max-len
      `?${EVENT_SEARCH_FILTERS.CATEGORIES}=category1,category2&${EVENT_SEARCH_FILTERS.DATE_TYPES}=type1,type2&${EVENT_SEARCH_FILTERS.TEXT}=test`
    );

    expect(
      getSearchQuery({
        ...EVENT_DEFAULT_SEARCH_FILTERS,
        [EVENT_SEARCH_FILTERS.DATE_TYPES]: ['type1', 'type2'],
        [EVENT_SEARCH_FILTERS.END]: new Date('2019-12-20'),
        [EVENT_SEARCH_FILTERS.START]: new Date('2019-11-20'),
        [EVENT_SEARCH_FILTERS.TEXT]: ['test'],
      })
    ).toBe(
      // eslint-disable-next-line @stylistic/max-len
      `?${EVENT_SEARCH_FILTERS.END}=2019-12-20&${EVENT_SEARCH_FILTERS.START}=2019-11-20&${EVENT_SEARCH_FILTERS.TEXT}=test`
    );
  });
});

describe('getEventSearchVariables function', () => {
  const defaultParams = {
    include: [],
    language: 'fi' as AppLanguage,
    pageSize: 25,
    sortOrder: DEFAULT_EVENT_SORT_OPTION,
    superEventType: [],
  };
  it.each(Object.entries(MAPPED_EVENT_CATEGORIES))(
    'should return correct keywords per category',
    (category, expected_keywords) => {
      const { keywordOrSet2: keywords } = getEventSearchVariables({
        ...defaultParams,
        params: new URLSearchParams(`?categories=${category}`),
      });
      expect((keywords || []).join(',')).toContain(expected_keywords.join(','));
    }
  );

  it('should not return any keywords for an undefined category', () => {
    const { keywordOrSet2: keywords } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(`?categories=not_found`),
    });
    expect(keywords).toStrictEqual([]);
  });

  it('should return start=now if start time is in past/today', () => {
    advanceTo('2020-10-06');
    const { start: start1 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams('?start=2020-10-06'),
    });
    expect(start1).toBe('now');

    const { start: start2 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams('?start=2020-10-01'),
    });
    expect(start2).toBe('now');
  });

  it('should return correct start and end time', () => {
    advanceTo('2020-10-06');
    const { end: end1, start: start1 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?${EVENT_SEARCH_FILTERS.DATE_TYPES}=${DATE_TYPES.THIS_WEEK}`
      ),
    });
    expect(start1).toBe('now');
    expect(end1).toBe('2020-10-11');

    const { end: end2, start: start2 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?${EVENT_SEARCH_FILTERS.DATE_TYPES}=${DATE_TYPES.TODAY}`
      ),
    });
    expect(start2).toBe('now');
    expect(end2).toBe('today');

    const { end: end3, start: start3 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?${EVENT_SEARCH_FILTERS.DATE_TYPES}=${DATE_TYPES.TOMORROW}`
      ),
    });
    expect(start3).toBe('2020-10-07');
    expect(end3).toBe('2020-10-07');

    const { end: end4, start: start4 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?${EVENT_SEARCH_FILTERS.DATE_TYPES}=${DATE_TYPES.WEEKEND}`
      ),
    });
    expect(start4).toBe('2020-10-10');
    expect(end4).toBe('2020-10-11');

    const { end: end5, start: start5 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?${EVENT_SEARCH_FILTERS.DATE_TYPES}=${DATE_TYPES.TODAY},${DATE_TYPES.TOMORROW}`
      ),
    });
    expect(start5).toBe('now');
    expect(end5).toBe('2020-10-07');

    const { end: end6, start: start6 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?${EVENT_SEARCH_FILTERS.DATE_TYPES}=${DATE_TYPES.TODAY},${DATE_TYPES.WEEKEND}`
      ),
    });
    expect(start6).toBe('now');
    expect(end6).toBe('2020-10-11');

    const { end: end7, start: start7 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?${EVENT_SEARCH_FILTERS.DATE_TYPES}=${DATE_TYPES.THIS_WEEK}&end=2020-10-15`
      ),
    });
    expect(start7).toBe('now');
    expect(end7).toBe('2020-10-15');
  });
});

describe('getNextPage function', () => {
  it('should return next page', () => {
    expect(
      getNextPage({
        count: 0,
        next: 'http://localhost:3000?page=2',
        previous: null,
      })
    ).toBe(2);
    expect(
      getNextPage({
        count: 0,
        next: 'http://localhost:3000?text=value&page=2',
        previous: null,
      })
    ).toBe(2);
  });

  it('should return null', () => {
    expect(
      getNextPage({
        count: 0,
        next: 'http://localhost:3000?text=value',
        previous: null,
      })
    ).toBeNull();
  });
});
