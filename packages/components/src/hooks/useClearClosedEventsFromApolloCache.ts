import { useApolloClient } from '@apollo/client/react/index.js';
import { useEffect } from 'react';
import type { EventListQuery } from '../types/generated/graphql';
import { isEventClosed } from '../utils/eventUtils';

/**
 * Clear the Apollo cache from the events of the past
 */
export default function useClearClosedEventsFromApolloCache(
  data?: EventListQuery
) {
  const { cache } = useApolloClient();
  useEffect(() => {
    const eventsOfPastIds = data?.eventList.data
      .filter(isEventClosed)
      .map((event) => event.id);
    if (eventsOfPastIds?.length) {
      eventsOfPastIds?.forEach((eventId) =>
        cache.evict({ id: `EventDetails:${eventId}` })
      );
      cache.gc();
      // eslint-disable-next-line no-console
      console.info(
        'Removed the past events from the Apollo cache by carbage collecting them',
        eventsOfPastIds
      );
    }
  }, [cache, data?.eventList.data]);
}
