import { useLazyQuery } from '@apollo/client';
import classNames from 'classnames';
import type {
  EventListQuery,
  SearchListQuery,
} from 'events-helsinki-components';
import {
  useSearchTranslation,
  EventTypeId,
  useAppSportsTranslation,
  getURLSearchParamsFromAsPath,
  useCommonTranslation,
  EventListDocument,
  SearchListDocument,
} from 'events-helsinki-components';
import { Button } from 'hds-react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { ContentContainer, PageSection } from 'react-helsinki-headless-cms';
import AppConfig from 'domain/app/AppConfig';
import useUnifiedSearchVariables from 'domain/unifiedSearch/useUnifiedSearchVariables';
import { SEARCH_ROUTES } from '../../../constants';
import EventSearchPage, {
  useEventSearchFilters,
} from '../eventSearch/SearchPage';
import VenueSearchPage from '../venueSearch/SearchPage';
import { SimpleVenueSearchForm } from '../venueSearch/VenueSearch';
import styles from './combinedSearchPage.module.scss';
import SearchTabs from './searchTabs/SearchTabs';
import type { SearchTabId } from './searchTabs/tabsContext';
import { isSearchTabId, useTabsContext } from './searchTabs/tabsContext';
import type { SearchComponentType } from './types';

export const searchContainerDataTestId = 'combinedSearchContainer';

/**
 * Use an URL parameter to scroll to
 * the previously used search result card on a page change.
 */
const useScrollToSearchResultItem = () => {
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const listElement = listRef.current;

    if (scrollTo) {
      const listItemElement = listElement?.querySelector(
        decodeURIComponent(scrollTo.toString())
      );

      if (listItemElement) {
        listItemElement.scrollIntoView({
          block: 'center',
        });
      }
    }
  }, [scrollTo]);
};

const useSearchTabsWithParams = (defaultTab: SearchTabId) => {
  const router = useRouter();
  const searchParams = new URLSearchParams(router.asPath.split('?')[1]);
  const searchTypeParam = searchParams.get('searchType');
  const initTab = searchTypeParam
    ? (searchTypeParam as SearchTabId)
    : defaultTab;

  // If the search type param is not given in the URL, set it there.
  React.useEffect(() => {
    if (!isSearchTabId(searchTypeParam)) {
      router.push(
        { query: { ...router.query, searchType: defaultTab } },
        undefined,
        { shallow: true }
      );
    }
  }, [searchTypeParam, router, defaultTab]);

  return { initTab, searchTypeParam };
};

export function useLazyVenueSearchForTabCount() {
  const { setResultCount } = useTabsContext();
  const venueSearchFilters = useUnifiedSearchVariables();
  const variables = React.useMemo(
    () => ({
      ...venueSearchFilters,
      includeHaukiFields: AppConfig.isHaukiEnabled,
    }),
    [venueSearchFilters]
  );
  const [search, { loading, data, ...delegatedProps }] = useLazyQuery(
    SearchListDocument,
    {
      variables,
      // FIXME: Set the fetch policy to not trigger cache,
      // or the Apollo client fails to request
      // same query multiple times. Depending on settings,
      // the client stops the query when the first response is given,
      // and uses the cache for the next query with same name or
      // returns the items twice.
      // Since the query is exactly the same as the actual listing query,
      // it would be really nice to have the result in cache already.
      // See https://community.apollographql.com/t/executing-the-same-query-multiple-times-with-different-variables/3052
      fetchPolicy: 'no-cache',
      ssr: false,
    }
  );

  React.useEffect(() => {
    const count = () => {
      if (loading || !data) {
        return null;
      }
      return (data as SearchListQuery)?.unifiedSearch?.count ?? 0;
    };
    setResultCount('Venue', count());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  return { search, loading, data, ...delegatedProps };
}

export function useLazyEventSearchForTabCount({
  eventType,
}: {
  eventType: EventTypeId;
}) {
  const { setResultCount } = useTabsContext();
  const variables = useEventSearchFilters(eventType);
  const [search, { loading, data, ...delegatedProps }] = useLazyQuery(
    EventListDocument,
    {
      variables,
      // FIXME: Set the fetch policy to not trigger cache,
      // or the Apollo client fails to request
      // same query multiple times. Depending on settings,
      // the client stops the query when the first response is given,
      // and uses the cache for the next query with same name or
      // returns the items twice.
      // Since the query is exactly the same as the actual listing query,
      // it would be really nice to have the result in cache already.
      // See https://community.apollographql.com/t/executing-the-same-query-multiple-times-with-different-variables/3052
      fetchPolicy: 'no-cache',
      ssr: false,
    }
  );

  React.useEffect(() => {
    const count = () => {
      if (loading || !data) {
        return null;
      }
      return ((data as EventListQuery)?.eventList?.meta.count as number) ?? 0;
    };
    setResultCount(eventType, count());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, eventType]);

  return { search, loading, data, ...delegatedProps };
}

export function useSearchTabResultCounts() {
  const { search: venueSearch } = useLazyVenueSearchForTabCount();
  const { search: generalEventSearch } = useLazyEventSearchForTabCount({
    eventType: EventTypeId.General,
  });
  const { search: courseEventSearch } = useLazyEventSearchForTabCount({
    eventType: EventTypeId.Course,
  });
  React.useEffect(() => {
    venueSearch();
    generalEventSearch();
    courseEventSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

const VenueSearchPanel: React.FC = () => {
  const { t } = useAppSportsTranslation();
  useScrollToSearchResultItem();
  return (
    <VenueSearchPage
      SearchComponent={undefined}
      pageTitle={t('appSports:search.pageTitle')}
    />
  );
};

const EventSearchPanel: React.FC<{ eventType: EventTypeId }> = ({
  eventType,
}) => {
  const { t } = useSearchTranslation();
  useScrollToSearchResultItem();
  return (
    <EventSearchPage
      SearchComponent={undefined}
      pageTitle={t('search:search.labelSearchField')}
      eventType={eventType}
    />
  );
};

export type SearchComponentProps = {
  'data-testid'?: string;
  korosBottom?: boolean;
  searchUtilities?: React.ReactNode;
  className?: string;
} & SearchComponentType;

export const SearchForm: React.FC<SearchComponentProps> = ({
  'data-testid': dataTestId,
  korosBottom = false,
  className,
  ...delegatedSimpleVenueSearchFormProps
}) => {
  return (
    <PageSection
      korosBottom={korosBottom}
      korosBottomClassName={styles.searchContainerKoros}
      className={classNames(styles.searchContainer, className, {
        [styles.noKoros]: !korosBottom,
      })}
      data-testid={dataTestId}
    >
      <ContentContainer
        className={classNames(styles.contentContainer, {
          [styles.noKoros]: !korosBottom,
        })}
      >
        <SimpleVenueSearchForm {...delegatedSimpleVenueSearchFormProps} />
      </ContentContainer>
    </PageSection>
  );
};

export const SearchUtilities: React.FC = () => {
  const { t: tSearch } = useSearchTranslation();
  const { t: tCommon } = useCommonTranslation();
  const router = useRouter();
  const switchShowMode = () => {
    const searchParams = getURLSearchParamsFromAsPath(router.asPath);
    router.replace({
      pathname: SEARCH_ROUTES.MAPSEARCH,
      query: searchParams.toString(),
    });
  };
  const { activeTab } = useTabsContext();
  useSearchTabResultCounts();

  return (
    <PageSection className={styles.searchUtilities}>
      <ContentContainer className={styles.contentContainer}>
        <SearchTabs.TabList>
          <SearchTabs.Tab id="Venue">
            <SearchTabs.CountLabel
              id="Venue"
              label={tSearch('search:search.searchType.venue')}
            />
          </SearchTabs.Tab>
          <SearchTabs.Tab id={EventTypeId.General}>
            <SearchTabs.CountLabel
              id={EventTypeId.General}
              label={tSearch('search:search.searchType.generalEventType')}
            />
          </SearchTabs.Tab>
          <SearchTabs.Tab id={EventTypeId.Course}>
            <SearchTabs.CountLabel
              id={EventTypeId.Course}
              label={tSearch('search:search.searchType.courseEventType')}
            />
          </SearchTabs.Tab>
        </SearchTabs.TabList>

        {activeTab === 'Venue' ? (
          <Button variant="secondary" onClick={switchShowMode}>
            {tCommon('common:mapSearch.showOnMap')}
          </Button>
        ) : null}
      </ContentContainer>
    </PageSection>
  );
};

export type CombinedSearchPageProps = { defaultTab: SearchTabId };

const CombinedSearchPage: React.FC<CombinedSearchPageProps> = ({
  defaultTab = 'Venue',
}) => {
  const { initTab } = useSearchTabsWithParams(defaultTab);

  return (
    <div>
      <SearchTabs initTab={initTab}>
        {/* The search form */}
        <SearchForm
          data-testid={searchContainerDataTestId}
          searchRoute={SEARCH_ROUTES.SEARCH}
          searchUtilities={null}
          korosBottom
          showTitle
          scrollToResultList={() => true}
        />

        {/* The search tabs, query sorters, search type switchers, etc. */}
        <SearchUtilities />

        {/* The Venue Search results */}
        <SearchTabs.Panel id="Venue">
          <VenueSearchPanel />
        </SearchTabs.Panel>

        {/* The General Event Search results */}
        <SearchTabs.Panel id={EventTypeId.General}>
          <EventSearchPanel eventType={EventTypeId.General} />
        </SearchTabs.Panel>

        {/* The Course Search results */}
        <SearchTabs.Panel id={EventTypeId.Course}>
          <EventSearchPanel eventType={EventTypeId.Course} />
        </SearchTabs.Panel>
      </SearchTabs>
    </div>
  );
};

export default CombinedSearchPage;
