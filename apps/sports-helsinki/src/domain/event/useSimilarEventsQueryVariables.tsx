import {
  EVENT_SORT_OPTIONS,
  EventTypeId,
  HELSINKI_OCD_DIVISION_ID,
} from '@events-helsinki/components';
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

    if (!searchParams[EVENT_SEARCH_FILTERS.KEYWORD]) {
      return undefined;
    }

    return {
      ...getEventSearchVariables({
        include: ['keywords', 'location'],
        // NOTE: use SIMILAR_EVENTS_AMOUNT when LinkedEvents-query
        // with keyword_OR_set* -param is fixed and it returns distinct results
        pageSize: 100,
        params: new URLSearchParams(searchParams),
        sortOrder: EVENT_SORT_OPTIONS.END_TIME,
        // Always filter with HELSINKI_OCD_DIVISION_ID to limit the results to city of Helsinki events.
        [EVENT_SEARCH_FILTERS.DIVISIONS]: [HELSINKI_OCD_DIVISION_ID],
        // Don't use superEventType when experimenting:
        // LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512)
        // superEventType: ['umbrella', 'none']
        // Only the course type search should use this param;
        // LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512)
        superEvent: event.typeId === EventTypeId.Course ? 'none' : undefined,
        eventType: event.typeId ? [event.typeId] : undefined,
      }),
      // Set to undefined, because keywordOrSet1 contains SPORT_COURSES_KEYWORDS, which shouldn't
      // be included in similar events query
      keywordOrSet1: undefined,
    };
  }, [event]);
};

export default useSimilarEventsQueryVariables;
