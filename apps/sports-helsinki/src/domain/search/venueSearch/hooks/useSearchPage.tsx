import {
  useSearchTranslation,
  useIsSmallScreen,
  useUnifiedSearch,
  getLargeEventCardId,
} from 'events-helsinki-components';
import type { UnifiedSearchVenue } from 'events-helsinki-components';
import { useRouter } from 'next/router';
import React from 'react';
import { useConfig } from 'react-helsinki-headless-cms';
import { scroller } from 'react-scroll';
import { toast } from 'react-toastify';
import AppConfig from 'domain/app/AppConfig';
import type { SearchPage } from 'domain/search/combinedSearch/types';
import useUnifiedSearchListQuery from 'domain/unifiedSearch/useUnifiedSearchListQuery';
import { SEARCH_ROUTES } from '../../../../constants';
import { removeQueryParamsFromRouter } from '../../../../utils/routerUtils';

const BLOCK_SIZE = 10;

function useSearchPage(): SearchPage {
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
  const resultList = venuesData?.unifiedSearch;
  const pageInfo = resultList?.pageInfo;

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
    } else if (router.query?.venueId) {
      scrollToResultCard(
        getLargeEventCardId(
          Array.isArray(router.query.venueId)
            ? router.query.venueId[0]
            : router.query.venueId
        )
      );
      removeQueryParamsFromRouter(router, ['venueId'], SEARCH_ROUTES.SEARCH);
    }
  };

  const venuesList = React.useMemo(
    () =>
      resultList?.edges.reduce(
        (venues: UnifiedSearchVenue[], edge) =>
          edge.node.venue
            ? [...venues, edge.node.venue as UnifiedSearchVenue]
            : venues,
        []
      ) ?? [],
    [resultList]
  );

  const count = (resultList?.count as number) ?? 0;
  const hasNext = pageInfo?.hasNextPage ?? false;

  return {
    searchFilters: filters,
    meta,
    isSmallScreen,
    handleLoadMore,
    isFetchingMore,
    isLoading: isLoadingVenues,
    scrollToResultList,
    scrollToResultCard,
    resultList: venuesList,
    initialPageOnLoad,
    count,
    hasNext,
  };
}

export default useSearchPage;
