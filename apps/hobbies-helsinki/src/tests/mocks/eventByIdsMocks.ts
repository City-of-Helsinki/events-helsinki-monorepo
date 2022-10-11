import type { MockedResponse } from '@apollo/client/testing';

import type {
  EventDetails,
  EventsByIdsQueryVariables,
} from '../../domain/nextApi/graphql/generated/graphql';
import { EventsByIdsDocument } from '../../domain/nextApi/graphql/generated/graphql';

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
