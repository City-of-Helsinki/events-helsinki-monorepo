import {
  SENIORS_ONTOLOGY_TREE_IDS,
  YOUTH_ONTOLOGY_TREE_IDS,
} from '@events-helsinki/components';
import { SortOrder, TARGET_GROUPS } from '@events-helsinki/components/types';
import type { CombinedSearchAdapterInput } from '../../types';
import VenueSearchAdapter from '../VenueSearchAdapter';

const locale = 'fi';

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
        includeHaukiFields: false,
        text: input.text,
        ontologyWordIdOrSets: input.keywords.length > 0 ? [input.keywords] : [],
        administrativeDivisionIds: ['ocd-division/country:fi/kunta:helsinki'],
        after: '',
        first: 10,
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
});
