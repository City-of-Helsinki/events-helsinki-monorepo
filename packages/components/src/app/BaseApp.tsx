import {
  MatomoProvider,
  createInstance as createMatomoInstance,
} from '@jonkoops/matomo-tracker-react';
import 'nprogress/nprogress.css';

import { useCookies } from 'hds-react';
import isEqual from 'lodash/isEqual';
import dynamic from 'next/dynamic';
import type { SSRConfig } from 'next-i18next';
import React, { useCallback, useEffect, useState } from 'react';
import { injectStyle } from 'react-toastify/dist/inject-style';

import '../styles/globals.scss';
import '../styles/askem.scss';
import { CmsHelperProvider } from '../cmsHelperProvider';
import { createAskemInstance } from '../components/askem';
import type { AskemConfigs, AskemInstance } from '../components/askem/types';
import ErrorFallback from '../components/errorPages/ErrorFallback';
import EventsCookieConsent from '../components/eventsCookieConsent/EventsCookieConsent';
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
  const { getAllConsents } = useCookies({ cookieDomain });

  // Unset hidden visibility that was applied to hide the first server render
  // that does not include styles from HDS. HDS applies styling by injecting
  // style tags into the head. This requires the existence of a document object.
  // The document object does not exist during server side renders.
  // TODO: Remove this hackfix to ensure that pre-rendered pages'
  //       SEO performance is not impacted.

  React.useEffect(() => {
    setTimeout(() => {
      const body = document?.body;

      if (body) {
        body.style.visibility = 'unset';
      }
    }, 10);
  }, []);

  const [askemConsentGiven, setAskemConsentGiven] = useState<boolean>(false);
  const [askemInstance, setAskemInstance] = useState<AskemInstance | null>(
    null
  );
  const [askemConfiguration, setAskemConfiguration] =
    useState<AskemConfigs | null>(null);

  // todo: matomo is not updated.
  const handleConsentGiven = useCallback(() => {
    const consents = getAllConsents();
    setAskemConsentGiven(
      consents['askemBid'] &&
        consents['askemBidTs'] &&
        consents['askemReaction']
    );
  }, [getAllConsents]);

  useEffect(() => {
    if (asPath) {
      handleConsentGiven();
    }
  }, [handleConsentGiven, asPath]);

  const newAskemConfiguration: AskemConfigs = {
    ...askemConfigurationInput,
    consentGiven: askemConsentGiven,
  };

  if (!askemInstance || !isEqual(askemConfiguration, newAskemConfiguration)) {
    setAskemConfiguration(newAskemConfiguration);
    setAskemInstance(createAskemInstance(newAskemConfiguration));
  }

  const matomoInstance = React.useMemo(
    () => createMatomoInstance(matomoConfiguration),
    [matomoConfiguration]
  );

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
