import { UnifiedSearch } from '../useUnifiedSearch';
import queryString from 'query-string';
import { TARGET_GROUPS_TO_ONTOLOGY_TREE_IDS } from '../unifiedSearchConstants';

function getUnifiedSearch(router) {
  return new UnifiedSearch(router, true);
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
          text: ['swimming', 'aurinkolahti'],
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
          "text": [
            "swimming",
            "aurinkolahti",
          ],
        }
      `);
      expect(filters.openAt instanceof Date).toStrictEqual(true);
    });
  });

  describe('setFilters', () => {
    it('should set filters with expected values', () => {
      const mockRouter = {
        asPath: getAsPath({
          text: ['B'],
        }),
        replace: jest.fn(),
      };
      const unifiedSearch = getUnifiedSearch(mockRouter);

      unifiedSearch.setFilters(
        {
          text: ['B'],
        },
        '/'
      );

      expect(mockRouter.replace).toHaveBeenLastCalledWith(
        {
          pathname: '/',
          query: {
            text: ['B'],
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

    it('should be calling router without pathname', () => {
      const mockRouter = {
        replace: jest.fn(),
      };
      const unifiedSearch = getUnifiedSearch(mockRouter);

      unifiedSearch.setFilters({});

      expect(mockRouter.replace).toHaveBeenLastCalledWith(
        {
          query: {},
        },
        undefined,
        undefined
      );
    });
  });

  describe('mappings of target groups to ontology tree IDs', () => {
    for (const [targetGroup, ontologyTreeIds] of Object.entries(
      TARGET_GROUPS_TO_ONTOLOGY_TREE_IDS
    )) {
      it(`${targetGroup} ontology tree ID list should not contain duplicates`, () => {
        expect([...new Set(ontologyTreeIds)].sort()).toStrictEqual(
          ontologyTreeIds.sort()
        );
      });
    }
  });
});
