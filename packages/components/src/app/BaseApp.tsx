import type createMatomoInstance from '@jonkoops/matomo-tracker-react/lib/instance.js';

import dynamic from 'next/dynamic';
import type { SSRConfig } from 'next-i18next';
import React from 'react';

import { CmsHelperProvider } from '../cmsHelperProvider';
import { EventsCookieConsent } from '../components';
import type { createAskemInstance } from '../components/askem';

import ErrorFallback from '../components/errorPages/ErrorFallback';
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
  consentUrl: string;
} & NavigationProviderProps &
  AppRoutingProviderProps &
  AppThemeProviderProps &
  SSRConfig;

const DynamicToastContainer = dynamic(
  () =>
    import('react-toastify').then((mod) => {
      // TODO: Do we need to aplpy styles here as we used to with earlier versions?
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
  cmsHelper,
  cookieDomain,
  routerHelper,
  matomoConfiguration,
  askemFeedbackConfiguration,
  defaultButtonTheme,
  defaultButtonVariant,
  getCardUrl,
  getEventUrl,
  getEventListLinkUrl,
  getOrganizationSearchUrl,
  getHelsinkiOnlySearchUrl,
  getPlainEventUrl,
  getKeywordOnClickHandler,
  appName,
  consentUrl,
}: Props) {
  // TODO: Remove this hackfix to ensure that pre-rendered pages'
  //      SEO performance is not impacted.
  useHdsStyleFix();

  return (
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
          <CookieConfigurationProvider
            askemConfiguration={askemFeedbackConfiguration}
            matomoConfiguration={matomoConfiguration}
            cookieDomain={cookieDomain}
            appName={appName}
            consentUrl={consentUrl}
          >
            <EventsCookieConsent>
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
                  <DynamicToastContainer />
                </NavigationProvider>
              </GeolocationProvider>
            </EventsCookieConsent>
          </CookieConfigurationProvider>
        </AppRoutingProvider>
      </CmsHelperProvider>
    </AppThemeProvider>
  );
}

export default BaseApp;
