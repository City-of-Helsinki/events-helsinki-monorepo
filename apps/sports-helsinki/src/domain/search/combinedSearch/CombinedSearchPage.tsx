import {
  useSearchTranslation,
  EventTypeId,
  useAppSportsTranslation,
  getURLSearchParamsFromAsPath,
  useCommonTranslation,
} from 'events-helsinki-components';
import { Button } from 'hds-react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { ContentContainer, PageSection } from 'react-helsinki-headless-cms';
import { SEARCH_ROUTES } from '../../../constants';
import EventSearchPage from '../eventSearch/SearchPage';
import VenueSearchPage from '../venueSearch/SearchPage';
import SimpleVenueSearch from '../venueSearch/VenueSearch';
import styles from './combinedSearchPage.module.scss';
import SearchTabs from './searchTabs/SearchTabs';
import type { SearchTabId } from './tabsContext';
import { isSearchTabId, TabsContext } from './tabsContext';

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

const VenueSearch: React.FC = () => {
  const { t } = useAppSportsTranslation();
  useScrollToSearchResultItem();
  return (
    <VenueSearchPage
      SearchComponent={undefined}
      pageTitle={t('appSports:search.pageTitle')}
    />
  );
};

const EventSearch: React.FC<{ eventType: EventTypeId }> = ({ eventType }) => {
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

export type CombinedSearchPageProps = { defaultTab: SearchTabId };

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

export const SearchUtilities: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PageSection className={styles.searchUtilities}>
      <ContentContainer className={styles.contentContainer}>
        {children}
      </ContentContainer>
    </PageSection>
  );
};

const CombinedSearchPage: React.FC<CombinedSearchPageProps> = ({
  defaultTab = 'Venue',
}) => {
  const { t: tSearch } = useSearchTranslation();
  const { t: tCommon } = useCommonTranslation();
  const router = useRouter();
  const { initTab } = useSearchTabsWithParams(defaultTab);
  const switchShowMode = () => {
    const searchParams = getURLSearchParamsFromAsPath(router.asPath);
    router.replace({
      pathname: SEARCH_ROUTES.MAPSEARCH,
      query: searchParams.toString(),
    });
  };
  return (
    <SearchTabs initTab={initTab}>
      {/* The search form */}
      <SimpleVenueSearch
        data-testid={searchContainerDataTestId}
        searchRoute={SEARCH_ROUTES.SEARCH}
        searchUtilities={null}
        korosBottom
        showTitle
        scrollToResultList={() => true}
      />

      {/* The search tabs, query sorters, search type switchers, etc. */}
      <SearchUtilities>
        <SearchTabs.TabList>
          <SearchTabs.Tab id="Venue">
            {tSearch('search:search.searchType.venue')}
          </SearchTabs.Tab>
          <SearchTabs.Tab id={EventTypeId.General}>
            {tSearch('search:search.searchType.generalEventType')}
          </SearchTabs.Tab>
          <SearchTabs.Tab id={EventTypeId.Course}>
            {tSearch('search:search.searchType.courseEventType')}
          </SearchTabs.Tab>
        </SearchTabs.TabList>
        <TabsContext.Consumer>
          {(c) => {
            return c?.activeTab === 'Venue' ? (
              <Button variant="secondary" onClick={switchShowMode}>
                {tCommon('common:mapSearch.showOnMap')}
              </Button>
            ) : null;
          }}
        </TabsContext.Consumer>
      </SearchUtilities>

      {/* The Venue Search results */}
      <SearchTabs.Panel id="Venue">
        <VenueSearch />
      </SearchTabs.Panel>

      {/* The General Event Search results */}
      <SearchTabs.Panel id={EventTypeId.General}>
        <EventSearch eventType={EventTypeId.General} />
      </SearchTabs.Panel>

      {/* The Course Search results */}
      <SearchTabs.Panel id={EventTypeId.Course}>
        <EventSearch eventType={EventTypeId.Course} />
      </SearchTabs.Panel>
    </SearchTabs>
  );
};

export default CombinedSearchPage;
