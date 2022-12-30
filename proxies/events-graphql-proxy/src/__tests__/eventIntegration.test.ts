import assert from 'assert';
import type { GraphQLRequest, GraphQLResponse } from '@apollo/server';
import * as Sentry from '@sentry/node';
import type { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
import ContextValue from '../context/context-value';
import type {
  EventDetails,
  EventListResponse,
  QueryEventListArgs,
} from '../types/types';
import { EventTypeId } from '../types/types';
import { createTestApolloServer } from '../utils/testUtils';
let errorSpy: jest.SpyInstance;
let getMock: jest.Mock;
const eventId = 'eventId';
const publisherId = 'publisherId';
const eventName = 'tapahtuma';

beforeEach(() => {
  errorSpy = jest.spyOn(console, 'error');
});

afterEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,no-console
  (console.error as any).mockRestore();
});

const executeOperationReturnMockData = (
  request: Omit<GraphQLRequest, 'query'> & {
    query?: DocumentNode;
  },
  responseMockData: Record<string, unknown> = {}
): Promise<GraphQLResponse> => {
  const contextValue = new ContextValue({ token: 'token' });
  getMock = (contextValue.dataSources.eventAPI as any).get = jest
    .fn()
    .mockResolvedValue(responseMockData);
  return createTestApolloServer().executeOperation(request, { contextValue });
};

const executeOperationThrowError = (
  request: Omit<GraphQLRequest, 'query'> & {
    query?: DocumentNode;
  },
  errorMessage: string
): Promise<GraphQLResponse> => {
  const contextValue = new ContextValue({ token: 'token' });
  errorSpy.mockImplementationOnce(() => {});
  getMock = (contextValue.dataSources.eventAPI as any).get = jest
    .fn()
    .mockResolvedValue(Promise.reject(errorMessage));
  return createTestApolloServer().executeOperation(request, { contextValue });
};

it('resolves eventList correctly', async () => {
  const mockData = {
    data: [{ id: eventId, name: { fi: eventName } }],
    meta: { count: 1 },
  } as EventListResponse;

  const res = await executeOperationReturnMockData(
    { query: EVENTS_QUERY },
    mockData
  );

  assert(res.body.kind === 'single');
  expect(res.body.singleResult.errors).toBeUndefined();
  // eslint-disable-next-line jest/prefer-strict-equal
  expect(res.body.singleResult.data?.eventList).toEqual(mockData);
});

it('resolves eventDetails correctly', async () => {
  const mockData = {
    id: eventId,
    publisher: publisherId,
  } as EventDetails;

  const res = await executeOperationReturnMockData(
    {
      query: EVENT_DETAILS_QUERY,
      variables: { id: 'id' },
    },
    mockData
  );

  assert(res.body.kind === 'single');
  expect(res.body.singleResult.errors).toBeUndefined();
  // eslint-disable-next-line jest/prefer-strict-equal
  expect(res.body.singleResult.data?.eventDetails).toEqual(mockData);
});

it('resolves eventsByIds correctly', async () => {
  const mockData = {
    data: [
      {
        id: eventId,
        publisher: publisherId,
      },
      {
        id: eventId,
        publisher: publisherId,
      },
    ],
    meta: { count: 2 },
  } as EventListResponse;

  const res = await executeOperationReturnMockData(
    {
      query: EVENTS_BY_IDS_QUERY,
      variables: { ids: ['id1', 'id2'] },
    },
    { ...mockData }
  );

  assert(res.body.kind === 'single');
  expect(res.body.singleResult.errors).toBeUndefined();
  // eslint-disable-next-line jest/prefer-strict-equal
  expect(res.body.singleResult.data?.eventsByIds).toEqual(mockData);
});

it('handles error correctly in eventsByIds', async () => {
  const spy = jest.spyOn(Sentry, 'captureException');
  const errorMessage = 'Error message';

  await executeOperationThrowError(
    {
      query: EVENTS_BY_IDS_QUERY,
      variables: { ids: ['id1'] },
    },
    errorMessage
  );
  // eslint-disable-next-line jest/prefer-strict-equal
  expect(spy.mock.calls).toEqual([[errorMessage]]);
});

describe('sends REST requests correctly', () => {
  it('sends General event type by default', async () => {
    await executeOperationReturnMockData({
      query: EVENTS_QUERY,
      variables: {},
    });

    expect(getMock).toHaveBeenCalledWith('event?event_type=General');
  });

  it('sends Course event type with event type param', async () => {
    await executeOperationReturnMockData({
      query: EVENTS_QUERY,
      variables: {
        eventType: [EventTypeId.Course],
      } as QueryEventListArgs,
    });

    expect(getMock).toHaveBeenCalledWith('event?event_type=Course');
  });

  it('sends all params in query string correctly', async () => {
    await executeOperationReturnMockData({
      query: EVENTS_QUERY,
      variables: { eventType: [EventTypeId.Course] } as QueryEventListArgs,
    });

    expect(getMock).toHaveBeenCalledWith('event?event_type=Course');
  });
});

it('sends REST request correctly with query params (course)', async () => {
  await executeOperationReturnMockData({
    query: EVENTS_QUERY,
    variables: {
      eventType: [EventTypeId.Course],
      ids: ['1', '2'],
      allOngoing: true,
      allOngoingAnd: ['asd'],
      allOngoingOr: ['asf'],
      suitableForm: [10, 20],
      combinedText: ['asd'],
      division: ['division1', 'division2'],
      end: 'end',
      endsAfter: '09.10.2020',
      endsBefore: '10.10.2020',
      inLanguage: 'fi',
      include: ['include'],
      internetOngoingAnd: ['3', '4'],
      internetOngoingOr: ['5', '6'],
      isFree: true,
      keyword: ['keyword1', 'keyword2'],
      keywordAnd: ['keywordAnd', 'keywordAnd2'],
      language: 'fi',
      keywordNot: ['keywordNot'],
      location: ['location2', 'location3'],
      page: 10,
      pageSize: 10,
      publisher: 'publisher',
      sort: 'asc',
      start: '10.10.2021',
      startsBefore: '10.10.2022',
      text: 'testText',
      translation: 'translation',
      startsAfter: '10.20.2021',
      superEvent: '123aasd',
      superEventType: ['course', 'event'],
      internetBased: true,
    } as QueryEventListArgs,
  });

  expect(getMock).toHaveBeenCalledTimes(1);
  expect(getMock.mock.calls[0][0]).toMatchInlineSnapshot(
    // eslint-disable-next-line max-len
    `"event?event_type=Course&internet_based=true&all_ongoing=true&all_ongoing_AND=asd&division=division1,division2&end=end&ends_after=09.10.2020&ends_before=10.10.2020&include=include&in_language=fi&is_free=true&keyword=keyword1,keyword2&keyword_AND=keywordAnd,keywordAnd2&keyword!=keywordNot&language=fi&location=location2,location3&page=10&page_size=10&publisher=publisher&sort=asc&start=10.10.2021&starts_after=10.20.2021&starts_before=10.10.2022&super_event=123aasd&super_event_type=course,event&text=testText&translation=translation"`
  );
});

const EVENTS_BY_IDS_QUERY = gql`
  query EventsByIds(
    $ids: [ID!]!
    $include: [String]
    $sort: String
    $pageSize: Int
    $page: Int
  ) {
    eventsByIds(
      ids: $ids
      include: $include
      sort: $sort
      pageSize: $pageSize
      page: $page
    ) {
      data {
        id
        publisher
      }
      meta {
        count
      }
    }
  }
`;

const EVENTS_QUERY = gql`
  query EventList(
    $eventType: [EventTypeId]
    $internetBased: Boolean
    $allOngoing: Boolean
    $allOngoingAnd: [String]
    $division: [String]
    $end: String
    $endsAfter: String
    $endsBefore: String
    $inLanguage: String
    $include: [String]
    $isFree: Boolean
    $keyword: [String]
    $keywordAnd: [String]
    $keywordOrSet1: [String]
    $keywordNot: [String]
    $language: String
    $localOngoingAnd: [String]
    $location: [String]
    $page: Int
    $pageSize: Int
    $publisher: ID
    $sort: String
    $start: String
    $startsAfter: String
    $startsBefore: String
    $superEvent: ID
    $superEventType: [String]
    $text: String
    $translation: String
  ) {
    eventList(
      eventType: $eventType
      internetBased: $internetBased
      allOngoing: $allOngoing
      allOngoingAnd: $allOngoingAnd
      division: $division
      end: $end
      endsAfter: $endsAfter
      endsBefore: $endsBefore
      include: $include
      inLanguage: $inLanguage
      isFree: $isFree
      keyword: $keyword
      keywordAnd: $keywordAnd
      keywordOrSet1: $keywordOrSet1
      keywordNot: $keywordNot
      language: $language
      localOngoingAnd: $localOngoingAnd
      location: $location
      page: $page
      pageSize: $pageSize
      publisher: $publisher
      sort: $sort
      start: $start
      startsAfter: $startsAfter
      startsBefore: $startsBefore
      superEvent: $superEvent
      superEventType: $superEventType
      text: $text
      translation: $translation
    ) {
      data {
        id
        name {
          fi
        }
      }
      meta {
        count
      }
    }
  }
`;

const EVENT_DETAILS_QUERY = gql`
  query EventDetails($id: ID!, $include: [String]) {
    eventDetails(id: $id, include: $include) {
      id
      publisher
    }
  }
`;
