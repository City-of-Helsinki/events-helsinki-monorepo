import type { FetchResult, GraphQLRequest } from '@apollo/client/core/index.js';
import type { MockedResponse } from '@apollo/client/testing/index.js';
import { DEFAULT_EVENT_SORT_OPTION } from '../../../src/constants/event-constants';
import type { EventType } from '../../../src/types/event-types';
import type {
  EventListQueryVariables,
  EventListResponse,
  QueryEventListArgs,
} from '../../../src/types/generated/graphql';
import {
  EventListDocument,
  EventTypeId,
} from '../../../src/types/generated/graphql';

export const baseVariables = {
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keywordAnd: [],
  keywordNot: [],
  location: [],
  pageSize: 10,
  publisher: null,
  sort: DEFAULT_EVENT_SORT_OPTION,
  start: 'now',
  startsAfter: undefined,
  // Removed to experiment LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512).
  // superEventType: ['umbrella', 'none'],
};

export const eventListBaseVariables: QueryEventListArgs = {
  ...baseVariables,
  keywordOrSet2: [],
};

export const getOtherEventsVariables = (
  superEvent: EventListQueryVariables['superEvent']
): EventListQueryVariables => ({
  include: ['in_language', 'keywords', 'location', 'audience'],
  sort: DEFAULT_EVENT_SORT_OPTION,
  start: 'now',
  superEvent,
  eventType: [EventTypeId.Course, EventTypeId.General],
});

const createRequest = (
  variablesOverride: EventListQueryVariables = {}
): GraphQLRequest => ({
  query: EventListDocument,
  variables: {
    ...eventListBaseVariables,
    ...variablesOverride,
    eventType: [EventTypeId.General],
  },
});

const createResult = (
  expectedResponse: EventListResponse | undefined
): FetchResult => ({
  data: {
    eventList: expectedResponse,
  },
});

export type EventListMockArguments = {
  type?: EventType;
  superEventId?: EventListQueryVariables['superEvent'];
  variables?: EventListQueryVariables;
  response?: EventListResponse;
};

export const createEventListRequestAndResultMocks = ({
  variables = {},
  response,
}: EventListMockArguments): MockedResponse => ({
  request: createRequest({
    sort: DEFAULT_EVENT_SORT_OPTION,
    ...variables,
  }),
  result: createResult(response),
});

export const createEventListRequestThrowsErrorMocks = ({
  variables = {},
}: EventListMockArguments = {}): MockedResponse => ({
  request: createRequest(variables),
  error: new Error('not found'),
});

export const createOtherEventTimesRequestAndResultMocks = ({
  superEventId,
  variables,
  response,
}: EventListMockArguments): MockedResponse => ({
  request: {
    query: EventListDocument,
    variables: {
      ...getOtherEventsVariables(superEventId),
      ...variables,
    },
  },
  result: createResult(response),
});

export const createOtherEventTimesRequestThrowsErrorMocks = ({
  superEventId,
  variables,
}: EventListMockArguments): MockedResponse => ({
  request: {
    query: EventListDocument,
    variables: {
      ...getOtherEventsVariables(superEventId),
      ...variables,
    },
  },
  error: new Error('not found'),
});
