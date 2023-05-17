import {
  useSearchTranslation,
  EventTypeId,
  useAppSportsTranslation,
} from '@events-helsinki/components';
import classNames from 'classnames';
import React from 'react';
import { ContentContainer, PageSection } from 'react-helsinki-headless-cms';
import { SEARCH_ROUTES } from '../../../constants';
import { SimpleSearchForm } from '../combinedSearch/SearchForm';
import EventSearchPage from '../eventSearch/SearchPage';
import VenueSearchPage from '../venueSearch/SearchPage';
import { CombinedSearchProvider } from './adapters/CombinedSearchProvider';
import styles from './combinedSearchPage.module.scss';
import { useScrollToSearchResultItem, useSearchTabsWithParams } from './hooks';
import SearchTabs from './searchTabs/SearchTabs';
import type { SearchTabId } from './searchTabs/tabsContext';
import SearchUtilities from './SearchUtilities';
import type { SearchComponentType } from './types';

export const searchContainerDataTestId = 'combinedSearchContainer';

function VenueSearchPanel() {
  const { t } = useAppSportsTranslation();
  useScrollToSearchResultItem();
  return (
    <VenueSearchPage
      SearchComponent={undefined}
      pageTitle={t('appSports:search.pageTitle')}
    />
  );
}

function EventSearchPanel({ eventType }: { eventType: EventTypeId }) {
  const { t } = useSearchTranslation();
  useScrollToSearchResultItem();
  return (
    <EventSearchPage
      SearchComponent={undefined}
      pageTitle={t('search:search.labelSearchField')}
      eventType={eventType}
    />
  );
}

export function SearchForm({
  'data-testid': dataTestId,
  korosBottom = false,
  className,
  ...delegatedSimpleVenueSearchFormProps
}: {
  'data-testid'?: string;
  korosBottom?: boolean;
  searchUtilities?: React.ReactNode;
  className?: string;
} & SearchComponentType) {
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
        <SimpleSearchForm {...delegatedSimpleVenueSearchFormProps} />
      </ContentContainer>
    </PageSection>
  );
}

function CombinedSearchPage({
  defaultTab = 'Venue',
}: {
  defaultTab: SearchTabId;
}) {
  const { initTab } = useSearchTabsWithParams(defaultTab);
  return (
    <div>
      <SearchTabs initTab={initTab}>
        <CombinedSearchProvider>
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
        </CombinedSearchProvider>
      </SearchTabs>
    </div>
  );
}

export default CombinedSearchPage;
