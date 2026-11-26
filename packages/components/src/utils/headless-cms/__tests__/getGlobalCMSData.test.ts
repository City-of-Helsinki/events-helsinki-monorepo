import { ApolloClient, InMemoryCache } from '@apollo/client/core/index.js';
import type { MockedResponse } from '@apollo/client/testing';
import { MockLink } from '@apollo/client/testing';
import { MenuDocument } from '@city-of-helsinki/react-helsinki-headless-cms/apollo';
import { GraphQLError } from 'graphql';
import { describe, expect, it } from 'vitest';
import {
  DEFAULT_FOOTER_MENU_NAME,
  DEFAULT_HEADER_MENU_NAME,
  DEFAULT_HEADER_UNIVERSAL_BAR_MENU_NAME,
  HARDCODED_LANGUAGES,
} from '../../../constants';
import getGlobalCMSData from '../getGlobalCMSData';

const createClient = (responses: MockedResponse[]) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink(responses),
    // Same default as EventsFederationApolloClient
    defaultOptions: { query: { errorPolicy: 'all' } },
  });

const menuResponse = (id: string, menu: unknown): MockedResponse => ({
  request: {
    query: MenuDocument,
    variables: { id, menuIdentifiersOnly: true },
  },
  result: { data: { menu } },
});

const fiMenuNames = {
  header: DEFAULT_HEADER_MENU_NAME.fi,
  universalBar: DEFAULT_HEADER_UNIVERSAL_BAR_MENU_NAME.fi,
  footer: DEFAULT_FOOTER_MENU_NAME.fi,
};

describe('getGlobalCMSData', () => {
  it('throws on CMS errors instead of returning undefined menus', async () => {
    const message = "HTTP fetch failed from 'cms': 502: Bad Gateway";
    const client = createClient([
      {
        request: {
          query: MenuDocument,
          variables: { id: fiMenuNames.header, menuIdentifiersOnly: true },
        },
        result: { errors: [new GraphQLError(message)] },
      },
    ]);

    await expect(
      getGlobalCMSData({ client, context: { locale: 'fi' } })
    ).rejects.toThrow(message);
  });

  it('includes present menus and omits absent ones', async () => {
    const headerMenu = { id: 'header', menuItems: { nodes: [] } };
    const client = createClient([
      menuResponse(fiMenuNames.header, headerMenu),
      menuResponse(fiMenuNames.universalBar, null),
      menuResponse(fiMenuNames.footer, null),
    ]);

    const result = await getGlobalCMSData({
      client,
      context: { locale: 'fi' },
    });

    expect(result).toStrictEqual({
      headerMenu: expect.objectContaining({ id: 'header' }),
      languages: HARDCODED_LANGUAGES,
    });
  });
});
