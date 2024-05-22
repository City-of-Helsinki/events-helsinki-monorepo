import { useTranslation } from 'next-i18next';
import React from 'react';
import { toast } from 'react-toastify';
import {
  EVENT_SEARCH_FILTERS,
  EVENT_SORT_OPTIONS,
  SIMILAR_EVENTS_AMOUNT,
} from '../../../constants/event-constants';
import type { EventFields } from '../../../types/event-types';
import {
  EventListQuery,
  EventListQueryVariables,
  EventTypeId,
  Meta,
  QueryEventListArgs,
} from '../../../types/generated/graphql';
import { useEventListQuery } from '../../../types/generated/graphql';
import { getEventIdFromUrl } from '../../../utils/eventUtils';

/**
 * Get next page number from linkedevents response meta field
 * @param meta
 * @return {number}
 */
export const getNextPage = (meta: Meta): number | null => {
  if (!meta.next) return null;

  const urlParts = meta.next.split('?');
  const searchParams = new URLSearchParams(decodeURIComponent(urlParts[1]));
  const page = searchParams.get(EVENT_SEARCH_FILTERS.PAGE);
  return page ? Number(page) : null;
};

/**
 * Filter the similar events query results:
 * - Show unique results only
 * - Don't show sibling events / events from the same super event
 *
 * NOTE: LinkedEvents-query with keyword_OR_set* -param returns can return as many duplicates
 * as there are keywords listed.
 *
 * TODO: This could be simplified if the LinkedEvents -query would be fixed and it would return distinct results only.
 */
const _filterSimilarEvents = (event: EventFields, data: EventFields[]) =>
  data
    // Don't show current event in the list
    .filter((item) => item.id !== event.id)
    // Show unique only - fix for for duplicates - needed because of bug in query with keyword_OR_set* -param
    .filter(
      (item, i, existingSimilarEvents) =>
        existingSimilarEvents.indexOf(item) === i
    )
    // Don't show sibling events / events from the same super event
    .filter(
      (item) =>
        (!item.superEvent?.internalId && !event.superEvent?.internalId) ||
        item.superEvent?.internalId !== event.superEvent?.internalId
    )
    // Don't show siblings of any event that already exists in the list of similar events
    .reduce((similarEvents: EventFields[], item: EventFields) => {
      // Collect the super event ids
      const superEventIds = similarEvents
        .map((e) => e.superEvent?.internalId)
        .filter((id) => !!id);

      // Search if already in the list and add if not
      if (
        !item.superEvent?.internalId ||
        !superEventIds.includes(item.superEvent.internalId)
      ) {
        similarEvents.push(item);
      }
      return similarEvents;
    }, [])
    // Slice to get only a desired amount of items
    .slice(0, SIMILAR_EVENTS_AMOUNT);

export const useSimilarEventsQuery = (
  event: EventFields,
  variables: QueryEventListArgs
): { loading: boolean; data: EventListQuery['eventList']['data'] } => {
  const { data: eventsData, loading } = useEventListQuery({
    ssr: false,
    variables,
  });
  const data = _filterSimilarEvents(event, eventsData?.eventList?.data || []);
  return { data, loading };
};

const useOtherEventTimesVariables = (
  event: EventFields,
  supportedEventTypes: EventTypeId[] | null
) => {
  const superEventId = React.useMemo(
    () => getEventIdFromUrl(event.superEvent?.internalId || '', 'event'),
    [event.superEvent]
  );

  const variables = React.useMemo(
    (): EventListQueryVariables => ({
      include: ['in_language', 'keywords', 'location', 'audience'],
      sort: EVENT_SORT_OPTIONS.END_TIME,
      start: 'now',
      superEvent: superEventId,
      eventType: supportedEventTypes,
    }),
    [superEventId]
  );

  return { superEventId, variables };
};

export const useSubEventsQueryVariables = (
  event: EventFields,
  supportedEventTypes: EventTypeId[] | null
): { superEventId: string | undefined; variables: EventListQueryVariables } => {
  const variables = React.useMemo(
    (): EventListQueryVariables => ({
      sort: EVENT_SORT_OPTIONS.END_TIME,
      start: 'now',
      superEvent: event.id,
      eventType: supportedEventTypes,
      include: ['in_language', 'keywords', 'location', 'audience'],
    }),
    [event.id]
  );

  return { superEventId: event.id, variables };
};

export const useSubEvents = (
  event: EventFields,
  variables: EventListQueryVariables,
  superEventId: string | undefined
): { subEvents: EventFields[]; isFetchingMore: boolean; loading: boolean } => {
  const { t } = useTranslation('event');
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const {
    data: subEventsData,
    fetchMore,
    loading,
  } = useEventListQuery({
    skip: !superEventId,
    ssr: false,
    variables,
  });
  const handleLoadMore = React.useCallback(
    async (page: number) => {
      setIsFetchingMore(true);

      try {
        await fetchMore({
          variables: {
            page,
          },
        });
      } catch (e) {
        toast.error(t('info.errorLoadMore'));
      }
      setIsFetchingMore(false);
    },
    [fetchMore, t]
  );

  React.useEffect(() => {
    const page = subEventsData?.eventList.meta
      ? getNextPage(subEventsData.eventList.meta)
      : null;

    if (page) {
      handleLoadMore(page);
    }
  }, [handleLoadMore, subEventsData]);

  const subEvents =
    subEventsData?.eventList.data.filter(
      (subEvent) => subEvent.id !== event.id
    ) || [];

  return { subEvents, isFetchingMore, loading };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useOtherEventTimes = (
  event: EventFields
): {
  events: EventFields[];
  loading: boolean;
  isFetchingMore: boolean;
  superEventId: string | undefined;
} => {
  const { variables, superEventId } = useOtherEventTimesVariables(
    event,
    event.typeId ? [event.typeId] : null
  );

  const { subEvents, isFetchingMore, loading } = useSubEvents(
    event,
    variables,
    superEventId
  );
  return { events: subEvents, loading, isFetchingMore, superEventId };
};

export type useLocationUpcomingEventsQueryProps = {
  placeId: string;
  keywords: string[];
  pageSize?: number;
};

export const useLocationUpcomingEventsQuery = ({
  placeId,
  keywords,
  pageSize = 6,
}: useLocationUpcomingEventsQueryProps) => {
  const variables = {
    location: placeId,
    keywords,
    include: ['keywords', 'location'],
    start: 'now',
    sort: EVENT_SORT_OPTIONS.END_TIME,
    publisherAncestor: null,
    // superEventType: 'none', // Removed to experiment LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512).
    pageSize,
    eventType: [EventTypeId.Course, EventTypeId.General],
  };
  return useEventListQuery({ variables, ssr: false });
};
