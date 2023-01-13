import type {
  EventTypeId,
  QueryEventListArgs,
} from 'events-helsinki-components';
import { useRouter } from 'next/router';
import React from 'react';
import { transformedSearchVariables } from '../../combinedSearch/utils';
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from '../constants';
import { getEventSearchVariables } from '../utils';

function useEventSearchFilters(eventType: EventTypeId) {
  const router = useRouter();
  const params: { place?: string; eventType?: string } = router.query;
  return React.useMemo(() => {
    const searchParams = new URLSearchParams(router.asPath.split('?')[1]);
    const transformedParams = transformedSearchVariables(searchParams);
    const variables: QueryEventListArgs = getEventSearchVariables({
      include: ['keywords', 'location'],
      pageSize: PAGE_SIZE,
      params: transformedParams,
      place: params.place,
      sortOrder: EVENT_SORT_OPTIONS.END_TIME,
      superEventType: ['umbrella', 'none'],
      eventType: [eventType],
    });
    return variables;
  }, [router.asPath, params.place, eventType]);
}

export default useEventSearchFilters;
