import type { MockedResponse } from '@apollo/client/testing/index.js';

import { EventsByIdsDocument } from '@events-helsinki/components';
import type {
  EventDetails,
  EventsByIdsQueryVariables,
} from '@events-helsinki/components';

export const getEventsByIdsMock = ({
  variables,
  eventsByIds,
}: {
  variables: Partial<EventsByIdsQueryVariables>;
  eventsByIds: EventDetails[];
}): MockedResponse => {
  return {
    request: {
      query: EventsByIdsDocument,
      variables,
    },
    result: {
      data: {
        eventsByIds: {
          data: eventsByIds,
          meta: {
            count: eventsByIds.length,
            previous: 'asdf',
            next: 'qwer',
          },
        },
      },
    },
  };
};
