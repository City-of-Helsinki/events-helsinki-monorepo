import type { CombinedSearchAdapterInput } from '../../types';
import VenueSearchAdapter from '../VenueSearchAdapter';

describe('VenueSearchAdapter', () => {
  describe('getQueryVariables', () => {
    it('converts the form values input to a desired search variables as an output', () => {
      const input: CombinedSearchAdapterInput = {
        text: 'test text',
        orderBy: 'field-asc',
        sportsCategories: [],
        organization: null,
        keywords: [],
      };
      const adapter = new VenueSearchAdapter(input);
      expect(adapter.getQueryVariables()).toStrictEqual({
        q: input.text,
        orderBy: input.orderBy,
        ontologyWords: input.keywords,
      });
    });
  });
});
