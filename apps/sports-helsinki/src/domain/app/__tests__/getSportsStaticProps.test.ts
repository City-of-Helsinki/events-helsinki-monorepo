import { ApolloClient, InMemoryCache } from '@apollo/client';
import { MockLink } from '@apollo/client/testing';
import type { MockedResponse } from '@apollo/client/testing';
import { MenuDocument } from '@city-of-helsinki/react-helsinki-headless-cms/apollo';
import { GraphQLError } from 'graphql';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { staticGenerationLogger } from '../../../logger';
import initializeSportsApolloClient from '../../clients/sportsApolloClient';
import getSportsStaticProps from '../getSportsStaticProps';

vi.mock('../../clients/sportsApolloClient', () => ({ default: vi.fn() }));
vi.mock('../../../logger', () => ({
  staticGenerationLogger: { error: vi.fn() },
}));
vi.mock('../AppConfig', () => ({ default: { defaultRevalidate: 60 } }));
vi.mock('@events-helsinki/components', () => ({
  DEFAULT_HEADER_MENU_NAME: { fi: 'Sports Helsinki Header FI' },
  DEFAULT_HEADER_UNIVERSAL_BAR_MENU_NAME: {
    fi: 'Sports Helsinki Universal bar FI',
  },
  DEFAULT_FOOTER_MENU_NAME: { fi: 'Sports Helsinki Footer FI' },
  HARDCODED_LANGUAGES: ['fi'],
  getLanguageOrDefault: () => 'fi',
}));

function prepareResponses(responses: MockedResponse[]) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink(responses),
    defaultOptions: { query: { errorPolicy: 'all' } },
  });
  vi.mocked(initializeSportsApolloClient).mockReturnValue(client);
}

const menuRequest = (id: string) => ({
  query: MenuDocument,
  variables: { id, menuIdentifiersOnly: true },
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('getSportsStaticProps', () => {
  it.each([
    "HTTP fetch failed from 'cms': 502: Bad Gateway",
    "HTTP fetch failed from 'cms': 503: Service Unavailable",
    "HTTP fetch failed from 'cms': unsupported content-type: text/html",
  ])(
    'propagates CMS errors rather than returning undefined props: %s',
    async (message) => {
      prepareResponses([
        {
          request: menuRequest('Sports Helsinki Header FI'),
          result: { errors: [new GraphQLError(message)] },
        },
      ]);
      const loadPage = vi.fn().mockResolvedValue({ props: {} });

      await expect(
        getSportsStaticProps({ locale: 'fi' }, loadPage)
      ).rejects.toThrow(message);

      expect(loadPage).not.toHaveBeenCalled();
      expect(staticGenerationLogger.error).toHaveBeenCalledWith(
        'Error while generating a page (with locale "fi"):',
        expect.objectContaining({ message })
      );
    }
  );

  it('omits absent optional menus instead of returning undefined props', async () => {
    prepareResponses(
      [
        'Sports Helsinki Header FI',
        'Sports Helsinki Universal bar FI',
        'Sports Helsinki Footer FI',
      ].map((id) => ({
        request: menuRequest(id),
        result: { data: { menu: null } },
      }))
    );

    const result = await getSportsStaticProps({ locale: 'fi' }, async () => ({
      props: { title: 'Not found' },
    }));

    expect(result.props).toMatchObject({
      title: 'Not found',
      locale: 'fi',
      languages: ['fi'],
    });
    expect(result.props).not.toHaveProperty('headerMenu');
    expect(result.props).not.toHaveProperty('headerUniversalBarMenu');
    expect(result.props).not.toHaveProperty('footerMenu');
    expect(result.revalidate).toBe(60);
  });
});
