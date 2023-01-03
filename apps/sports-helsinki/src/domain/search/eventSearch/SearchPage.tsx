import type { QueryEventListArgs } from 'events-helsinki-components';
import {
  BasicMeta,
  LoadingSpinner,
  SrOnly,
  useIsSmallScreen,
  useSearchTranslation,
  getLargeEventCardId,
  useEventListQuery,
  MAIN_CONTENT_ID,
  EventTypeId,
  useEventListLazyQuery,
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
import type {
  CombinedSearchProps,
  SearchResultItemsCount,
} from '../combinedSearch/CombinedSearch';
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from './constants';
import styles from './eventSearchPage.module.scss';
import SearchResultsContainer from './searchResultList/SearchResultsContainer';
import { getEventSearchVariables, getNextPage } from './utils';

const SearchPage: React.FC<{
  SearchComponent: React.FC<CombinedSearchProps>;
  pageTitle: string;
}> = ({ SearchComponent, pageTitle }) => {
  const { t } = useSearchTranslation();
  const router = useRouter();
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const isSmallScreen = useIsSmallScreen();
  const { meta } = useConfig();

  const params: { place?: string; eventType?: string } = router.query;
  const eventTypes = Object.keys(EventTypeId);
  const primarySearchEventType = eventTypes.find(
    (e) => (params.eventType as EventTypeId) === e
  ) as EventTypeId;
  const secondarySearchEventType = eventTypes.find(
    (e) => (params.eventType as EventTypeId) !== e
  ) as EventTypeId;

  const eventFilters = React.useMemo(() => {
    const searchParams = new URLSearchParams(qs.stringify(router.query));
    const variables: QueryEventListArgs = getEventSearchVariables({
      include: ['keywords', 'location'],
      pageSize: PAGE_SIZE,
      params: searchParams,
      place: params.place,
      sortOrder: EVENT_SORT_OPTIONS.END_TIME,
      superEventType: ['umbrella', 'none'],
      eventType: [primarySearchEventType],
    });
    return variables;
  }, [router.query, params.place, primarySearchEventType]);

  // Query for the primary search / active search tab
  const {
    data: eventsData,
    fetchMore,
    loading: isLoadingEvents,
  } = useEventListQuery({
    skip: !primarySearchEventType,
    ssr: false,
    variables: eventFilters,
  });

  // Query for the count of the secondary search tab
  const [getSecondarySearchResults, { data: secondarySearchData }] =
    useEventListLazyQuery({
      ssr: false,
      variables: {
        ...eventFilters,
        // Query with the another type
        eventType: [secondarySearchEventType],
      },
    });

  React.useEffect(() => {
    if (eventsData && !isLoadingEvents) getSecondarySearchResults();
  }, [eventsData, getSecondarySearchResults, isLoadingEvents]);

  // The primary data that is shown in the list
  const eventsList = eventsData?.eventList;

  // search status is used to give data for search utilities
  const searchStatus: SearchResultItemsCount = Object.assign(
    // Initial value is null for each search type
    { [EventTypeId.Course]: null, [EventTypeId.General]: null, Venue: null },
    // Set the actual valu for search types
    {
      [primarySearchEventType]: eventsData?.eventList.meta.count,
      [secondarySearchEventType]: secondarySearchData?.eventList.meta.count,
    }
  );

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
        toast.error(t('search:errorLoadMode'));
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

  const scrollToEventCard = (id: string) => {
    scroller.scrollTo(id, {
      delay: 0,
      duration: 300,
      offset: -50,
      smooth: true,
    });
  };

  React.useEffect(() => {
    if (router.asPath && router.query?.scrollToResults) {
      scrollToResultList();
    } else if (router.query?.eventId) {
      scrollToEventCard(
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
      <SearchComponent
        scrollToResultList={scrollToResultList}
        data-testid="searchContainer"
        searchStatus={searchStatus}
      />
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
                    hasNext={!!eventsList.meta.next}
                    count={eventsList.meta.count}
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
