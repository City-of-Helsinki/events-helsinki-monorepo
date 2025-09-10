import type { GraphQLFormattedError } from 'graphql';
import { describe, it, expect, vi } from 'vitest';
import type { EventsFederationApolloClientConfig } from '../EventsFederationApolloClient';
import EventsFederationApolloClient from '../EventsFederationApolloClient';

describe('EventsFederationApolloClient', () => {
  const mockRouterHelper = {
    rewriteInternalURLs: vi.fn((data) => data),
    i18nRoutes: {},
    locales: [],
    URLRewriteMapping: {},
    transformDynamicPathIntoSegmentedDynamicPath: vi.fn((path: string) => path),
    getLocalizedUrl: vi.fn((url: string, _locale: string) => url),
    getCurrentLocale: vi.fn(() => 'en'),
    getDefaultLocale: vi.fn(() => 'en'),
    getPathFromUrl: vi.fn((url: string) => url),
    getI18nPath: vi.fn((path: string, _locale?: string) => path),
    removeQueryParamsFromRouter: vi.fn(() => {}),
    getParsedUrlQueryInput: vi.fn(() => ({})),
    getLocalizedCmsItemUrl: vi.fn(() => ''),
  };

  const baseConfig: EventsFederationApolloClientConfig = {
    federationGraphqlEndpoint: 'https://example.com/graphql',
    routerHelper: mockRouterHelper,
  };

  it('should use custom headers if provided', () => {
    const config = {
      ...baseConfig,
      contextHeaders: { 'x-custom-header': 'test' },
    };
    const client = new EventsFederationApolloClient(config);
    expect(client.config.contextHeaders).toStrictEqual({
      'x-custom-header': 'test',
    });
  });

  it('should allow unauthorized requests if configured', () => {
    const config = {
      ...baseConfig,
      allowUnauthorizedRequests: true,
      federationGraphqlEndpoint: 'https://example.com/graphql',
    };
    const client = new EventsFederationApolloClient(config);
    const httpLink = client.getHttpLink(config.federationGraphqlEndpoint);
    expect(httpLink.options.fetchOptions.agent.rejectUnauthorized).toBeFalsy();
  });

  it('should call handleError on GraphQL error', () => {
    const handleError = vi.fn();
    const config = { ...baseConfig, handleError };
    const client = new EventsFederationApolloClient(config);

    // Simulate error link
    const error = {
      message: 'Test error',
      extensions: {},
      locations: [],
      path: [],
    } as GraphQLFormattedError;
    // @ts-ignore
    client.config.handleError(error);
    expect(handleError).toHaveBeenCalledWith(error);
  });
});
