import type { QueryEventListArgs } from '@events-helsinki/components';
import {
  LoadingSpinner,
  SrOnly,
  useSearchTranslation,
  useEventListQuery,
  BasicMeta,
  MAIN_CONTENT_ID,
  EventsOrderBySelect,
  DEFAULT_EVENT_SORT_OPTION,
  isEventSortOption,
  EventList,
  useClearClosedEventsFromApolloCache,
  HELSINKI_OCD_DIVISION_ID,
  EVENT_SEARCH_FILTERS,
} from '@events-helsinki/components';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React from 'react';
import { useConfig } from 'react-helsinki-headless-cms';
import { toast } from 'react-toastify';

import AppConfig from '../../app/AppConfig';
import styles from './eventSearchPage.module.scss';
import SearchResultsContainer from './searchResultList/SearchResultsContainer';
import { getEventSearchVariables, getEventUrl, getNextPage } from './utils';

const useSearchQuery = () => {
  const router = useRouter();
  const eventFilters = React.useMemo(() => {
    const searchParams = new URLSearchParams(
      queryString.stringify(router.query)
    );
    const sortParam = searchParams.get('sort');
    const variables: QueryEventListArgs = getEventSearchVariables({
      include: ['keywords', 'location'],
      pageSize: AppConfig.pageSize,
      params: searchParams,
      sortOrder: isEventSortOption(sortParam)
        ? sortParam
        : DEFAULT_EVENT_SORT_OPTION,
      // Always filter with HELSINKI_OCD_DIVISION_ID to limit the results to city of Helsinki events.
      // NOTE: This is not needed if using any `*Ongoing` -filter as
      // they automatically limit the results to city of Helsinki events.
      [EVENT_SEARCH_FILTERS.DIVISIONS]: [HELSINKI_OCD_DIVISION_ID],
      // Don't use superEventType when experimenting
      // LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512)
      // superEventType: ['umbrella', 'none']
      // Only the course type search should use this param;
      // LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512)
      // superEvent: 'none',
    });
    return variables;
  }, [router.query]);

  return useEventListQuery({
    ssr: false,
    variables: eventFilters,
  });
};

const SearchPage: React.FC<{
  SearchComponent: React.FC<{
    'data-testid'?: string;
  }>;
  pageTitle: string;
}> = ({ SearchComponent, pageTitle }) => {
  const { t } = useSearchTranslation();
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);

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

  return (
    <div>
      <BasicMeta
        appleTouchIconUrl={meta?.appleTouchIconUrl}
        favIconUrl={meta?.favIconUrl}
        favIconSvgUrl={meta?.favIconSvgUrl}
        manifestUrl={meta?.manifestUrl}
      />
      <SrOnly as="h1">{pageTitle}</SrOnly>
      <SearchComponent data-testid="searchContainer" />
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
                    loadMoreButtonVariant="success"
                  />
                }
                orderBySelectComponent={<EventsOrderBySelect />}
              />
            )}
          </LoadingSpinner>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
