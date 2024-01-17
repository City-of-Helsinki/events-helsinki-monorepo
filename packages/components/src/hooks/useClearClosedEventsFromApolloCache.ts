import { useApolloClient } from '@apollo/client';
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
    const eventsOfPastIds = data?.eventList.data.reduce<string[]>(
      (pastEventIds, event) =>
        isEventClosed(event) ? [...pastEventIds, event.id] : pastEventIds,
      []
    );
    if (eventsOfPastIds?.length) {
      eventsOfPastIds?.forEach((eventId) =>
        cache.evict({ id: `EventDetails:${eventId}` })
      );
      cache.gc();
      // eslint-disable-next-line no-console
      console.info(
        // eslint-disable-next-line no-console
        'Removed the past events from the Apollo cache by carbage collecting them',
        eventsOfPastIds
      );
    }
  }, [cache, data?.eventList.data]);
}
