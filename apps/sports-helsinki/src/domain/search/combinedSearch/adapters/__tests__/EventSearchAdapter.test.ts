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
          eventType: EventTypeId.General,
          text: input.text,
          allOngoingAnd: null,
          start: 'now',
          end: '',
          keywordAnd: input.keywords,
          keywordNot: [],
          keywordOrSet1: [
            'yso:p916',
            'kulke:710',
            'yso:p17018',
            'yso:p1963',
            'yso:p9824',
            'yso:p965',
            'yso:p6409',
            'yso:p8781',
            'yso:p26619',
            'yso:p13035',
            'yso:p2041',
          ],
          keywordOrSet2: [],
          location: [],
          pageSize: 10,
          publisher: null,
          include: ['keywords', 'location'],
          superEventType: ['umbrella', 'none'],
          sort:
            eventType === EventTypeId.General
              ? input.eventOrderBy
              : input.courseOrderBy,
        });
      }
    );
  });
});
