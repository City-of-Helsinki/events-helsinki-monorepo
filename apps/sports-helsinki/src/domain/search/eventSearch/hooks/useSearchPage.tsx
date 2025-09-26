import {
  EventTypeId,
  useSearchTranslation,
  useIsSmallScreen,
  useEventListQuery,
  useClearClosedEventsFromApolloCache,
} from '@events-helsinki/components';
import React from 'react';
import { useConfig } from 'react-helsinki-headless-cms';
import { toast } from 'react-toastify';
import { useCombinedSearchContext } from '../../../../domain/search/combinedSearch/adapters/CombinedSearchContext';
import type { SearchPage } from '../../../../domain/search/combinedSearch/types';
import { getNextPage } from '../utils';

function useEventSearchPageQuery(eventType: EventTypeId) {
  const { searchVariables } = useCombinedSearchContext();
  const { t } = useSearchTranslation();
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);

  // Query for the primary search / active search tab
  const { data, fetchMore, ...query } = useEventListQuery({
    ssr: false,
    variables:
      eventType === EventTypeId.Course
        ? searchVariables.course
        : searchVariables.event,
  });

  const handleLoadMore = async () => {
    const page = data?.eventList.meta ? getNextPage(data.eventList.meta) : null;
    setIsFetchingMore(true);
    if (page) {
      try {
        await fetchMore({
          variables: {
            page,
          },
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('handleLoadMore', 'error in fetchMore', e);
        toast.error(t('search:errorLoadMore'));
      }
    }
    setIsFetchingMore(false);
  };

  // Clear the cache from the events of the past
  useClearClosedEventsFromApolloCache(data);

  return {
    data,
    fetchMore,
    ...query,
    isFetchingMore,
    handleLoadMore,
  };
}

function useSearchPage({ eventType }: { eventType: EventTypeId }): SearchPage {
  const isSmallScreen = useIsSmallScreen();
  const { meta } = useConfig();
  const {
    data: eventsData,
    loading: isLoadingEvents,
    isFetchingMore,
    handleLoadMore,
  } = useEventSearchPageQuery(eventType);

  const count = eventsData?.eventList?.meta.count ?? 0;
  const hasNext = !!eventsData?.eventList?.meta.next;

  return {
    meta,
    isSmallScreen,
    handleLoadMore,
    isFetchingMore,
    isLoading: isLoadingEvents,
    resultList: eventsData?.eventList,
    count,
    hasNext,
  };
}

export default useSearchPage;
