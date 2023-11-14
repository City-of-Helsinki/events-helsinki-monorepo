import type { createInstance as createMatomoInstance } from '@jonkoops/matomo-tracker-react';
import { MatomoProvider } from '@jonkoops/matomo-tracker-react';
import 'nprogress/nprogress.css';

import dynamic from 'next/dynamic';
import type { SSRConfig } from 'next-i18next';
import React from 'react';
import { injectStyle } from 'react-toastify/dist/inject-style';

import '../styles/globals.scss';
import '../styles/askem.scss';
import { CmsHelperProvider } from '../cmsHelperProvider';
import type { createAskemInstance } from '../components/askem';
import useAskemContext from '../components/askem/useAskemContext';

import ErrorFallback from '../components/errorPages/ErrorFallback';
import EventsCookieConsent from '../components/eventsCookieConsent/EventsCookieConsent';
import useMatomoInstance from '../components/matomo/useMatomo';
import ResetFocus from '../components/resetFocus/ResetFocus';
import { CookieConfigurationProvider } from '../cookieConfigurationProvider';
import {
  GeolocationProvider,
  GeolocationErrorNotification,
} from '../geolocation';
import { NavigationProvider } from '../navigationProvider';
import type { NavigationProviderProps } from '../navigationProvider';
import {
  AppRoutingProvider,
  type AppRoutingProviderProps,
} from '../routingUrlProvider';
import type { AppThemeProviderProps } from '../themeProvider';
import { AppThemeProvider } from '../themeProvider';
import type { CmsRoutedAppHelper, HeadlessCMSHelper } from '../utils';
import useHdsStyleFix from './useHdsStyleFix';

export type Props = {
  children: React.ReactNode;
  cmsHelper: HeadlessCMSHelper;
  cookieDomain: string;
  routerHelper: CmsRoutedAppHelper;
  appName: string;
  matomoConfiguration: Parameters<typeof createMatomoInstance>[0];
  askemFeedbackConfiguration: Parameters<typeof createAskemInstance>[0];
  onConsentGiven?: (askemConsentGiven: boolean) => void;
  asPath: string;
  withConsent: boolean;
} & NavigationProviderProps &
  AppRoutingProviderProps &
  AppThemeProviderProps &
  SSRConfig;

const AskemProvider = dynamic(
  () => import('../components/askem').then((mod) => mod.AskemProvider),
  {
    ssr: false,
  }
);

const DynamicToastContainer = dynamic(
  () =>
    import('react-toastify').then((mod) => {
      injectStyle();
      return mod.ToastContainer;
    }),
  { ssr: false }
);

export const FallbackComponent = ({
  error,
  appName,
}: {
  error: Error;
  appName: Props['appName'];
}) => <ErrorFallback error={error} appName={appName} />;

function BaseApp({
  children,
  headerMenu,
  headerUniversalBarMenu,
  footerMenu,
  languages,
  appName,
  cmsHelper,
  cookieDomain,
  routerHelper,
  matomoConfiguration,
  askemFeedbackConfiguration: askemConfigurationInput,
  asPath,
  withConsent,
  defaultButtonTheme,
  defaultButtonVariant,
  getCardUrl,
  getEventUrl,
  getEventListLinkUrl,
  getOrganizationSearchUrl,
  getHelsinkiOnlySearchUrl,
  getPlainEventUrl,
  getKeywordOnClickHandler,
}: Props) {
  const matomoInstance = useMatomoInstance(matomoConfiguration);
  const { askemInstance, handleConsentGiven } = useAskemContext({
    cookieDomain,
    asPath,
    askemConfigurationInput,
  });
  // TODO: Remove this hackfix to ensure that pre-rendered pages'
  //      SEO performance is not impacted.
  useHdsStyleFix();

  return (
    <CookieConfigurationProvider cookieDomain={cookieDomain}>
      <AppThemeProvider
        defaultButtonTheme={defaultButtonTheme}
        defaultButtonVariant={defaultButtonVariant}
      >
        <CmsHelperProvider cmsHelper={cmsHelper} routerHelper={routerHelper}>
          <AppRoutingProvider
            getCardUrl={getCardUrl}
            getEventUrl={getEventUrl}
            getEventListLinkUrl={getEventListLinkUrl}
            getOrganizationSearchUrl={getOrganizationSearchUrl}
            getHelsinkiOnlySearchUrl={getHelsinkiOnlySearchUrl}
            getPlainEventUrl={getPlainEventUrl}
            getKeywordOnClickHandler={getKeywordOnClickHandler}
          >
            <MatomoProvider value={matomoInstance}>
              <AskemProvider value={askemInstance}>
                <GeolocationProvider>
                  <NavigationProvider
                    headerMenu={headerMenu}
                    headerUniversalBarMenu={headerUniversalBarMenu}
                    footerMenu={footerMenu}
                    languages={languages}
                  >
                    <GeolocationErrorNotification />
                    <ResetFocus />
                    {children}
                    {withConsent && (
                      <EventsCookieConsent
                        onConsentGiven={handleConsentGiven}
                        allowLanguageSwitch={false}
                        appName={appName}
                      />
                    )}
                    <DynamicToastContainer />
                  </NavigationProvider>
                </GeolocationProvider>
              </AskemProvider>
            </MatomoProvider>
          </AppRoutingProvider>
        </CmsHelperProvider>
      </AppThemeProvider>
    </CookieConfigurationProvider>
  );
}

export default BaseApp;
