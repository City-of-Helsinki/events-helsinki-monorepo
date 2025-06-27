import { useLazyQuery } from '@apollo/client';
import type { SearchListQuery } from '@events-helsinki/components';
import { SearchListDocument } from '@events-helsinki/components';
import React from 'react';
import { useCombinedSearchContext } from '../adapters/CombinedSearchContext';
import { useTabsContext } from '../searchTabs/tabsContext';

function useLazyVenueSearchForTabCount() {
  const { setResultCount } = useTabsContext();
  const { searchVariables } = useCombinedSearchContext();
  const [search, { loading, data, error, ...delegatedProps }] = useLazyQuery(
    SearchListDocument,
    {
      variables: searchVariables.venue,
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
    const count =
      !loading && data
        ? ((data as SearchListQuery)?.unifiedSearch?.count ?? 0)
        : null;
    setResultCount('Venue', count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  return { search, loading, data, ...delegatedProps };
}

export default useLazyVenueSearchForTabCount;
