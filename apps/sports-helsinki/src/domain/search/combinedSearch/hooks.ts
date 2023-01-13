import { useLazyQuery } from '@apollo/client';
import type {
  SearchListQuery,
  EventListQuery,
} from 'events-helsinki-components';
import {
  SearchListDocument,
  EventTypeId,
  EventListDocument,
} from 'events-helsinki-components';
import { useRouter } from 'next-router-mock';
import React, { useRef, useEffect } from 'react';
import AppConfig from 'domain/app/AppConfig';
import useUnifiedSearchVariables from 'domain/unifiedSearch/useUnifiedSearchVariables';
import { useEventSearchFilters } from '../eventSearch/SearchPage';
import type { SearchTabId } from './searchTabs/tabsContext';
import { isSearchTabId, useTabsContext } from './searchTabs/tabsContext';

/**
 * Use an URL parameter to scroll to
 * the previously used search result card on a page change.
 */
export const useScrollToSearchResultItem = () => {
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

export const useSearchTabsWithParams = (defaultTab: SearchTabId) => {
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
