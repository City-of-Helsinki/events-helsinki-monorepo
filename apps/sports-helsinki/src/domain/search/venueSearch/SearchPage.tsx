import type { UnifiedSearchVenue } from '@events-helsinki/components';
import {
  getURLSearchParamsFromAsPath,
  BasicMeta,
  LoadingSpinner,
  MAIN_CONTENT_ID,
  SrOnly,
  useSearchTranslation,
} from '@events-helsinki/components';
import { useRouter } from 'next/router';
import React from 'react';
import { SEARCH_ROUTES } from '../../../constants';
import SearchResultsContainer from '../eventSearch/searchResultList/SearchResultsContainer';
import UnifiedSearchOrderBySelect from '../eventSearch/searchResultList/UnifiedSearchOrderBySelect';
import VenueList from '../venueList/VenueList';
import styles from './eventSearchPage.module.scss';
import useSearchPage from './hooks/useSearchPage';
import type { SearchComponentProps } from './VenueSearch';
import { VenueSearchUtilities } from './VenueSearch';

export const searchContainerDataTestId = 'searchContainer';

type SearchPageProps = {
  SearchComponent?: React.FC<SearchComponentProps>;
  pageTitle: string;
};

const VenueSearchPage: React.FC<SearchPageProps> = ({
  SearchComponent,
  pageTitle,
}) => {
  const { t } = useSearchTranslation();
  const router = useRouter();
  const {
    resultList,
    handleLoadMore,
    isLoading: isLoadingVenues,
    isFetchingMore,
    meta,
    scrollToResultList,
    initialPageOnLoad,
    count,
    hasNext,
  } = useSearchPage();

  const venuesList = resultList as UnifiedSearchVenue[];

  React.useEffect(() => {
    initialPageOnLoad();
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
      {SearchComponent && (
        <SearchComponent
          scrollToResultList={scrollToResultList}
          data-testid={searchContainerDataTestId}
          searchUtilities={
            <VenueSearchUtilities switchShowMode={switchShowMode} />
          }
          showTitle
          korosBottom
        />
      )}
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
                itemType="Venue"
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
                orderBySelectComponent={<UnifiedSearchOrderBySelect />}
              />
            )}
          </LoadingSpinner>
        </div>
      </main>
    </div>
  );
};

export default VenueSearchPage;
