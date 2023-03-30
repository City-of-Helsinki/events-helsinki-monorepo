import { EventTypeId } from '@events-helsinki/components';
import React from 'react';
import useLazyEventSearchForTabCount from './useLazyEventSearchForTabCount';
import useLazyVenueSearchForTabCount from './useLazyVenueSearchForTabCount';

function useSearchTabResultCounts() {
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

export default useSearchTabResultCounts;
