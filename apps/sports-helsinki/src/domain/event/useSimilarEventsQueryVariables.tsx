import { EVENT_SORT_OPTIONS } from '@events-helsinki/components/constants/event-constants';
import type { EventFields } from '@events-helsinki/components/types/event-types';
import React from 'react';
import { EVENT_SEARCH_FILTERS } from '../search/eventSearch/constants';
import {
  getEventCategories,
  getEventSearchVariables,
} from '../search/eventSearch/utils';

const useSimilarEventsQueryVariables = (event: EventFields) => {
  return React.useMemo(() => {
    if (!event) return undefined;
    // Filter by search query if exists, if not filter by event keywords
    const searchParams = {
      [EVENT_SEARCH_FILTERS.KEYWORD]: getEventCategories(event) // use keyword key to give keyword ids
        .map((category) => category?.id) // collect ids
        .filter((id) => id != null) // remove nulls and undefined ones
        .join(), // make a string
    };

    return {
      ...getEventSearchVariables({
        include: ['keywords', 'location'],
        // eslint-disable-next-line max-len
        pageSize: 100, // TODO: use SIMILAR_EVENTS_AMOUNT when LinkedEvents-query with keyword_OR_set* -param is fixed and it returns distinct results
        params: new URLSearchParams(searchParams),
        sortOrder: EVENT_SORT_OPTIONS.END_TIME,
        superEventType: ['umbrella', 'none'],
        eventType: event.typeId ? [event.typeId] : undefined,
      }),
      // Set to undefined, because keywordOrSet1 contains SPORT_COURSES_KEYWORDS, which shouldn't
      // be included in similar events query
      keywordOrSet1: undefined,
    };
  }, [event]);
};

export default useSimilarEventsQueryVariables;
