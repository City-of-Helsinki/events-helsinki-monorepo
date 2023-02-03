import {
  EVENT_SORT_OPTIONS,
  SIMILAR_EVENTS_AMOUNT,
  getEventIdFromUrl,
  useEventListQuery,
  useVenuesByIdsLazyQuery,
} from 'events-helsinki-components';
import type {
  EventListQuery,
  EventListQueryVariables,
  EventFields,
  Venue,
} from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { toast } from 'react-toastify';
import useUnifiedSearchListQuery from '../../domain/unifiedSearch/useUnifiedSearchListQuery';
import getVenueSourceId from '../../domain/venue/utils/getVenueSourceId';
import { EVENT_SEARCH_FILTERS } from '../search/eventSearch/constants';
import {
  getEventCategories,
  getEventSearchVariables,
  getNextPage,
} from '../search/eventSearch/utils';

const useSimilarEventsQueryVariables = (event: EventFields) => {
  return React.useMemo(() => {
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
  event: EventFields
): { loading: boolean; data: EventListQuery['eventList']['data'] } => {
  const eventFilters = useSimilarEventsQueryVariables(event);
  const { data: eventsData, loading } = useEventListQuery({
    ssr: false,
    variables: eventFilters,
  });
  const data = _filterSimilarEvents(event, eventsData?.eventList?.data || []);
  return { data, loading };
};

const useOtherEventTimesVariables = (event: EventFields) => {
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
      eventType: event.typeId ? [event.typeId] : undefined,
    }),
    [superEventId]
  );

  return { superEventId, variables };
};

export const useSubEventsQueryVariables = (
  event: EventFields
): { superEventId: string | undefined; variables: EventListQueryVariables } => {
  const variables = React.useMemo(
    (): EventListQueryVariables => ({
      sort: EVENT_SORT_OPTIONS.END_TIME,
      start: 'now',
      superEvent: event.id,
      eventType: event.typeId ? [event.typeId] : undefined,
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
  const { variables, superEventId } = useOtherEventTimesVariables(event);

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
    superEventType: 'none',
    pageSize,
  };
  return useEventListQuery({ variables, ssr: false });
};

export const useSimilarVenuesQuery = (venue: Venue) => {
  const ontologyWordIds = venue.ontologyWords.reduce(
    (ontologies: string[], ontology) => {
      if (ontology?.id) {
        ontologies.push(ontology.id.toString());
      }
      return ontologies;
    },
    []
  );

  // Search for venue ids from UnifiedSearch with the ontologies.
  const { data: venuesUnifiedSearchData, loading: unifiedSearchLoading } =
    useUnifiedSearchListQuery({
      variables: {
        ontologyWordIds,
        first: 4,
        orderByName: undefined,
      },
    });

  // Search for venues from venues-proxy (e.g. TPREK as a datasource) with the venue ids.
  const [getVenuesByIds, queryProps] = useVenuesByIdsLazyQuery({
    ssr: false,
  });

  // Trigger the venues by ids search when the ids are fetched.
  React.useEffect(() => {
    if (!unifiedSearchLoading) {
      const venueIds = venuesUnifiedSearchData?.unifiedSearch?.edges.reduce(
        (result: string[], edge) => {
          if (edge.node?.venue?.meta?.id) {
            result.push(edge.node.venue.meta.id);
          }
          return result;
        },
        []
      );
      if (venueIds?.length) {
        const venueSourceIds = venueIds.map((venueId) =>
          getVenueSourceId(venueId)
        );
        getVenuesByIds({ variables: { ids: venueSourceIds } });
      }
    }
  }, [
    getVenuesByIds,
    unifiedSearchLoading,
    venuesUnifiedSearchData?.unifiedSearch?.edges,
  ]);

  return { ...queryProps, loading: unifiedSearchLoading || queryProps.loading };
};
