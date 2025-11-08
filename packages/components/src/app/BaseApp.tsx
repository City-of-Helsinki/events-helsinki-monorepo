import type createMatomoInstance from '@jonkoops/matomo-tracker-react/lib/instance.js';
import MatomoProvider from '@jonkoops/matomo-tracker-react/lib/MatomoProvider.js';

import dynamic from 'next/dynamic';
import type { SSRConfig } from 'next-i18next';
import React from 'react';

import '../styles/globals.scss';
import '../styles/askem.scss';
import { CmsHelperProvider } from '../cmsHelperProvider';
import { MatomoWrapper } from '../components';
import type { createAskemInstance } from '../components/askem';

import ErrorFallback from '../components/errorPages/ErrorFallback';
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
  askemFeedbackConfiguration: askemConfigurationInput,
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

  return (
    <CookieConfigurationProvider
      askemConfiguration={askemConfigurationInput}
      cookieDomain={cookieDomain}
    >
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
              <GeolocationProvider>
                <NavigationProvider
                  headerMenu={headerMenu}
                  headerUniversalBarMenu={headerUniversalBarMenu}
                  footerMenu={footerMenu}
                  languages={languages}
                >
                  <MatomoWrapper>
                    <GeolocationErrorNotification />
                    <ResetFocus />
                    {children}
                    <DynamicToastContainer />
                  </MatomoWrapper>
                </NavigationProvider>
              </GeolocationProvider>
            </MatomoProvider>
          </AppRoutingProvider>
        </CmsHelperProvider>
      </AppThemeProvider>
    </CookieConfigurationProvider>
  );
}

export default BaseApp;
