import type { FetchResult, GraphQLRequest } from '@apollo/client';
import type { MockedResponse } from '@apollo/client/testing';

import type {
  EventListQueryVariables,
  EventListResponse,
  EventType,
  QueryEventListArgs,
} from '@events-helsinki/components';
import { EventListDocument, EventTypeId } from '@events-helsinki/components';
import AppConfig from '../../../src/domain/app/AppConfig';

export const baseVariables = {
  audienceMinAgeLt: '',
  audienceMaxAgeGt: '',
  suitableFor: [],
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keywordAnd: [],
  keywordNot: [],
  location: [],
  pageSize: 10,
  publisher: null,
  sort: 'end_time',
  start: 'now',
  startsAfter: undefined,
  // superEventType: ['umbrella', 'none'], // Removed to experiment LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512).
  superEvent: 'none', // Added for courses in LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512).
};

export const eventListBaseVariables: QueryEventListArgs = {
  ...baseVariables,
  keywordOrSet2: [],
  keywordOrSet3: [],
};

export const getOtherEventsVariables = (
  superEvent: EventListQueryVariables['superEvent']
): EventListQueryVariables => ({
  include: ['in_language', 'keywords', 'location', 'audience'],
  sort: 'end_time',
  start: 'now',
  superEvent,
  eventType: AppConfig.supportedEventTypes,
});

const createRequest = (
  type: EventType = 'course',
  variablesOverride: EventListQueryVariables = {}
): GraphQLRequest => ({
  query: EventListDocument,
  variables: {
    ...eventListBaseVariables,
    ...variablesOverride,
    eventType: type === 'event' ? [EventTypeId.General] : [EventTypeId.Course],
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
