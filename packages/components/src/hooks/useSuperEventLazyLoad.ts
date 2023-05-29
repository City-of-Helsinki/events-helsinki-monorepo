import { useLazyQuery } from '@apollo/client';
import React from 'react';
import type { EventFieldsFragment, SuperEventResponse } from '../types';
import { EventDetailsDocument } from '../types';
import { getEventIdFromUrl } from '../utils';

function useSuperEventLazyLoad(event?: EventFieldsFragment) {
  const [superEvent, setSuperEvent] = React.useState<SuperEventResponse>({
    data: null,
    status: 'pending',
  });
  const superEventId = getEventIdFromUrl(
    event?.superEvent?.internalId ?? '',
    'event'
  );
  const [
    superEventSearch,
    { data: superEventData, loading: superEventLoading },
  ] = useLazyQuery(EventDetailsDocument, {});
  React.useEffect(() => {
    if (superEventId) {
      superEventSearch({
        variables: {
          id: superEventId,
          include: ['in_language', 'keywords', 'location', 'audience'],
        },
      });
      // Still loading the super event,
      if (superEventLoading) {
        setSuperEvent({ data: null, status: 'pending' });
      }
      // Loaded, so there should be data if there ever was a super event
      else if (superEventData) {
        setSuperEvent({
          data: superEventData.eventDetails,
          status: 'resolved',
        });
      }
      // No super event
      else if (event) {
        setSuperEvent({ data: null, status: 'resolved' });
      }
    }
    // No super event id to fetch with
    else {
      setSuperEvent({
        data: null,
        status: 'resolved',
      });
    }
  }, [
    event,
    superEventId,
    superEventData,
    superEventSearch,
    superEventLoading,
  ]);

  return {
    superEvent,
    setSuperEvent,
    superEventSearch,
    superEventLoading,
  };
}

export default useSuperEventLazyLoad;
