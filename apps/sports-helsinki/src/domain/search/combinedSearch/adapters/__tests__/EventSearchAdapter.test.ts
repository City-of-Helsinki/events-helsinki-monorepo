import { EventTypeId } from '@events-helsinki/components/types';
import type { CombinedSearchAdapterInput } from '../../types';
import EventSearchAdapter from '../EventSearchAdapter';

describe('EventSearchAdapter', () => {
  describe('getQueryVariables', () => {
    it.each([EventTypeId.General, EventTypeId.Course])(
      'converts the form values input to %s search variables as an output',
      (eventType) => {
        const input: CombinedSearchAdapterInput = {
          text: 'test text',
          eventOrderBy: 'event-field-asc',
          courseOrderBy: null,
          venueOrderBy: null,
          sportsCategories: [],
          organization: null,
          keywords: [],
        };
        const adapter = new EventSearchAdapter(input, eventType);
        expect(adapter.getQueryVariables()).toStrictEqual({
          text: input.text,
          sort:
            eventType === EventTypeId.General
              ? input.eventOrderBy
              : input.courseOrderBy,
          keywords: input.keywords,
        });
      }
    );
  });
});
