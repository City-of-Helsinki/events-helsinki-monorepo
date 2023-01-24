import type {
  EventTypeId,
  QueryEventListArgs,
} from 'events-helsinki-components';
import { useRouter } from 'next/router';
import React from 'react';
import { transformedSearchVariables } from '../../combinedSearch/utils';
import {
  isEventSortOption,
  DEFAULT_EVENT_SORT_OPTION,
  PAGE_SIZE,
} from '../constants';
import { getEventSearchVariables } from '../utils';

function useEventSearchFilters(eventType: EventTypeId) {
  const router = useRouter();
  const params: { place?: string; eventType?: string } = router.query;
  return React.useMemo(() => {
    const searchParams = new URLSearchParams(router.asPath.split('?')[1]);

    // TODO: Make a better adapter or a new form to handle these transformations.
    const transformedParams = transformedSearchVariables(searchParams);
    const sortParam = searchParams.get('sort');

    const variables: QueryEventListArgs = getEventSearchVariables({
      include: ['keywords', 'location'],
      pageSize: PAGE_SIZE,
      params: transformedParams,
      place: params.place,
      sortOrder: isEventSortOption(sortParam)
        ? sortParam
        : DEFAULT_EVENT_SORT_OPTION,
      superEventType: ['umbrella', 'none'],
      eventType: [eventType],
    });
    return variables;
  }, [router.asPath, params.place, eventType]);
}

export default useEventSearchFilters;
