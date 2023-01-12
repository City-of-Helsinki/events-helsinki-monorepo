import type {
  QueryEventListArgs,
  EventTypeId,
  EventListQuery,
} from 'events-helsinki-components';
import {
  BasicMeta,
  LoadingSpinner,
  SrOnly,
  useIsSmallScreen,
  useSearchTranslation,
  getLargeEventCardId,
  useEventListQuery,
  MAIN_CONTENT_ID,
} from 'events-helsinki-components';
import { useRouter } from 'next/router';
import qs from 'query-string';
import React from 'react';
import { useConfig } from 'react-helsinki-headless-cms';
import { scroller } from 'react-scroll';
import { toast } from 'react-toastify';
import EventList from '../../../common-events/components/eventList/EventList';
import { SEARCH_ROUTES } from '../../../constants';
import { removeQueryParamsFromRouter } from '../../../utils/routerUtils';
import type { ISearchPage } from '../combinedSearch/types';
import type { AdvancedSearchProps } from './AdvancedSearch';
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from './constants';
import styles from './eventSearchPage.module.scss';
import SearchResultsContainer from './searchResultList/SearchResultsContainer';
import { getEventSearchVariables, getNextPage } from './utils';

export function useSearchPage({
  eventType,
}: {
  eventType: EventTypeId;
}): ISearchPage {
  const { t } = useSearchTranslation();
  const router = useRouter();
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const isSmallScreen = useIsSmallScreen();
  const { meta } = useConfig();
  const params: { place?: string; eventType?: string } = router.query;
  const eventFilters = React.useMemo(() => {
    const searchParams = new URLSearchParams(qs.stringify(router.query));
    const variables: QueryEventListArgs = getEventSearchVariables({
      include: ['keywords', 'location'],
      pageSize: PAGE_SIZE,
      params: searchParams,
      place: params.place,
      sortOrder: EVENT_SORT_OPTIONS.END_TIME,
      superEventType: ['umbrella', 'none'],
      eventType: [eventType],
    });
    return variables;
  }, [router.query, params.place, eventType]);

  // Query for the primary search / active search tab
  const {
    data: eventsData,
    fetchMore,
    loading: isLoadingEvents,
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

  const scrollToResultList = React.useCallback(() => {
    if (isSmallScreen) {
      scroller.scrollTo('resultList', {
        delay: 0,
        duration: 1000,
        offset: -50,
        smooth: true,
      });
    }
  }, [isSmallScreen]);

  const scrollToResultCard = (id: string) => {
    scroller.scrollTo(id, {
      delay: 0,
      duration: 300,
      offset: -50,
      smooth: true,
    });
  };

  const initialPageOnLoad = React.useCallback(() => {
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
      removeQueryParamsFromRouter(
        router,
        ['eventId'],
        SEARCH_ROUTES.COURSESEARCH
      );
    }
  }, [router, scrollToResultList]);

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

const SearchPage: React.FC<{
  SearchComponent?: React.FC<AdvancedSearchProps>;
  pageTitle: string;
  eventType: EventTypeId;
}> = ({ SearchComponent, pageTitle, eventType }) => {
  const { t } = useSearchTranslation();
  const {
    resultList,
    handleLoadMore,
    isLoading: isLoadingEvents,
    isFetchingMore,
    meta,
    scrollToResultList,
    initialPageOnLoad,
    count,
    hasNext,
  } = useSearchPage({ eventType });

  const eventsList = resultList as EventListQuery['eventList'];

  React.useEffect(() => {
    initialPageOnLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BasicMeta
        title={pageTitle}
        appleTouchIconUrl={meta?.appleTouchIconUrl}
        favIconUrl={meta?.favIconUrl}
        favIconSvgUrl={meta?.favIconSvgUrl}
        manifestUrl={meta?.manifestUrl}
      />
      <SrOnly as="h1">{pageTitle}</SrOnly>
      {SearchComponent && (
        <SearchComponent
          scrollToResultList={scrollToResultList}
          data-testid="searchContainer"
        />
      )}
      <main id={MAIN_CONTENT_ID}>
        <div
          className={styles.resultList}
          id="resultList"
          data-testid="resultList"
        >
          <SrOnly aria-live="polite" aria-atomic={true}>
            {isLoadingEvents
              ? t('search:ariaLiveLoading')
              : t('search:ariaLiveSearchReady', {
                  count: eventsList?.meta.count,
                })}
          </SrOnly>
          <LoadingSpinner
            className={styles.spinner}
            isLoading={
              (!isFetchingMore && isLoadingEvents) || !eventsList?.data
            }
          >
            {eventsList && (
              <SearchResultsContainer
                eventsCount={eventsList.meta.count}
                loading={isLoadingEvents}
                eventList={
                  <EventList
                    cardSize="large"
                    events={eventsList.data}
                    hasNext={hasNext}
                    count={count}
                    loading={isFetchingMore}
                    onLoadMore={handleLoadMore}
                  />
                }
              />
            )}
          </LoadingSpinner>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
