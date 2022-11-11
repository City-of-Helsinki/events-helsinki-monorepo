import type { ApolloCache, ApolloClient, InMemoryCache } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import type { MockedResponse } from '@apollo/client/testing';
import i18n from 'events-helsinki-common-i18n/tests/initI18n';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import Head from 'next/head';
import Link from 'next/link';
import type { NextRouter } from 'next/router';
import React from 'react';
import {
  ConfigProvider as RHHCConfigProvider,
  defaultConfig as rhhcDefaultConfig,
} from 'react-helsinki-headless-cms';
import type { Config as RHHCConfig } from 'react-helsinki-headless-cms';
import { I18nextTestStubProvider } from '@/test-utils/I18nextTestStubProvider';
import type { Config as EventConfig } from '../../src';
import { ConfigProvider, DEFAULT_LANGUAGE, defaultConfig } from '../../src';

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

function TestProviders({ mocks, children, router }: Props) {
  return (
    <I18nextTestStubProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <EventsConfigProviderWithMockedApolloClient router={router}>
          <RHHCConfigProviderWithMockedApolloClient router={router}>
            <RouterContext.Provider value={{ ...router, ...mockRouter }}>
              {children}
            </RouterContext.Provider>
          </RHHCConfigProviderWithMockedApolloClient>
        </EventsConfigProviderWithMockedApolloClient>
      </MockedProvider>
    </I18nextTestStubProvider>
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

function EventsConfigProviderWithMockedApolloClient({
  children,
  router,
}: Props) {
  const eventsApolloClient = useApolloClient(); // Use the mock client
  return (
    <ConfigProvider config={getEventsConfig(router, eventsApolloClient)}>
      {children}
    </ConfigProvider>
  );
}

function getEventsConfig(
  router: NextRouter,
  eventsApolloClient: ApolloClient<object>
) {
  return {
    ...defaultConfig,
    t: i18n.t,
    apolloClient: eventsApolloClient,
    router,
  } as unknown as EventConfig;
}

function getRHHCConfig(router: NextRouter, apolloClient: ApolloClient<object>) {
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

  return {
    ...rhhcDefaultConfig,
    siteName: 'appName',
    currentLanguageCode: locale.toUpperCase(),
    apolloClient,
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
      menuToggleAriaLabel: i18n.t('common:menu.menuToggleAriaLabel'),
      skipToContentLabel: i18n.t('common:linkSkipToContent'),
      openInExternalDomainAriaLabel: i18n.t(
        'common:srOnly.opensInAnExternalSite'
      ),
      openInNewTabAriaLabel: i18n.t('common:srOnly.opensInANewTab'),
      closeButtonLabelText: i18n.t('common:button.close'),
      archiveSearch: {
        searchTextPlaceholder: i18n.t(
          'cms:archiveSearch.searchTextPlaceholder'
        ),
        searchButtonLabelText: i18n.t(
          'cms:archiveSearch.searchButtonLabelText'
        ),
        loadMoreButtonLabelText: i18n.t(
          'cms:archiveSearch.loadMoreButtonLabelText'
        ),
        noResultsText: i18n.t('cms:archiveSearch.noResultsText'),
      },
    },
    utils: {
      ...rhhcDefaultConfig.utils,
      getIsHrefExternal,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getRoutedInternalHref,
    },
    internalHrefOrigins,
  } as unknown as RHHCConfig;
}

export default TestProviders;
