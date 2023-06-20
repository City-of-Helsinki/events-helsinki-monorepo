import {
  MatomoProvider,
  createInstance as createMatomoInstance,
} from '@jonkoops/matomo-tracker-react';
import 'nprogress/nprogress.css';

import { useCookies } from 'hds-react';
import { useRouter } from 'next/router';
import type { SSRConfig } from 'next-i18next';
import React, { useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';

import '../styles/globals.scss';
import '../styles/askem.scss';
import { CmsHelperProvider } from '../cmsHelperProvider';
import { createAskemInstance } from '../components/askem';
import AskemProvider from '../components/askem/AskemProvider';
import ErrorFallback from '../components/errorPages/ErrorFallback';
import EventsCookieConsent from '../components/eventsCookieConsent/EventsCookieConsent';
import ResetFocus from '../components/resetFocus/ResetFocus';
import { GeolocationProvider } from '../geolocation';
import { NavigationProvider } from '../navigationProvider';
import type { NavigationProviderProps } from '../navigationProvider';
import type { CmsRoutedAppHelper, HeadlessCMSHelper } from '../utils';

export type Props = {
  children: React.ReactNode;
  cmsHelper: HeadlessCMSHelper;
  routerHelper: CmsRoutedAppHelper;
  appName: string;
  matomoConfiguration: Parameters<typeof createMatomoInstance>[0];
  askemFeedbackConfiguration: Parameters<typeof createAskemInstance>[0];
} & NavigationProviderProps &
  SSRConfig;

function BaseApp({
  children,
  headerMenu,
  footerMenu,
  languages,
  appName,
  cmsHelper,
  routerHelper,
  matomoConfiguration,
  askemFeedbackConfiguration,
}: Props) {
  const router = useRouter();
  const { getAllConsents } = useCookies();
  const [askemConsentGiven, setAskemConsentGiven] = useState<boolean>(false);

  React.useEffect(() => {
    const consents = getAllConsents();
    setAskemConsentGiven(
      consents['askemBid'] &&
        consents['askemBidTs'] &&
        consents['askemReaction']
    );
  }, [getAllConsents]);

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

  const matomoInstance = React.useMemo(
    () => createMatomoInstance(matomoConfiguration),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [createMatomoInstance, router.pathname]
  );

  const askemFeedbackInstance = React.useMemo(
    () =>
      createAskemInstance({
        ...askemFeedbackConfiguration,
        consentGiven: askemConsentGiven,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [createAskemInstance, askemConsentGiven, router.pathname]
  );

  const FallbackComponent = ({ error }: { error: Error }) => (
    <ErrorFallback error={error} appName={appName} />
  );

  const handleConsentGiven = useCallback(() => {
    const consents = getAllConsents();
    setAskemConsentGiven(
      consents['askemBid'] &&
        consents['askemBidTs'] &&
        consents['askemReaction']
    );
  }, [getAllConsents]);

  return (
    <CmsHelperProvider cmsHelper={cmsHelper} routerHelper={routerHelper}>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <MatomoProvider value={matomoInstance}>
          <AskemProvider value={askemFeedbackInstance}>
            <GeolocationProvider>
              <NavigationProvider
                headerMenu={headerMenu}
                footerMenu={footerMenu}
                languages={languages}
              >
                <ResetFocus />
                {children}
                <EventsCookieConsent
                  onConsentGiven={handleConsentGiven}
                  allowLanguageSwitch={false}
                  appName={appName}
                />
                <ToastContainer />
              </NavigationProvider>
            </GeolocationProvider>
          </AskemProvider>
        </MatomoProvider>
      </ErrorBoundary>
    </CmsHelperProvider>
  );
}

export default BaseApp;
