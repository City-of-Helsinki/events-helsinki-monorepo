import {
  useSearchTranslation,
  EventTypeId,
  useAppSportsTranslation,
} from 'events-helsinki-components';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import React, { useEffect, useRef } from 'react';
import AdvancedSearch from '../eventSearch/AdvancedSearch';
import EventSearchPage from '../eventSearch/SearchPage';
import VenueSearchPage from '../venueSearch/SearchPage';
import SimpleVenueSearch from '../venueSearch/VenueSearch';
import SearchTabs from './searchTabs/SearchTabs';
import type { SearchTabId } from './tabsContext';
import { isSearchTabId } from './tabsContext';

/**
 * An interface that helps the search forms
 * to implement similar features.
 * */
export interface SearchForm {
  searchParams: URLSearchParams;
  goToSearch: (search: string) => void;
  moveToSearchPage: () => void;
  clearInputValues: () => void;
  clearFilters: () => void;
  handleSubmit: (event?: FormEvent) => void;
  initialFieldsOnPageLoad: () => void;
  searchFilters: object;
  scrollToResultList?: () => void;
}

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
      SearchComponent={SimpleVenueSearch}
      pageTitle={t('appSports:search.pageTitle')}
    />
  );
};

const EventSearch: React.FC<{ eventType: EventTypeId }> = ({ eventType }) => {
  const { t } = useSearchTranslation();
  useScrollToSearchResultItem();
  return (
    <EventSearchPage
      SearchComponent={AdvancedSearch}
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

const CombinedSearchPage: React.FC<CombinedSearchPageProps> = ({
  defaultTab = 'Venue',
}) => {
  const { t } = useSearchTranslation();
  const { initTab } = useSearchTabsWithParams(defaultTab);
  return (
    <SearchTabs initTab={initTab}>
      <SearchTabs.TabList>
        <SearchTabs.Tab id="Venue">
          {t('search:search.searchType.venue')}
        </SearchTabs.Tab>
        <SearchTabs.Tab id={EventTypeId.General}>
          {t('search:search.searchType.generalEventType')}
        </SearchTabs.Tab>
        <SearchTabs.Tab id={EventTypeId.Course}>
          {t('search:search.searchType.courseEventType')}
        </SearchTabs.Tab>
      </SearchTabs.TabList>
      <SearchTabs.Panel id="Venue">
        <VenueSearch />
      </SearchTabs.Panel>
      <SearchTabs.Panel id={EventTypeId.General}>
        <EventSearch eventType={EventTypeId.General} />
      </SearchTabs.Panel>
      <SearchTabs.Panel id={EventTypeId.Course}>
        <EventSearch eventType={EventTypeId.Course} />
      </SearchTabs.Panel>
    </SearchTabs>
  );
};

export default CombinedSearchPage;
