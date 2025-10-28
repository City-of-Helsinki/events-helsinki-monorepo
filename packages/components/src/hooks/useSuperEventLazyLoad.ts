import { useLazyQuery } from '@apollo/client/react/index.js';
import React from 'react';
import type { EventFieldsFragment, SuperEventResponse } from '../types';
import { EventDetailsDocument } from '../types';
import { getEventIdFromUrl } from '../utils';

function useSuperEventLazyLoad(event?: EventFieldsFragment) {
  const [superEvent, setSuperEvent] = React.useState<SuperEventResponse>({
    data: null,
    status: 'pending',
  });
  const superEventId = getEventIdFromUrl(event?.superEvent?.internalId ?? '');

  const [superEventSearch, { loading: superEventLoading }] = useLazyQuery(
    EventDetailsDocument,
    {
      onCompleted: (data) => {
        setSuperEvent({
          data: data.eventDetails,
          status: 'resolved',
        });
      },
      onError: () => {
        setSuperEvent({ data: null, status: 'resolved' });
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  // This effect is now ONLY responsible for triggering the fetch
  React.useEffect(() => {
    if (superEventId) {
      // Set state to pending *before* fetching
      setSuperEvent({ data: null, status: 'pending' });
      superEventSearch({
        variables: {
          id: superEventId,
          include: [
            'in_language',
            'keywords',
            'location',
            'audience',
            'registration',
          ],
        },
      });
    } else {
      // No ID, so we are resolved with null data
      setSuperEvent({ data: null, status: 'resolved' });
    }
  }, [superEventId, superEventSearch]);

  return {
    superEvent,
    setSuperEvent,
    superEventSearch,
    superEventLoading, // Pass Apollo's loading state through
  };
}

export default useSuperEventLazyLoad;
