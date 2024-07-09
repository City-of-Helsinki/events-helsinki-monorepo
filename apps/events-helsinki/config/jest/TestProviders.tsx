import type {
  ApolloCache,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import type { MockedResponse } from '@apollo/client/testing';
import { MockedProvider } from '@apollo/client/testing';
import {
  AppRoutingProvider,
  CmsHelperProvider,
  DEFAULT_LANGUAGE,
  getLanguageCode,
  NavigationContext,
} from '@events-helsinki/components';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import Head from 'next/head';
import Link from 'next/link';
import type { NextRouter } from 'next/router';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { Config as RHHCConfig } from 'react-helsinki-headless-cms';
import {
  ModuleItemTypeEnum,
  ConfigProvider as RHHCConfigProvider,
  getUri,
  defaultConfig as rhhcDefaultConfig,
} from 'react-helsinki-headless-cms';
import { I18nextProvider } from 'react-i18next';
import { ROUTES } from '../../src/constants';
import cmsHelper from '../../src/domain/app/headlessCmsHelper';
import routerHelper from '../../src/domain/app/routerHelper';
import { initI18n as i18n } from './initI18n';
import { appRoutingUrlMocks } from './mockDataUtils';

const CMS_API_DOMAIN = 'tapahtumat.cms.test.domain.com';

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

function ErrorFallback({ error }: { error: Error }) {
  return <p>Test error occurred: {error.message}</p>;
}

function TestProviders({ mocks, children, router }: Props) {
  return (
    <AppRoutingProvider {...appRoutingUrlMocks}>
      <I18nextProvider i18n={i18n}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <RHHCConfigProviderWithMockedApolloClient router={router}>
            <CmsHelperProvider
              cmsHelper={cmsHelper}
              routerHelper={routerHelper}
            >
              <NavigationContext.Provider value={{}}>
                <RouterContext.Provider value={{ ...router, ...mockRouter }}>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    {children}
                  </ErrorBoundary>
                </RouterContext.Provider>
              </NavigationContext.Provider>
            </CmsHelperProvider>
          </RHHCConfigProviderWithMockedApolloClient>
        </MockedProvider>
      </I18nextProvider>
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
    return !!(
      !href?.includes(router.basePath) ||
      (CMS_API_DOMAIN && !href?.includes(CMS_API_DOMAIN))
    );
  };
  const internalHrefOrigins = CMS_API_DOMAIN ? [CMS_API_DOMAIN] : [];
  const getRoutedInternalHref: RHHCConfig['utils']['getRoutedInternalHref'] = (
    link,
    type
  ) => {
    if (!link) {
      return '#';
    }

    const uri = getUri(link, internalHrefOrigins, getIsHrefExternal);

    if (type === ModuleItemTypeEnum.Article) {
      return routerHelper.getLocalizedCmsItemUrl(
        ROUTES.ARTICLES,
        { slug: uri.replace(/^\//, '') },
        locale
      );
    }
    if (type === ModuleItemTypeEnum.Page) {
      return routerHelper.getLocalizedCmsItemUrl(
        ROUTES.PAGES,
        { slug: uri.replace(/^\//, '') },
        locale
      );
    }
    if (type === ModuleItemTypeEnum.Event) {
      return routerHelper.getLocalizedCmsItemUrl(
        ROUTES.EVENTS,
        { eventId: uri.replace(/^\//, '') },
        locale
      );
    }
    // TODO: test the default case
    return routerHelper.getLocalizedCmsItemUrl(link, {}, locale);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getRoutedInternalHref,
    },
    internalHrefOrigins,
  };
}

export default TestProviders;
