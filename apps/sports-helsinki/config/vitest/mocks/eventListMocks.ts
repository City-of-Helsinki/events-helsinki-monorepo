import type { FetchResult, GraphQLRequest } from '@apollo/client';
import type { MockedResponse } from '@apollo/client/testing';

import type {
  EventListQueryVariables,
  EventListResponse,
  EventType,
  QueryEventListArgs,
} from '@events-helsinki/components';
import {
  EVENT_SEARCH_FILTERS,
  EventListDocument,
  EventTypeId,
  HELSINKI_OCD_DIVISION_ID,
} from '@events-helsinki/components';

export const baseVariables = {
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keywordAnd: [],
  keywordNot: [],
  location: [],
  pageSize: 10,
  publisher: null,
  publisherAncestor: null,
  sort: 'end_time',
  start: 'now',
  // Always filter with HELSINKI_OCD_DIVISION_ID to limit the results to city of Helsinki events.
  [EVENT_SEARCH_FILTERS.DIVISIONS]: [HELSINKI_OCD_DIVISION_ID],
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
  sort: 'end_time',
  start: 'now',
  superEvent,
});

const createRequest = (
  type: EventType = 'course',
  variablesOverride: EventListQueryVariables = {}
): GraphQLRequest => ({
  query: EventListDocument,
  variables: {
    ...eventListBaseVariables,
    eventType: type === 'event' ? [EventTypeId.General] : [EventTypeId.Course],
    ...variablesOverride,
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
  type = 'course',
  variables = {},
  response,
}: EventListMockArguments): MockedResponse => ({
  request: createRequest(type, variables),
  result: createResult(response),
});

export const createEventListRequestThrowsErrorMocks = ({
  type = 'course',
  variables = {},
}: EventListMockArguments = {}): MockedResponse => ({
  request: createRequest(type, variables),
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
