import assert from 'assert';
import type { GraphQLRequest, GraphQLResponse } from '@apollo/server';
import type { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
import type { Mock } from 'vitest';
import { expect, it, vi } from 'vitest';

import EventContext from '../context/EventContext';
import { createTestApolloServer } from '../utils/testUtils';

let getNeighborhoodListMock: Mock;
const executeOperationReturnMockData = (
  request: Omit<GraphQLRequest, 'query'> & {
    query?: DocumentNode;
  },
  responseMockData: Record<string, unknown> = {}
): Promise<GraphQLResponse> => {
  const contextValue = new EventContext({ token: 'token' });
  getNeighborhoodListMock = (
    contextValue.dataSources.neighborhood as any
  ).getNeighborhoodList = vi.fn().mockResolvedValue(responseMockData);
  return createTestApolloServer().executeOperation(request, { contextValue });
};

it('resolves neighborhoodList correctly', async () => {
  const neighborhoodResponse = {
    features: [
      {
        properties: {
          aluejako: 'ALUEJAKO',
          nimi_fi: 'Malmi',
          nimi_se: 'Malmö',
        },
      },
      {
        properties: {
          aluejako: 'ALUEJAKO2',
          nimi_fi: 'Kallio',
          nimi_se: 'Kallion',
        },
      },
    ],
    numberReturned: 2,
  };

  const res = await executeOperationReturnMockData(
    { query: GET_NEIGHBORHOODS },
    neighborhoodResponse
  );

  assert(res.body.kind === 'single');
  expect(res.body.singleResult.errors).toBeUndefined();
  expect(getNeighborhoodListMock).toHaveBeenCalled();
  // eslint-disable-next-line vitest/prefer-strict-equal
  expect(res.body.singleResult.data?.neighborhoodList).toEqual({
    data: [
      {
        id: 'aluejako:malmi',
        name: {
          en: 'Malmi',
          fi: 'Malmi',
          sv: 'Malmö',
        },
      },
      {
        id: 'aluejako2:kallio',
        name: {
          en: 'Kallio',
          fi: 'Kallio',
          sv: 'Kallion',
        },
      },
    ],
    meta: {
      count: 2,
      next: null,
      previous: null,
    },
  });
});

it('handles empty neighborhood response', async () => {
  const neighborhoodResponse = {
    features: [],
    numberReturned: 0,
  };

  const res = await executeOperationReturnMockData(
    { query: GET_NEIGHBORHOODS },
    neighborhoodResponse
  );

  assert(res.body.kind === 'single');
  expect(res.body.singleResult.errors).toBeUndefined();
  expect(res.body.singleResult.data?.neighborhoodList.data).toHaveLength(0);
  expect(res.body.singleResult.data?.neighborhoodList.meta.count).toBe(0);
});

const GET_NEIGHBORHOODS = gql`
  query NeighborhoodList {
    neighborhoodList {
      data {
        id
        name {
          en
          fi
          sv
        }
      }
      meta {
        count
        next
        previous
      }
    }
  }
`;
