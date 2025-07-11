import type { MockedResponse } from '@apollo/client/testing/index.js';
import type {
  EventDetails,
  EventsByIdsQueryVariables,
} from '../../../src/types/generated/graphql';
import { EventsByIdsDocument } from '../../../src/types/generated/graphql';

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
