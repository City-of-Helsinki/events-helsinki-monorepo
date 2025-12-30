import type {
  ApolloCache,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/index.js';
import { useApolloClient } from '@apollo/client/react/index.js';
import { MockedProvider } from '@apollo/client/testing/index.js';
import type { MockedResponse } from '@apollo/client/testing/index.js';

import {
  ConfigProvider as RHHCConfigProvider,
  defaultConfig as rhhcDefaultConfig,
} from '@city-of-helsinki/react-helsinki-headless-cms';
import type { Config as RHHCConfig } from '@city-of-helsinki/react-helsinki-headless-cms';
import { initTestI18n as i18n } from '@events-helsinki/common-i18n';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Head from 'next/head';
import Link from 'next/link';
import type { NextRouter } from 'next/router';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { I18nextTestStubProvider } from '@/test-utils';

import {
  AppRoutingProvider,
  DEFAULT_LANGUAGE,
  getLanguageCode,
} from '../../src';
import { appRoutingUrlMocks } from './mockDataUtils';
const cmsApiDomain = 'tapahtumat.cms.test.domain.com';

const mockRouter: Partial<NextRouter> = {
  locale: 'fi',
  defaultLocale: 'fi',
  prefetch: () => Promise.resolve(),
};

type Props = {
  mocks?: ReadonlyArray<MockedResponse>;
  children: React.ReactNode;
  router: NextRouter;
  cache?: ApolloCache<Record<string, unknown>> | InMemoryCache;
};
type Error = { message: string };
function ErrorFallback({ error }: { error: Error }) {
  return <p>Test error occurred: {error.message}</p>;
}

function TestProviders({ mocks, children, router }: Props) {
  return (
    <AppRoutingProvider {...appRoutingUrlMocks}>
      <I18nextTestStubProvider>
        <MockedProvider mocks={mocks} addTypename={true}>
          <RHHCConfigProviderWithMockedApolloClient router={router}>
            <RouterContext.Provider value={{ ...router, ...mockRouter }}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                {children}
              </ErrorBoundary>
            </RouterContext.Provider>
          </RHHCConfigProviderWithMockedApolloClient>
        </MockedProvider>
      </I18nextTestStubProvider>
    </AppRoutingProvider>
  );
}

function RHHCConfigProviderWithMockedApolloClient({ children, router }: Props) {
  const cmsApolloClient = useApolloClient(); // Use the mock client
  return (
    <RHHCConfigProvider config={getRHHCConfig(router, cmsApolloClient)}>
      {children}
    </RHHCConfigProvider>
  );
}

function getRHHCConfig(
  router: NextRouter,
  apolloClient: ApolloClient<object>
): RHHCConfig {
  const locale = DEFAULT_LANGUAGE;

  const getIsHrefExternal = (href: string) => {
    if (href.startsWith('/')) return false;
    return (
      !href?.includes(router.basePath) ||
      (cmsApiDomain && !href?.includes(cmsApiDomain))
    );
  };
  const internalHrefOrigins = cmsApiDomain ? [cmsApiDomain] : [];
  const getRoutedInternalHref: RHHCConfig['utils']['getRoutedInternalHref'] =
    () => {
      return '#';
    };

  // FIXME: Fix types of apolloClient/RHHCConfig so they are compatible without casting
  const normalizedCacheObjectApolloClient =
    apolloClient as ApolloClient<NormalizedCacheObject>;

  return {
    ...rhhcDefaultConfig,
    siteName: 'appName',
    currentLanguageCode: getLanguageCode(locale),
    apolloClient: normalizedCacheObjectApolloClient,
    components: {
      ...rhhcDefaultConfig.components,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Head: (props: any) => <Head {...props} />,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Link: ({ href, ...props }: any) => <Link href={href || ''} {...props} />,
    },
    copy: {
      breadcrumbNavigationLabel: i18n.t(
        'common:breadcrumb.breadcrumbNavigationLabel'
      ),
      breadcrumbListLabel: i18n.t('common:breadcrumb.breadcrumbListLabel'),
      menuButtonLabel: i18n.t('common:menu.menuButtonLabel'),
      menuToggleAriaLabel: i18n.t('common:menu.menuToggleAriaLabel'),
      skipToContentLabel: i18n.t('common:linkSkipToContent'),
      openInExternalDomainAriaLabel: i18n.t(
        'common:srOnly.opensInAnExternalSite'
      ),
      openInNewTabAriaLabel: i18n.t('common:srOnly.opensInANewTab'),
      closeButtonLabelText: i18n.t('common:button.close'),
      loadMoreButtonLabelText: i18n.t('common:button.loadMore'),
      showAllText: i18n.t('common:button.showAll'),
      next: i18n.t('common:next'),
      previous: i18n.t('common:previous'),
      archiveSearch: {
        title: i18n.t('cms:archiveSearch.title'),
        searchTextPlaceholder: i18n.t(
          'cms:archiveSearch.searchTextPlaceholder'
        ),
        searchButtonLabelText: i18n.t(
          'cms:archiveSearch.searchButtonLabelText'
        ),
        loadMoreButtonLabelText: i18n.t(
          'cms:archiveSearch.loadMoreButtonLabelText'
        ),
        noResultsTitle: i18n.t('cms:archiveSearch.noResultsTitle'),
        noResultsText: i18n.t('cms:archiveSearch.noResultsText'),
        clearAll: i18n.t('cms:archiveSearch.buttonClearFilters'),
      },
    },
    utils: {
      ...rhhcDefaultConfig.utils,
      getIsHrefExternal,

      getRoutedInternalHref,
    },
    internalHrefOrigins,
  };
}

export default TestProviders;
