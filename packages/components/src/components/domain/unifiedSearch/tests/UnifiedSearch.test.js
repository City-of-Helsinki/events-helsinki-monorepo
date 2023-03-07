import queryString from 'query-string';

import { UnifiedSearch } from '../useUnifiedSearch';

class MockQueryPersister {
  persistQuery() {
    // pass
  }

  readPersistedQuery() {
    // pass
  }
}

function getUnifiedSearch(router) {
  return new UnifiedSearch(router, new MockQueryPersister(), true);
}

function getAsPath(values) {
  return `/search?${queryString.stringify(values)}`;
}

let env;
beforeEach(() => {
  env = process.env;

  process.env.NEXT_PUBLIC_HAUKI_ENABLED = 'true';
});

afterAll(() => {
  process.env = env;
});

describe('UnifiedSearch', () => {
  describe('get filters', () => {
    it('filters should return expected values', () => {
      const filters = getUnifiedSearch({
        asPath: getAsPath({
          q: ['swimming', 'aurinkolahti'],
          first: 10,
          after: 'cursor',
          isOpenNow: true,
          openAt: new Date(2020, 11, 24, 12, 12).toJSON(),
        }),
      }).filters;

      expect(filters).toMatchInlineSnapshot(`
        {
          "administrativeDivisionIds": [],
          "after": "cursor",
          "first": 10,
          "isOpenNow": true,
          "ontologyTreeIds": [],
          "ontologyWordIds": [],
          "openAt": 2020-12-24T10:12:00.000Z,
          "q": [
            "swimming",
            "aurinkolahti",
          ],
        }
      `);
      expect(filters.openAt instanceof Date).toStrictEqual(true);
    });
  });

  describe('get filterList', () => {
    it('should return a filter value list', () => {
      const unifiedSearch = getUnifiedSearch({
        asPath: getAsPath({
          q: ['A', 'B'],
          administrativeDivisionIds: ['123'],
        }),
      });

      expect(unifiedSearch.filterList).toMatchInlineSnapshot(`
        [
          {
            "key": "q",
            "value": "A",
          },
          {
            "key": "q",
            "value": "B",
          },
          {
            "key": "administrativeDivisionIds",
            "value": "123",
          },
        ]
      `);
    });
  });

  describe('setFilters', () => {
    it('should set filters with expected values', () => {
      const mockRouter = {
        asPath: getAsPath({
          q: ['B'],
        }),
        replace: jest.fn(),
      };
      const unifiedSearch = getUnifiedSearch(mockRouter);

      unifiedSearch.setFilters(
        {
          q: ['B'],
        },
        '/'
      );

      expect(mockRouter.replace).toHaveBeenLastCalledWith(
        {
          pathname: '/',
          query: {
            q: ['B'],
          },
        },
        undefined,
        undefined
      );
    });

    it('should allow targeting a path', () => {
      const mockRouter = {
        replace: jest.fn(),
      };
      const unifiedSearch = getUnifiedSearch(mockRouter);

      unifiedSearch.setFilters({}, '/search');

      expect(mockRouter.replace).toHaveBeenLastCalledWith(
        {
          query: {},
          pathname: '/search',
        },
        undefined,
        undefined
      );
    });
  });

  describe('getSearchParamsFromFilters', () => {
    it('should merge a list of filters into an object', () => {
      const unifiedSearch = getUnifiedSearch();

      const filterObject = unifiedSearch.getSearchParamsFromFilters([
        { key: 'q', value: 'A' },
        { key: 'q', value: 'B' },
        { key: 'administrativeDivisionIds', value: '123' },
      ]);

      expect(filterObject).toMatchInlineSnapshot(`
        {
          "administrativeDivisionIds": [
            "123",
          ],
          "q": [
            "A",
            "B",
          ],
        }
      `);
    });
  });

  describe('modifyFilters', () => {
    it('should extend currently selected filters', () => {
      const mockRouter = {
        asPath: getAsPath({
          q: ['A'],
          ontologyTreeIds: [404],
          administrativeDivisionIds: ['123'],
        }),
        replace: jest.fn(),
      };
      const unifiedSearch = getUnifiedSearch(mockRouter);

      unifiedSearch.modifyFilters({
        q: ['B'],
        administrativeDivisionIds: undefined,
      });

      expect(mockRouter.replace.mock.calls[0]).toMatchInlineSnapshot(
        `undefined`
      );
    });
  });

  describe('getQueryWithout', () => {
    it('should drop the key,string pair that matches the parameters', () => {
      const mockRouter = {
        asPath: getAsPath({
          q: ['A', 'B'],
          openAt: '2020-12-24T10:12:00.000Z',
        }),
      };
      const unifiedSearch = getUnifiedSearch(mockRouter);

      expect(unifiedSearch.getQueryWithout('q', 'A')).toMatchInlineSnapshot(`
        {
          "openAt": "2020-12-24T10:12:00.000Z",
          "q": [
            "B",
          ],
        }
      `);
    });
  });
});
