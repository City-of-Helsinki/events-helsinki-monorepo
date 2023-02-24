import type { EventTypeId } from 'events-helsinki-components';
import {
  useSearchTranslation,
  useIsSmallScreen,
  useEventListQuery,
  getLargeEventCardId,
} from 'events-helsinki-components';
import { useRouter } from 'next/router';
import React from 'react';
import { useConfig } from 'react-helsinki-headless-cms';
import { scroller } from 'react-scroll';
import { toast } from 'react-toastify';
import { SEARCH_ROUTES } from '../../../../constants';
import routerHelper from '../../../../domain/app/routerHelper';
import type { SearchPage } from '../../../../domain/search/combinedSearch/types';
import { getNextPage } from '../utils';
import useEventSearchFilters from './useEventSearchFilters';
function useSearchPage({ eventType }: { eventType: EventTypeId }): SearchPage {
  const { t } = useSearchTranslation();
  const router = useRouter();
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const isSmallScreen = useIsSmallScreen();
  const { meta } = useConfig();
  const eventFilters = useEventSearchFilters(eventType);

  // Query for the primary search / active search tab
  const {
    data: eventsData,
    fetchMore,
    loading: isLoadingEvents,
    error,
  } = useEventListQuery({
    ssr: false,
    variables: eventFilters,
  });

  const handleLoadMore = async () => {
    const page = eventsData?.eventList.meta
      ? getNextPage(eventsData.eventList.meta)
      : null;
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

  const count = (eventsData?.eventList?.meta.count as number) ?? 0;
  const hasNext = !!eventsData?.eventList?.meta.next;

  return {
    searchFilters: eventFilters,
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
