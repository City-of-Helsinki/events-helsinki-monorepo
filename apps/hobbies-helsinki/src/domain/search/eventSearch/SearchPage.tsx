import type { QueryEventListArgs } from '@events-helsinki/components';
import {
  useCmsRoutedAppHelper,
  BasicMeta,
  LoadingSpinner,
  SrOnly,
  useIsSmallScreen,
  useSearchTranslation,
  getLargeEventCardId,
  useEventListQuery,
  MAIN_CONTENT_ID,
  EVENT_SORT_OPTIONS,
  EventList,
  useClearClosedEventsFromApolloCache,
  HELSINKI_OCD_DIVISION_ID,
  EVENT_SEARCH_FILTERS,
} from '@events-helsinki/components';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React from 'react';
import { useConfig } from 'react-helsinki-headless-cms';
import { scroller } from 'react-scroll';
import { toast } from 'react-toastify';

import { ROUTES } from '../../../constants';
import AppConfig from '../../app/AppConfig';
import styles from './eventSearchPage.module.scss';
import SearchResultsContainer from './searchResultList/SearchResultsContainer';
import { getEventSearchVariables, getEventUrl, getNextPage } from './utils';

const useSearchQuery = () => {
  const router = useRouter();
  const params: { place?: string } = router.query;

  const eventFilters = React.useMemo(() => {
    const searchParams = new URLSearchParams(
      queryString.stringify(router.query)
    );
    const variables: QueryEventListArgs = getEventSearchVariables({
      include: AppConfig.eventSearchQueryIncludeParamValue,
      pageSize: AppConfig.pageSize,
      params: searchParams,
      place: params.place,
      sortOrder: EVENT_SORT_OPTIONS.END_TIME,
      // Always filter with HELSINKI_OCD_DIVISION_ID to limit the results to city of Helsinki events.
      // NOTE: This is not needed if using any `*Ongoing` -filter as
      // they automatically limit the results to city of Helsinki events.
      [EVENT_SEARCH_FILTERS.DIVISIONS]: [HELSINKI_OCD_DIVISION_ID],
      // Don't use superEventType when experimenting:
      // LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512)
      // superEventType: ['umbrella', 'none']
      // Set the superEvent param to "none" for courses;
      // LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512)
      superEvent: 'none',
    });
    return variables;
  }, [router.query, params.place]);

  return useEventListQuery({
    ssr: false,
    variables: eventFilters,
  });
};

const SearchPage: React.FC<{
  SearchComponent: React.FC<{
    scrollToResultList: () => void;
    'data-testid'?: string;
  }>;
  pageTitle: string;
}> = ({ SearchComponent, pageTitle }) => {
  const { t } = useSearchTranslation();
  const router = useRouter();

  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const isSmallScreen = useIsSmallScreen();
  const routerHelper = useCmsRoutedAppHelper();
  const { meta } = useConfig();

  const {
    data: eventsData,
    fetchMore,
    loading: isLoadingEvents,
  } = useSearchQuery();

  const eventsList = eventsData?.eventList;

  // Clear the cache from the events of the past
  useClearClosedEventsFromApolloCache(eventsData);

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
        // eslint-disable-next-line no-console
        console.error('handleLoadMore', 'error in fetchMore', e);
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
      routerHelper.removeQueryParamsFromRouter(
        router,
        ['eventId'],
        ROUTES.SEARCH
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BasicMeta
        appleTouchIconUrl={meta?.appleTouchIconUrl}
        favIconUrl={meta?.favIconUrl}
        favIconSvgUrl={meta?.favIconSvgUrl}
        manifestUrl={meta?.manifestUrl}
      />
      <SrOnly as="h1">{pageTitle}</SrOnly>
      <SearchComponent
        scrollToResultList={scrollToResultList}
        data-testid="searchContainer"
      />
      <main id={MAIN_CONTENT_ID}>
        <div
          className={styles.resultList}
          id="resultList"
          data-testid="resultList"
        >
          <SrOnly aria-live="polite" aria-atomic={true}>
            {isLoadingEvents || isFetchingMore
              ? t('search:ariaLiveLoading')
              : t('search:ariaLiveSearchReady', {
                  totalCount: eventsList?.meta.count,
                  shownCount: eventsList?.data.length,
                })}
          </SrOnly>
          <LoadingSpinner
            className={styles.spinner}
            isLoading={!isFetchingMore && isLoadingEvents}
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
                    getEventUrl={(event, router, locale) =>
                      getEventUrl(event, router, locale)
                    }
                    showEnrolmentStatusInCardDetails={
                      AppConfig.showEnrolmentStatusInCardDetails
                    }
                    loadMoreButtonVariant="primary"
                    loadMoreButtonTheme="coat"
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
