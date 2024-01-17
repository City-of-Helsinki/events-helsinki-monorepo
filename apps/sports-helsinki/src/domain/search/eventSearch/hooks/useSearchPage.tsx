import {
  EventTypeId,
  useSearchTranslation,
  useIsSmallScreen,
  useEventListQuery,
  getLargeEventCardId,
  useClearClosedEventsFromApolloCache,
} from '@events-helsinki/components';
import { useRouter } from 'next/router';
import React from 'react';
import { useConfig } from 'react-helsinki-headless-cms';
import { scroller } from 'react-scroll';
import { toast } from 'react-toastify';
import { useCombinedSearchContext } from 'domain/search/combinedSearch/adapters/CombinedSearchContext';
import { SEARCH_ROUTES } from '../../../../constants';
import routerHelper from '../../../../domain/app/routerHelper';
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
  const router = useRouter();

  const isSmallScreen = useIsSmallScreen();
  const { meta } = useConfig();
  const {
    data: eventsData,
    loading: isLoadingEvents,
    isFetchingMore,
    handleLoadMore,
  } = useEventSearchPageQuery(eventType);

  const scrollToResultList = () => {
    if (isSmallScreen) {
      scroller.scrollTo('resultList', {
        delay: 0,
        duration: 1000,
        offset: -50,
        smooth: true,
      });
    }
  };

  const scrollToResultCard = (id: string) => {
    scroller.scrollTo(id, {
      delay: 0,
      duration: 300,
      offset: -50,
      smooth: true,
    });
  };

  const initialPageOnLoad = () => {
    if (router.asPath && router.query?.scrollToResults) {
      scrollToResultList();
    } else if (router.query?.eventId) {
      scrollToResultCard(
        getLargeEventCardId(
          Array.isArray(router.query.eventId)
            ? router.query.eventId[0]
            : router.query.eventId
        )
      );
      routerHelper.removeQueryParamsFromRouter(
        router,
        ['eventId'],
        SEARCH_ROUTES.SEARCH
      );
    }
  };

  const count = eventsData?.eventList?.meta.count ?? 0;
  const hasNext = !!eventsData?.eventList?.meta.next;

  return {
    meta,
    isSmallScreen,
    handleLoadMore,
    isFetchingMore,
    isLoading: isLoadingEvents,
    scrollToResultList,
    scrollToResultCard,
    resultList: eventsData?.eventList,
    initialPageOnLoad,
    count,
    hasNext,
  };
}

export default useSearchPage;
