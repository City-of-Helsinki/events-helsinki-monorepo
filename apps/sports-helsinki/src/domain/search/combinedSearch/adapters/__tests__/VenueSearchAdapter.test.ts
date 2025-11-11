import type { Coordinates } from '@events-helsinki/components';
import {
  OrderDir,
  SENIORS_ONTOLOGY_TREE_IDS,
  UnifiedSearchOrderBy,
  YOUTH_ONTOLOGY_TREE_IDS,
} from '@events-helsinki/components';
import { SortOrder, TARGET_GROUPS } from '@events-helsinki/components/types';
import AppConfig from '../../../../app/AppConfig';
import { initialCombinedSearchFormValues } from '../../constants';
import type { CombinedSearchAdapterInput } from '../../types';
import VenueSearchAdapter from '../VenueSearchAdapter';

const locale = 'fi';

const TEST_GEOLOCATION = {
  latitude: 12.5,
  longitude: 34.75,
} as const satisfies Coordinates;

const VENUE_ORDER_BY_RELEVANCE_COMBINATIONS = [
  undefined,
  null,
  '',
  `${UnifiedSearchOrderBy.relevance}-${OrderDir.asc}`,
  `${UnifiedSearchOrderBy.relevance}-${OrderDir.desc}`,
] as const;

const VENUE_ORDER_BY_NAME_OR_DISTANCE_COMBINATIONS = [
  `${UnifiedSearchOrderBy.name}-${OrderDir.asc}`,
  `${UnifiedSearchOrderBy.name}-${OrderDir.desc}`,
  `${UnifiedSearchOrderBy.distance}-${OrderDir.asc}`,
  `${UnifiedSearchOrderBy.distance}-${OrderDir.desc}`,
] as const;

const TEST_TEXTS = ['test', '', null, '*'] as const;

describe('VenueSearchAdapter', () => {
  describe('getQueryVariables', () => {
    it('converts the form values input to a desired search variables as an output', () => {
      const input: CombinedSearchAdapterInput = {
        text: 'test text',
        venueOrderBy: 'name-asc',
        eventOrderBy: null,
        courseOrderBy: null,
        sportsCategories: [],
        targetGroups: [TARGET_GROUPS.SENIORS, TARGET_GROUPS.YOUTH],
        organization: null,
        keywords: [],
      };
      const adapter = new VenueSearchAdapter(input, locale);
      const expectedQueryVariables = {
        language: 'FINNISH',
        mustHaveReservableResource: false,
        includeHaukiFields: false,
        text: input.text,
        ontologyWordIdOrSets: input.keywords.length > 0 ? [input.keywords] : [],
        administrativeDivisionIds: ['ocd-division/country:fi/kunta:helsinki'],
        after: '',
        first: AppConfig.pageSize,
        ontologyTreeIdOrSets: [
          ['551'],
          [
            ...new Set(
              [...SENIORS_ONTOLOGY_TREE_IDS, ...YOUTH_ONTOLOGY_TREE_IDS].map(
                String
              )
            ),
          ],
        ],
        openAt: null,
        orderByName: {
          order: SortOrder.Ascending,
        },
      };
      expect(adapter.getQueryVariables()).toStrictEqual(expectedQueryVariables);
      // Make sure all source ontology tree IDs are found as strings in the second list
      // in ontologyTreeIdOrSets
      const ontologyTreeIdOrSet2 =
        expectedQueryVariables.ontologyTreeIdOrSets[1];
      SENIORS_ONTOLOGY_TREE_IDS.forEach((id) =>
        expect(ontologyTreeIdOrSet2).toContain(id.toString())
      );
      YOUTH_ONTOLOGY_TREE_IDS.forEach((id) =>
        expect(ontologyTreeIdOrSet2).toContain(id.toString())
      );
      // Make sure ontologyTreeIdOrSet2 contains only unique values
      expect([...new Set(ontologyTreeIdOrSet2)].sort()).toStrictEqual(
        ontologyTreeIdOrSet2.sort()
      );
    });
  });

  describe('showCultureAndLeisureDivisionFirst is undefined', () => {
    it.each(VENUE_ORDER_BY_NAME_OR_DISTANCE_COMBINATIONS)(
      'when sorting by %s regardless of search text',
      (venueOrderBy) => {
        for (const text in TEST_TEXTS) {
          const input: CombinedSearchAdapterInput = {
            ...initialCombinedSearchFormValues,
            text,
            venueOrderBy,
          };
          const adapter = new VenueSearchAdapter(
            input,
            locale,
            TEST_GEOLOCATION
          );
          expect(
            adapter.getQueryVariables()['showCultureAndLeisureDivisionFirst']
          ).toBeUndefined();
        }
      }
    );
  });

  describe('showCultureAndLeisureDivisionFirst set to true', () => {
    it('by default', () => {
      const adapter = new VenueSearchAdapter(
        initialCombinedSearchFormValues,
        locale,
        TEST_GEOLOCATION
      );
      expect(
        adapter.getQueryVariables()['showCultureAndLeisureDivisionFirst']
      ).toStrictEqual(true);
    });

    it.each(VENUE_ORDER_BY_RELEVANCE_COMBINATIONS)(
      'when sorting by %s regardless of search text',
      (venueOrderBy) => {
        for (const text in TEST_TEXTS) {
          const input: CombinedSearchAdapterInput = {
            ...initialCombinedSearchFormValues,
            text,
            venueOrderBy,
          };
          const adapter = new VenueSearchAdapter(
            input,
            locale,
            TEST_GEOLOCATION
          );
          expect(
            adapter.getQueryVariables()['showCultureAndLeisureDivisionFirst']
          ).toStrictEqual(true);
        }
      }
    );
  });
});
