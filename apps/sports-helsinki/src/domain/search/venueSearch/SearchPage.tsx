import type { Venue } from 'events-helsinki-components';
import {
  BasicMeta,
  getLargeEventCardId,
  LoadingSpinner,
  MAIN_CONTENT_ID,
  SrOnly,
  useIsSmallScreen,
  useSearchTranslation,
  useUnifiedSearchListQuery,
  useUnifiedSearch,
} from 'events-helsinki-components';
import { useRouter } from 'next/router';
import React from 'react';
import { useConfig } from 'react-helsinki-headless-cms';
import { scroller } from 'react-scroll';
import AppConfig from 'domain/app/AppConfig';

import { removeQueryParamsFromRouter } from 'utils/routerUtils';
import SearchResultsContainer from '../eventSearch/searchResultList/SearchResultsContainer';
import VenueList from '../venueList/VenueList';
import styles from './eventSearchPage.module.scss';

const BLOCK_SIZE = 10;

const SearchPage: React.FC<{
  SearchComponent: React.FC<{
    scrollToResultList: () => void;
    'data-testid'?: string;
  }>;
  pageTitle: string;
}> = ({ SearchComponent, pageTitle }) => {
  const { t } = useSearchTranslation();
  const router = useRouter();
  const { meta } = useConfig();
  const isSmallScreen = useIsSmallScreen();
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const { filters, setFilters } = useUnifiedSearch();
  const {
    data: venuesData,
    loading: isLoadingVenues,
    fetchMore,
  } = useUnifiedSearchListQuery({
    variables: { includeHaukiFields: AppConfig.isHaukiEnabled },
  });

  const venuesList: Venue[] =
    venuesData?.unifiedSearch?.edges.reduce(
      (venues: Venue[], edge) =>
        edge.node.venue ? [...venues, edge.node.venue as Venue] : venues,
      []
    ) ?? [];
  const count = (venuesData?.unifiedSearch?.count as number) ?? 0;
  const pageInfo = venuesData?.unifiedSearch?.pageInfo;
  const afterCursor = pageInfo?.endCursor;
  const hasNext = pageInfo?.hasNextPage ?? false;

  const handleLoadMore = async () => {
    const pagination = {
      first: BLOCK_SIZE,
      after: afterCursor,
    };
    setIsFetchingMore(true);

    setFilters(filters, undefined, {
      scroll: false,
      shallow: true,
    });

    fetchMore(pagination).then(() => {
      setIsFetchingMore(false);
    });
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
      />
      <main id={MAIN_CONTENT_ID}>
        <div
          className={styles.resultList}
          id="resultList"
          data-testid="resultList"
        >
          <SrOnly aria-live="polite" aria-atomic={true}>
            {isLoadingVenues
              ? t('search:ariaLiveLoading')
              : t('search:ariaLiveSearchReady', {
                  count,
                })}
          </SrOnly>
          <LoadingSpinner
            className={styles.spinner}
            isLoading={!isFetchingMore && isLoadingVenues}
          >
            {venuesList && (
              <SearchResultsContainer
                eventsCount={count}
                loading={isLoadingVenues}
                eventList={
                  <VenueList
                    cardSize="large"
                    venues={venuesList}
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
