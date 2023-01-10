import type { UnifiedSearchVenue } from 'events-helsinki-components';
import {
  getURLSearchParamsFromAsPath,
  BasicMeta,
  getLargeEventCardId,
  LoadingSpinner,
  MAIN_CONTENT_ID,
  SrOnly,
  useIsSmallScreen,
  useSearchTranslation,
  useUnifiedSearch,
} from 'events-helsinki-components';
import { useRouter } from 'next/router';
import React from 'react';
import { useConfig } from 'react-helsinki-headless-cms';
import { scroller } from 'react-scroll';
import { toast } from 'react-toastify';
import { SEARCH_ROUTES } from '../../../constants';
import { removeQueryParamsFromRouter } from '../../../utils/routerUtils';
import AppConfig from '../../app/AppConfig';
import useUnifiedSearchListQuery from '../../unifiedSearch/useUnifiedSearchListQuery';
import SearchResultsContainer from '../eventSearch/searchResultList/SearchResultsContainer';
import VenueList from '../venueList/VenueList';
import styles from './eventSearchPage.module.scss';
import type { SearchComponentProps } from './VenueSearch';
import { VenueSearchUtilities } from './VenueSearch';

const BLOCK_SIZE = 10;
export const searchContainerDataTestId = 'searchContainer';

type SearchPageProps = {
  SearchComponent: React.FC<SearchComponentProps>;
  pageTitle: string;
};

const SearchPage: React.FC<SearchPageProps> = ({
  SearchComponent,
  pageTitle,
}) => {
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
    variables: {
      includeHaukiFields: AppConfig.isHaukiEnabled,
    },
  });
  const venuesList = React.useMemo(
    () =>
      venuesData?.unifiedSearch?.edges.reduce(
        (venues: UnifiedSearchVenue[], edge) =>
          edge.node.venue
            ? [...venues, edge.node.venue as UnifiedSearchVenue]
            : venues,
        []
      ) ?? [],
    [venuesData]
  );
  const count = (venuesData?.unifiedSearch?.count as number) ?? 0;
  const pageInfo = venuesData?.unifiedSearch?.pageInfo;
  const hasNext = pageInfo?.hasNextPage ?? false;
  const handleLoadMore = async () => {
    const afterCursor = pageInfo?.endCursor;
    const pagination = {
      first: BLOCK_SIZE,
      after: afterCursor,
    };
    setIsFetchingMore(true);

    setFilters(filters, undefined, {
      scroll: false,
      shallow: true,
    });
    try {
      await fetchMore({ ...pagination });
    } catch (e) {
      toast.error(t('search:errorLoadMore'));
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
    } else if (router.query?.venueId) {
      scrollToEventCard(
        getLargeEventCardId(
          Array.isArray(router.query.venueId)
            ? router.query.venueId[0]
            : router.query.venueId
        )
      );
      removeQueryParamsFromRouter(router, ['venueId'], SEARCH_ROUTES.SEARCH);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchShowMode = () => {
    const searchParams = getURLSearchParamsFromAsPath(router.asPath);

    router.replace({
      pathname: SEARCH_ROUTES.MAPSEARCH,
      query: searchParams.toString(),
    });
  };

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
        data-testid={searchContainerDataTestId}
        searchUtilities={
          <VenueSearchUtilities switchShowMode={switchShowMode} />
        }
        showTitle
        korosBottom
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
