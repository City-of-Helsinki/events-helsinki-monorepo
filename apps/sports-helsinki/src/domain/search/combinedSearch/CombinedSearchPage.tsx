import {
  useSearchTranslation,
  EventTypeId,
  useAppSportsTranslation,
} from 'events-helsinki-components';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import AdvancedSearch from '../eventSearch/AdvancedSearch';
import EventSearchPage from '../eventSearch/SearchPage';
import VenueSearchPage from '../venueSearch/SearchPage';
import SimpleVenueSearch from '../venueSearch/VenueSearch';
import SearchTabs from './searchTabs/SearchTabs';

const VenueSearch: React.FC = () => {
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);
  const { t: tAppSports } = useAppSportsTranslation();

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

  return (
    <VenueSearchPage
      SearchComponent={SimpleVenueSearch}
      pageTitle={tAppSports('appSports:search.pageTitle')}
    />
  );
};

const EventSearch: React.FC<{ eventType: EventTypeId }> = ({ eventType }) => {
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

  return (
    <EventSearchPage
      SearchComponent={AdvancedSearch}
      pageTitle={'eventSearch.title'}
      eventType={eventType}
    />
  );
};

const CombinedSearchPage: React.FC = () => {
  const { t } = useSearchTranslation();
  return (
    <SearchTabs initTab="Venue">
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
