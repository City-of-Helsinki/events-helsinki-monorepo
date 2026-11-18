import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { MockLink } from '@apollo/client/testing';
import type { MockedResponse } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getStaticProps } from '../../../pages/venues/[venueId]/index';

const { runPageLoader } = vi.hoisted(() => ({ runPageLoader: vi.fn() }));

vi.mock('../../app/getSportsStaticProps', () => ({
  default: runPageLoader,
}));

vi.mock('../../app/AppConfig', () => ({
  default: { isHaukiEnabled: false },
}));

vi.mock('../VenuePageContainer', () => ({ default: () => null }));

vi.mock('../../i18n/serverSideTranslationsWithCommon', () => ({
  default: vi.fn().mockResolvedValue({}),
}));

vi.mock('@events-helsinki/components', async () => {
  const { gql } = await import('@apollo/client');
  return {
    VenueDocument: gql`
      query Venue($id: ID!, $includeHaukiFields: Boolean!) {
        venue(id: $id) {
          id
          isOpen @include(if: $includeHaukiFields)
        }
      }
    `,
    getLanguageOrDefault: () => 'fi',
  };
});

const query = gql`
  query Venue($id: ID!, $includeHaukiFields: Boolean!) {
    venue(id: $id) {
      id
      isOpen @include(if: $includeHaukiFields)
    }
  }
`;

function prepareResponse(response: Pick<MockedResponse, 'result' | 'error'>) {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink([
      {
        request: {
          query,
          variables: { id: 'tprek:8740', includeHaukiFields: false },
        },
        ...response,
      },
    ]),
    defaultOptions: { query: { errorPolicy: 'all' } },
  });
  runPageLoader.mockImplementation(async (_context, loadPage) =>
    loadPage({ apolloClient })
  );
}

const context = { params: { venueId: 'tprek:8740' }, locale: 'fi' };

afterEach(() => {
  vi.clearAllMocks();
});

describe('venue page static props', () => {
  it('rejects GraphQL failures instead of returning a 404', async () => {
    prepareResponse({
      result: {
        data: { venue: null },
        errors: [new GraphQLError('Internal server error')],
      },
    });

    await expect(getStaticProps(context)).rejects.toThrow(
      'Internal server error'
    );
  });

  it('rejects network failures instead of returning a 404', async () => {
    prepareResponse({ error: new Error('Connection failed') });

    await expect(getStaticProps(context)).rejects.toThrow('Connection failed');
  });

  it('returns a 404 when a successful query has no venue', async () => {
    prepareResponse({ result: { data: { venue: null } } });

    await expect(getStaticProps(context)).resolves.toStrictEqual({
      notFound: true,
    });
  });
});
