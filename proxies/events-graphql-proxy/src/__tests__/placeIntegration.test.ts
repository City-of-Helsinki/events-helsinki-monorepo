import assert from 'assert';
import type { GraphQLRequest, GraphQLResponse } from '@apollo/server';
import type { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
import type { Mock } from 'vitest';
import { expect, it, vi } from 'vitest';

import EventContext from '../context/EventContext';
import { createTestApolloServer } from '../utils/testUtils';

let getMock: Mock;
const executeOperationReturnMockData = (
  request: Omit<GraphQLRequest, 'query'> & {
    query?: DocumentNode;
  },
  responseMockData: Record<string, unknown> = {}
): Promise<GraphQLResponse> => {
  const contextValue = new EventContext({ token: 'token' });
  getMock = (contextValue.dataSources.place as any).get = vi
    .fn()
    .mockResolvedValue(responseMockData);
  return createTestApolloServer().executeOperation(request, { contextValue });
};

it('sends REST request correctly with params', async () => {
  const placeListResponse = {
    data: [],
    meta: {},
  };

  await executeOperationReturnMockData(
    {
      query: GET_PLACES,
      variables: {
        dataSource: 'yso',
        divisions: ['kunta:091', 'kunta:092'],
        hasUpcomingEvents: true,
        page: 1,
        pageSize: 10,
        showAllPlaces: false,
        sort: 'asc',
        text: 'malmi',
      },
    },
    placeListResponse
  );

  expect(getMock).toHaveBeenCalledWith(
    `place/?data_source=yso&has_upcoming_events=true&division=kunta:091,kunta:092&page=1` +
      `&page_size=10&show_all_places=false&sort=asc&text=malmi`
  );
});

it('sends REST request correctly when hasUpcomingEvents is explicitly false', async () => {
  await executeOperationReturnMockData({
    query: GET_PLACES,
    variables: {
      hasUpcomingEvents: false,
    },
  });

  expect(getMock).toHaveBeenCalledWith('place/?has_upcoming_events=false');
});

it('sends REST request correctly when showAllPlaces is explicitly false', async () => {
  await executeOperationReturnMockData({
    query: GET_PLACES,
    variables: {
      showAllPlaces: false,
    },
  });

  expect(getMock).toHaveBeenCalledWith('place/?show_all_places=false');
});

it('resolves placeList correctly', async () => {
  const placeListResponse = {
    data: [
      {
        id: '1',
        '@id': '1',
        name: {
          fi: 'place1',
        },
      },
      {
        id: '2',
        '@id': '2',
        name: {
          fi: 'place2',
        },
      },
    ],
    meta: {
      count: 1,
    },
  };

  const res = await executeOperationReturnMockData(
    { query: GET_PLACES },
    placeListResponse
  );

  assert(res.body.kind === 'single');
  expect(res.body.singleResult.errors).toBeUndefined();
  // eslint-disable-next-line vitest/prefer-strict-equal
  expect(res.body.singleResult.data?.placeList).toEqual({
    data: [
      {
        id: '1',
        internalId: '1',
        name: {
          fi: 'place1',
        },
      },
      {
        id: '2',
        internalId: '2',
        name: {
          fi: 'place2',
        },
      },
    ],
    meta: {
      count: 1,
    },
  });
});

it('uses correct path when no params are provided', async () => {
  await executeOperationReturnMockData({
    query: GET_PLACES,
  });

  expect(getMock).toHaveBeenCalledWith('place/');
});

it('resolves placeDetails correctly', async () => {
  const placeResponse = {
    id: '1',
    '@id': '1',
    name: {
      fi: 'place1',
    },
  };

  const res = await executeOperationReturnMockData(
    { query: GET_PLACE_DETAILS, variables: { id: '1' } },
    placeResponse
  );

  assert(res.body.kind === 'single');
  expect(res.body.singleResult.errors).toBeUndefined();
  expect(getMock).toHaveBeenCalledWith('place/1/');
  // eslint-disable-next-line vitest/prefer-strict-equal
  expect(res.body.singleResult.data?.placeDetails).toEqual({
    id: '1',
    internalId: '1',
    name: {
      fi: 'place1',
    },
  });
});

const GET_PLACES = gql`
  query PlaceList(
    $dataSource: String
    $divisions: [String]
    $hasUpcomingEvents: Boolean
    $page: Int
    $pageSize: Int
    $showAllPlaces: Boolean
    $sort: String
    $text: String
  ) {
    placeList(
      dataSource: $dataSource
      divisions: $divisions
      hasUpcomingEvents: $hasUpcomingEvents
      page: $page
      pageSize: $pageSize
      showAllPlaces: $showAllPlaces
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

const GET_PLACE_DETAILS = gql`
  query PlaceDetails($id: ID!) {
    placeDetails(id: $id) {
      id
      internalId
      name {
        fi
      }
    }
  }
`;
