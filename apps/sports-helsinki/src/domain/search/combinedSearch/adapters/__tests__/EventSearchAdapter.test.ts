import type { CombinedSearchAdapterInput } from '../../types';
import EventSearchAdapter from '../EventSearchAdapter';

describe('EventSearchAdapter', () => {
  describe('getQueryVariables', () => {
    it('converts the form values input to a desired search variables as an output', () => {
      const input: CombinedSearchAdapterInput = {
        text: 'test text',
        orderBy: 'field-asc',
        sportsCategories: [],
        organization: null,
        keywords: [],
      };
      const adapter = new EventSearchAdapter(input);
      expect(adapter.getQueryVariables()).toStrictEqual({
        text: input.text,
        sort: input.orderBy,
        keywords: input.keywords,
      });
    });
  });
});
