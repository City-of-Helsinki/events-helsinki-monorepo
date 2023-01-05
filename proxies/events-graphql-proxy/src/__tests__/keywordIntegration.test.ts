import assert from 'assert';
import type { GraphQLRequest, GraphQLResponse } from '@apollo/server';
import type { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';

import ContextValue from '../context/context-value';
import { createTestApolloServer } from '../utils/testUtils';

let getMock: jest.Mock;
const executeOperationReturnMockData = (
  request: Omit<GraphQLRequest, 'query'> & {
    query?: DocumentNode;
  },
  responseMockData: Record<string, unknown> = {}
): Promise<GraphQLResponse> => {
  const contextValue = new ContextValue({ token: 'token' });
  getMock = (contextValue.dataSources.keywordAPI as any).get = jest
    .fn()
    .mockResolvedValue(responseMockData);
  return createTestApolloServer().executeOperation(request, { contextValue });
};

it('sends REST request correctly with params', async () => {
  const keywordResponse = {
    data: [],
    meta: {},
  };

  await executeOperationReturnMockData(
    {
      query: GET_KEYWORDS,
      variables: {
        dataSource: 'yso',
        hasUpcomingEvents: true,
        page: 1,
        pageSize: 10,
        showAllKeywords: false,
        sort: 'asc',
        text: 'malmi',
      },
    },
    keywordResponse
  );

  expect(getMock).toHaveBeenCalledWith(
    'keyword?data_source=yso&has_upcoming_events=true&page=1&page_size=10&show_all_keywords=false&sort=asc&text=malmi'
  );
});

it('resolves keywordList correctly', async () => {
  const keywordResponse = {
    data: [
      {
        id: '1',
        '@id': '1',
        name: {
          fi: 'keyword1',
        },
      },
      {
        id: '2',
        '@id': '2',
        name: {
          fi: 'keyword2',
        },
      },
    ],
    meta: {
      count: 1,
    },
  };

  const res = await executeOperationReturnMockData(
    { query: GET_KEYWORDS },
    keywordResponse
  );

  assert(res.body.kind === 'single');
  expect(res.body.singleResult.errors).toBeUndefined();

  // eslint-disable-next-line jest/prefer-strict-equal
  expect(res.body.singleResult.data?.keywordList).toEqual({
    data: [
      {
        id: '1',
        internalId: '1',
        name: {
          fi: 'keyword1',
        },
      },
      {
        id: '2',
        internalId: '2',
        name: {
          fi: 'keyword2',
        },
      },
    ],
    meta: {
      count: 1,
    },
  });
});

it('uses correct path when source is provided', async () => {
  await executeOperationReturnMockData({
    query: GET_KEYWORDS,
  });

  expect(getMock).toHaveBeenCalledWith('keyword');
});

const GET_KEYWORDS = gql`
  query KewordList(
    $dataSource: String
    $hasUpcomingEvents: Boolean
    $page: Int
    $pageSize: Int
    $showAllKeywords: Boolean
    $sort: String
    $text: String
  ) {
    keywordList(
      dataSource: $dataSource
      hasUpcomingEvents: $hasUpcomingEvents
      page: $page
      pageSize: $pageSize
      showAllKeywords: $showAllKeywords
      sort: $sort
      text: $text
    ) {
      data {
        id
        internalId
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
