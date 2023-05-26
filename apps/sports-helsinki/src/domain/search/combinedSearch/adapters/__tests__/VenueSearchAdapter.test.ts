import { SortOrder } from '@events-helsinki/components/types';
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
        organization: null,
        keywords: [],
      };
      const adapter = new VenueSearchAdapter(input, locale);
      expect(adapter.getQueryVariables()).toStrictEqual({
        language: 'FINNISH',
        includeHaukiFields: false,
        q: input.text,
        ontologyWordIds: input.keywords,
        administrativeDivisionIds: ['ocd-division/country:fi/kunta:helsinki'],
        after: '',
        first: 10,
        ontologyTreeIds: ['551'],
        openAt: null,
        orderByName: {
          order: SortOrder.Ascending,
        },
      });
    });
  });
});
