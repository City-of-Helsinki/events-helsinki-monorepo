import { useLazyQuery } from '@apollo/client';
import type { EventListQuery } from '@events-helsinki/components';
import { EventListDocument, EventTypeId } from '@events-helsinki/components';
import React from 'react';
import { useCombinedSearchContext } from '../adapters/CombinedSearchContext';
import { useTabsContext } from '../searchTabs/tabsContext';

function useLazyEventSearchForTabCount({
  eventType,
}: {
  eventType: EventTypeId;
}) {
  const { setResultCount } = useTabsContext();
  const { searchVariables } = useCombinedSearchContext();
  const [search, { loading, data, ...delegatedProps }] = useLazyQuery(
    EventListDocument,
    {
      variables:
        eventType === EventTypeId.Course
          ? searchVariables.course
          : searchVariables.event,
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
        ? (((data as EventListQuery)?.eventList?.meta.count as number) ?? 0)
        : null;
    setResultCount(eventType, count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, eventType]);

  return { search, loading, data, ...delegatedProps };
}

export default useLazyEventSearchForTabCount;
