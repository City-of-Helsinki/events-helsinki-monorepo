import { SortOrder } from '@events-helsinki/components/types';
import type { CombinedSearchAdapterInput } from '../../types';
import VenueSearchAdapter from '../VenueSearchAdapter';

describe('VenueSearchAdapter', () => {
  describe('getQueryVariables', () => {
    it('converts the form values input to a desired search variables as an output', () => {
      const input: CombinedSearchAdapterInput = {
        text: 'test text',
        venueOrderBy: 'name-asc',
        eventOrderBy: null,
        courseOrderBy: null,
        sportsCategories: [],
        organization: null,
        keywords: [],
      };
      const adapter = new VenueSearchAdapter(input);
      expect(adapter.getQueryVariables()).toStrictEqual({
        q: input.text,
        ontologyWordIds: input.keywords,
        administrativeDivisionIds: ['ocd-division/country:fi/kunta:helsinki'],
        after: '',
        first: 10,
        ontologyTreeIds: ['551'],
        openAt: '',
        orderByName: {
          order: SortOrder.Descending,
        },
      });
    });
  });
});
