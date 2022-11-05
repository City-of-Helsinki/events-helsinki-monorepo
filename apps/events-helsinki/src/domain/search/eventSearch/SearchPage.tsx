import {
  LoadingSpinner,
  SrOnly,
  useIsSmallScreen,
  useSearchTranslation,
  MAIN_CONTENT_ID,
} from 'events-helsinki-components';
import { useRouter } from 'next/router';
import qs from 'query-string';
import React from 'react';
import { scroller } from 'react-scroll';
import { toast } from 'react-toastify';

import EventList from '../../../common-events/components/eventList/EventList';
import { removeQueryParamsFromRouter } from '../../../utils/routerUtils';
import { getLargeEventCardId } from '../../event/EventUtils';
import type { QueryEventListArgs } from '../../nextApi/graphql/generated/graphql';
import { useEventListQuery } from '../../nextApi/graphql/generated/graphql';
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from './constants';
import styles from './eventSearchPage.module.scss';
import SearchResultsContainer from './searchResultList/SearchResultsContainer';
import { getEventSearchVariables, getNextPage } from './utils';

const SearchPage: React.FC<{
  SearchComponent: React.FC<{
    scrollToResultList: () => void;
    'data-testid'?: string;
  }>;
  pageTitle: string;
}> = ({ SearchComponent, pageTitle }) => {
  const { t } = useSearchTranslation();
  const router = useRouter();
  const params: { place?: string } = router.query;

  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const isSmallScreen = useIsSmallScreen();

  const eventFilters = React.useMemo(() => {
    const searchParams = new URLSearchParams(qs.stringify(router.query));
    const variables: QueryEventListArgs = getEventSearchVariables({
      include: ['keywords', 'location'],
      pageSize: PAGE_SIZE,
      params: searchParams,
      place: params.place,
      sortOrder: EVENT_SORT_OPTIONS.END_TIME,
      superEventType: ['umbrella', 'none'],
    });
    return variables;
  }, [router.query, params.place]);

  const {
    data: eventsData,
    fetchMore,
    loading: isLoadingEvents,
  } = useEventListQuery({
    ssr: false,
    variables: eventFilters,
  });

  const eventsList = eventsData?.eventList;

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
      removeQueryParamsFromRouter(router, ['eventId']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
                    loading={isLoadingEvents}
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
