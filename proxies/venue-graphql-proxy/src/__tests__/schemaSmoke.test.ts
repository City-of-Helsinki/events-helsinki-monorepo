// @vitest-environment node
//
// @apollo/server pulls in real Node built-ins (e.g. `node:events`, `node:http`).
// The project's default Vitest environment is jsdom (for DOM/component tests),
// but jsdom's sandboxed realm cannot resolve `node:`-prefixed built-in modules,
// which surfaces as `ERR_UNKNOWN_BUILTIN_MODULE` in CI's fresh installs. Force
// the Node environment for this file only, since it exercises the real
// Apollo Server + schema, not any DOM APIs.
import assert from 'assert';
import type { GraphQLResponse } from '@apollo/server';
import { gql } from 'graphql-tag';

import VenueContext from '../context/VenueContext';
import type { TprekUnit } from '../types';
import { createTestApolloServer } from '../utils/testUtils';

/**
 * Minimal TprekUnit fixture. Deliberately omits dept_id / org_id /
 * ontologytree_ids / ontologyword_ids so the department/organization/ontology
 * enrichers take their "no id" short-circuit branch and never call the
 * network - those enrichers get their own dedicated tests elsewhere.
 */
const buildTprekUnitMock = (id: number): TprekUnit =>
  ({
    id,
    name_fi: 'Test Venue',
    displayed_service_owner_type: 'municipal',
    created_time: '2020-01-01T00:00:00Z',
    modified_time: '2020-01-01T00:00:00Z',
    connections: [],
    ontologyword_details: [],
    service_descriptions: [],
    accessibility_sentences: [],
  }) as unknown as TprekUnit;

const mockDataSources = (
  contextValue: VenueContext,
  { withServiceMap }: { withServiceMap?: TprekUnit } = {}
) => {
  if (withServiceMap !== undefined) {
    (contextValue.dataSources.serviceMap as any).getUnit = vi
      .fn()
      .mockResolvedValue(withServiceMap);
  }
  (contextValue.dataSources.hauki as any).getIsOpen = vi
    .fn()
    .mockResolvedValue({ is_open: true });
  (contextValue.dataSources.hauki as any).getOpeningHours = vi
    .fn()
    .mockResolvedValue([]);
};

const executeOperation = (
  query: ReturnType<typeof gql>,
  variables: Record<string, unknown>,
  contextValue: VenueContext
): Promise<GraphQLResponse> =>
  createTestApolloServer().executeOperation(
    { query, variables },
    { contextValue }
  );

// HaukiDataSource / ServiceMapDataSource require these to be set at
// construction time. Locally they come from a gitignored `.env` file, which
// isn't present in CI, so stub them here with their real (public, non-secret)
// base URLs rather than depending on the environment.
beforeAll(() => {
  vi.stubEnv('GRAPHQL_PROXY_HAUKI_DATASOURCE', 'https://hauki.api.hel.fi/v1/');
  vi.stubEnv(
    'GRAPHQL_PROXY_SERVICE_MAP_DATASOURCE',
    'https://www.hel.fi/palvelukarttaws/rest/v4/'
  );
});

afterAll(() => {
  vi.unstubAllEnvs();
});

it('creates a VenueContext with hauki and serviceMap data sources', () => {
  const contextValue = new VenueContext({ token: 'token' });

  expect(contextValue.dataSources.hauki).toBeDefined();
  expect(contextValue.dataSources.serviceMap).toBeDefined();
});

it('returns a GraphQLError for an unparsable venue id', async () => {
  const contextValue = new VenueContext({ token: 'token' });
  mockDataSources(contextValue);

  const res = await executeOperation(
    GET_VENUE,
    { id: 'not-a-valid-id' },
    contextValue
  );

  assert(res.body.kind === 'single');
  expect(res.body.singleResult.errors?.[0]?.message).toBe(
    'Invalid ID parameter'
  );
});

it('resolves a tprek venue by merging service map and hauki data', async () => {
  const contextValue = new VenueContext({ token: 'token' });
  mockDataSources(contextValue, { withServiceMap: buildTprekUnitMock(8215) });

  const res = await executeOperation(
    GET_VENUE,
    { id: 'tprek:8215' },
    contextValue
  );

  assert(res.body.kind === 'single');
  expect(res.body.singleResult.errors).toBeUndefined();
  // eslint-disable-next-line vitest/prefer-strict-equal
  expect(res.body.singleResult.data?.venue).toEqual({
    id: 'tprek:8215',
    name: 'Test Venue',
    isOpen: true,
    openingHours: [],
  });
});

it('resolves venuesByIds and filters out venues without an id', async () => {
  const contextValue = new VenueContext({ token: 'token' });
  mockDataSources(contextValue, { withServiceMap: buildTprekUnitMock(8215) });

  // "linked" source only runs the Hauki integrations (no service map lookup),
  // so the merged result never gets an `id` and must be filtered out.
  const res = await executeOperation(
    GET_VENUES_BY_IDS,
    { ids: ['tprek:8215', 'linked:999'] },
    contextValue
  );

  assert(res.body.kind === 'single');
  expect(res.body.singleResult.errors).toBeUndefined();
  // eslint-disable-next-line vitest/prefer-strict-equal
  expect(res.body.singleResult.data?.venuesByIds).toEqual([
    { id: 'tprek:8215', name: 'Test Venue' },
  ]);
});

const GET_VENUE = gql`
  query GetVenue($id: ID!) {
    venue(id: $id) {
      id
      name
      isOpen
      openingHours {
        date
      }
    }
  }
`;

const GET_VENUES_BY_IDS = gql`
  query GetVenuesByIds($ids: [ID!]) {
    venuesByIds(ids: $ids) {
      id
      name
    }
  }
`;
