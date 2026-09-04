import assert from 'assert';
import type { GraphQLRequest, GraphQLResponse } from '@apollo/server';
import type { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag';
import type { Mock } from 'vitest';
import { expect, it, vi } from 'vitest';

import EventContext from '../context/EventContext';
import { createTestApolloServer } from '../utils/testUtils';

let getOrganizationDetailsMock: Mock;
const executeOperationReturnMockData = (
  request: Omit<GraphQLRequest, 'query'> & {
    query?: DocumentNode;
  },
  responseMockData: Record<string, unknown> = {}
): Promise<GraphQLResponse> => {
  const contextValue = new EventContext({ token: 'token' });
  getOrganizationDetailsMock = (
    contextValue.dataSources.organization as any
  ).getOrganizationDetails = vi.fn().mockResolvedValue(responseMockData);
  return createTestApolloServer().executeOperation(request, { contextValue });
};

it('resolves organizationDetails correctly', async () => {
  const organizationResponse = {
    id: 'org:123',
    '@id': 'org:123',
    data_source: 'kurjenpojat',
    classification: 'Public',
    name: 'Test Organization',
    founding_date: '2020-01-01',
    dissolution_date: null,
    parent_organization: 'org:456',
    sub_organizations: ['org:789'],
    affiliated_organizations: [],
    created_time: '2020-01-01T00:00:00Z',
    last_modified_time: '2023-01-01T00:00:00Z',
    is_affiliated: false,
    replaced_by: null,
    '@context': 'https://example.com/context',
    '@type': 'Organization',
  };

  const res = await executeOperationReturnMockData(
    { query: GET_ORGANIZATION_DETAILS, variables: { id: 'org:123' } },
    organizationResponse
  );

  assert(res.body.kind === 'single');
  expect(res.body.singleResult.errors).toBeUndefined();
  expect(getOrganizationDetailsMock).toHaveBeenCalledWith('org:123');
  // eslint-disable-next-line vitest/prefer-strict-equal
  expect(res.body.singleResult.data?.organizationDetails).toEqual({
    id: 'org:123',
    internalId: 'org:123',
    dataSource: 'kurjenpojat',
    classification: 'Public',
    name: 'Test Organization',
    foundingDate: '2020-01-01',
    dissolutionDate: null,
    parentOrganization: 'org:456',
    subOrganizations: ['org:789'],
    affiliatedOrganizations: [],
    createdTime: '2020-01-01T00:00:00Z',
    lastModifiedTime: '2023-01-01T00:00:00Z',
    isAffiliated: false,
    replacedBy: null,
    internalContext: 'https://example.com/context',
    internalType: 'Organization',
  });
});

it('handles organization with minimal required fields', async () => {
  const organizationResponse = {
    id: 'org:999',
    '@id': 'org:999',
    name: 'Minimal Organization',
    is_affiliated: false,
    '@context': 'https://example.com/context',
    '@type': 'Organization',
  };

  const res = await executeOperationReturnMockData(
    { query: GET_ORGANIZATION_DETAILS, variables: { id: 'org:999' } },
    organizationResponse
  );

  assert(res.body.kind === 'single');
  expect(res.body.singleResult.errors).toBeUndefined();
  expect(res.body.singleResult.data?.organizationDetails.name).toBe(
    'Minimal Organization'
  );
  expect(res.body.singleResult.data?.organizationDetails.isAffiliated).toBe(
    false
  );
});

const GET_ORGANIZATION_DETAILS = gql`
  query OrganizationDetails($id: ID!) {
    organizationDetails(id: $id) {
      id
      internalId
      dataSource
      classification
      name
      foundingDate
      dissolutionDate
      parentOrganization
      subOrganizations
      affiliatedOrganizations
      createdTime
      lastModifiedTime
      isAffiliated
      replacedBy
      internalContext
      internalType
    }
  }
`;
