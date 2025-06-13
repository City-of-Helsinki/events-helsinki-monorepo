import type { FetchResult, GraphQLRequest } from '@apollo/client';
import type { MockedResponse } from '@apollo/client/testing';

import type {
  EventListQueryVariables,
  EventListResponse,
  EventType,
  QueryEventListArgs,
} from '@events-helsinki/components';
import {
  EventListDocument,
  EventTypeId,
  DEFAULT_EVENT_SORT_OPTION,
  EVENT_SEARCH_FILTERS,
} from '@events-helsinki/components';
import AppConfig from '../../../src/domain/app/AppConfig';

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
  // superEventType: ['umbrella', 'none'], // Removed to experiment LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512).
  [EVENT_SEARCH_FILTERS.ONGOING]: true,
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
  eventType: AppConfig.supportedEventTypes,
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
