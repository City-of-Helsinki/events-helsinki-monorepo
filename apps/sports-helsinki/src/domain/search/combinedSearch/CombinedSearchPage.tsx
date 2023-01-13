import classNames from 'classnames';
import {
  useSearchTranslation,
  EventTypeId,
  useAppSportsTranslation,
  getURLSearchParamsFromAsPath,
  useCommonTranslation,
} from 'events-helsinki-components';
import { Button } from 'hds-react';
import { useRouter } from 'next/router';
import React from 'react';
import { ContentContainer, PageSection } from 'react-helsinki-headless-cms';
import { SEARCH_ROUTES } from '../../../constants';
import EventSearchPage from '../eventSearch/SearchPage';
import VenueSearchPage from '../venueSearch/SearchPage';
import { SimpleVenueSearchForm } from '../venueSearch/VenueSearch';
import styles from './combinedSearchPage.module.scss';
import {
  useScrollToSearchResultItem,
  useSearchTabResultCounts,
  useSearchTabsWithParams,
} from './hooks';
import SearchTabs from './searchTabs/SearchTabs';
import type { SearchTabId } from './searchTabs/tabsContext';
import { useTabsContext } from './searchTabs/tabsContext';
import type { SearchComponentType } from './types';

export const searchContainerDataTestId = 'combinedSearchContainer';

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

export const SearchForm: React.FC<
  {
    'data-testid'?: string;
    korosBottom?: boolean;
    searchUtilities?: React.ReactNode;
    className?: string;
  } & SearchComponentType
> = ({
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
        <div className={styles.flexEnd}>
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
            <Button
              variant="secondary"
              onClick={switchShowMode}
              className={styles.buttonWrapper}
            >
              {tCommon('common:mapSearch.showOnMap')}
            </Button>
          ) : null}
        </div>
      </ContentContainer>
    </PageSection>
  );
};

const CombinedSearchPage: React.FC<{ defaultTab: SearchTabId }> = ({
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
