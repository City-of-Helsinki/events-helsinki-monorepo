import type { AppLanguage } from '@events-helsinki/components';
import {
  DATE_TYPES,
  EVENT_SEARCH_FILTERS,
  EVENT_SORT_OPTIONS,
} from '@events-helsinki/components';
import { advanceTo, clear } from 'jest-date-mock';

import { COURSE_DEFAULT_SEARCH_FILTERS } from '../constants';
import {
  clampAgeInput,
  getEventSearchVariables,
  getNextPage,
  getSearchQuery,
} from '../utils';

afterAll(() => {
  clear();
});

describe('getSearchQuery function', () => {
  it('get search query', () => {
    expect(getSearchQuery(COURSE_DEFAULT_SEARCH_FILTERS)).toBe('');

    expect(
      getSearchQuery({
        ...COURSE_DEFAULT_SEARCH_FILTERS,
        [EVENT_SEARCH_FILTERS.CATEGORIES]: ['category1', 'category2'],
        [EVENT_SEARCH_FILTERS.DATE_TYPES]: ['type1', 'type2'],
        [EVENT_SEARCH_FILTERS.TEXT]: ['test'],
      })
    ).toBe(
      `?categories=category1,category2&dateTypes=type1,type2&${EVENT_SEARCH_FILTERS.TEXT}=test`
    );

    expect(
      getSearchQuery({
        ...COURSE_DEFAULT_SEARCH_FILTERS,
        [EVENT_SEARCH_FILTERS.DATE_TYPES]: ['type1', 'type2'],
        [EVENT_SEARCH_FILTERS.END]: new Date('2019-12-20'),
        [EVENT_SEARCH_FILTERS.START]: new Date('2019-11-20'),
        [EVENT_SEARCH_FILTERS.TEXT]: ['test'],
      })
    ).toBe(
      `?end=2019-12-20&start=2019-11-20&${EVENT_SEARCH_FILTERS.TEXT}=test`
    );
  });
});

describe('getEventSearchVariables function', () => {
  const defaultParams = {
    include: [],
    language: 'fi' as AppLanguage,
    pageSize: 10,
    sortOrder: EVENT_SORT_OPTIONS.END_TIME,
    superEventType: [],
  };

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
        `?${[EVENT_SEARCH_FILTERS.DATE_TYPES]}=${DATE_TYPES.THIS_WEEK}`
      ),
    });
    expect(start1).toBe('now');
    expect(end1).toBe('2020-10-11');

    const { end: end2, start: start2 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?${[EVENT_SEARCH_FILTERS.DATE_TYPES]}=${DATE_TYPES.TODAY}`
      ),
    });
    expect(start2).toBe('now');
    expect(end2).toBe('today');

    const { end: end3, start: start3 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?${[EVENT_SEARCH_FILTERS.DATE_TYPES]}=${DATE_TYPES.TOMORROW}`
      ),
    });
    expect(start3).toBe('2020-10-07');
    expect(end3).toBe('2020-10-07');

    const { end: end4, start: start4 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?${[EVENT_SEARCH_FILTERS.DATE_TYPES]}=${DATE_TYPES.WEEKEND}`
      ),
    });
    expect(start4).toBe('2020-10-10');
    expect(end4).toBe('2020-10-11');

    const { end: end5, start: start5 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?${[EVENT_SEARCH_FILTERS.DATE_TYPES]}=${DATE_TYPES.TODAY},${
          DATE_TYPES.TOMORROW
        }`
      ),
    });
    expect(start5).toBe('now');
    expect(end5).toBe('2020-10-07');

    const { end: end6, start: start6 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?${[EVENT_SEARCH_FILTERS.DATE_TYPES]}=${DATE_TYPES.TODAY},${
          DATE_TYPES.WEEKEND
        }`
      ),
    });
    expect(start6).toBe('now');
    expect(end6).toBe('2020-10-11');

    const { end: end7, start: start7 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?${[EVENT_SEARCH_FILTERS.DATE_TYPES]}=${
          DATE_TYPES.THIS_WEEK
        }&end=2020-10-15`
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
        next: `http://localhost:3000?${EVENT_SEARCH_FILTERS.TEXT}=value&${EVENT_SEARCH_FILTERS.PAGE}=2`,
        previous: null,
      })
    ).toBe(2);
  });

  it('should return null', () => {
    expect(
      getNextPage({
        count: 0,
        next: `http://localhost:3000?${EVENT_SEARCH_FILTERS.TEXT}=value`,
        previous: null,
      })
    ).toBeNull();
  });
});

describe('clampAgeInput function', () => {
  it.each([
    // Empty values
    { input: '', expectedOutput: undefined },
    { input: null, expectedOutput: undefined },
    { input: undefined, expectedOutput: undefined },
    { input: [], expectedOutput: undefined },
    { input: {}, expectedOutput: undefined },
    // Single values in min/max age range
    { input: 1, expectedOutput: 1 },
    { input: 9, expectedOutput: 9 },
    { input: 12, expectedOutput: 12 },
    { input: 99, expectedOutput: 99 },
    { input: 115, expectedOutput: 115 },
    { input: '1', expectedOutput: 1 },
    { input: '9', expectedOutput: 9 },
    { input: '12', expectedOutput: 12 },
    { input: '99', expectedOutput: 99 },
    { input: '115', expectedOutput: 115 },
    { input: '00012', expectedOutput: 12 },
    { input: '+12', expectedOutput: 12 },
    // Single values out of min/max age range
    { input: -1, expectedOutput: 0 },
    { input: '-1', expectedOutput: 0 },
    { input: '-0001', expectedOutput: 0 },
    { input: 131, expectedOutput: 130 },
    { input: '131', expectedOutput: 130 },
    { input: '000131', expectedOutput: 130 },
    { input: '+131', expectedOutput: 130 },
    // Incompatible values
    { input: 12.5, expectedOutput: undefined }, // No non-integer numbers
    { input: [1, 9, 12, 99, 115], expectedOutput: undefined }, // No arrays
    { input: { age: 12 }, expectedOutput: undefined }, // No objects
  ])(
    'clampAgeInput($input) == $expectedOutput',
    ({ input, expectedOutput }) => {
      expect(clampAgeInput(input)).toStrictEqual(expectedOutput);
    }
  );
});
