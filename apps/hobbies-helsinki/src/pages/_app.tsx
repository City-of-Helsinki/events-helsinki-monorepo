import {
  MatomoProvider,
  createInstance as createMatomoInstance,
} from '@jonkoops/matomo-tracker-react';
import 'nprogress/nprogress.css';
import type { NavigationProviderProps } from 'events-helsinki-components';
import {
  NavigationProvider,
  EventsCookieConsent,
  ResetFocus,
  useCommonTranslation,
  CmsHelperProvider,
  GeolocationProvider,
} from 'events-helsinki-components';
import type { AppProps as NextAppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import type { SSRConfig } from 'next-i18next';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';

import '../styles/globals.scss';
import nextI18nextConfig from '../../next-i18next.config';
import AppConfig from '../domain/app/AppConfig';
import cmsHelper from '../domain/app/headlessCmsHelper';
import HobbiesApolloProvider from '../domain/app/HobbiesApolloProvider';
import routerHelper from '../domain/app/routerHelper';
import ErrorFallback from '../domain/error/ErrorFallback';

const matomoInstance = createMatomoInstance(AppConfig.matomoConfiguration);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppProps<P = any> = {
  pageProps: P;
  Component: React.ComponentType<P>;
};

export type CustomPageProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
} & NavigationProviderProps &
  SSRConfig;

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const { headerMenu, footerMenu, languages } = pageProps;
  const { t } = useCommonTranslation();

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

  return (
    <HobbiesApolloProvider>
      <CmsHelperProvider cmsHelper={cmsHelper} routerHelper={routerHelper}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <MatomoProvider value={matomoInstance}>
            <GeolocationProvider>
              <NavigationProvider
                headerMenu={headerMenu}
                footerMenu={footerMenu}
                languages={languages}
              >
                <ResetFocus />
                <Component {...pageProps} />
                <EventsCookieConsent
                  allowLanguageSwitch={false}
                  appName={t('appHobbies:appName')}
                />
                <ToastContainer />
              </NavigationProvider>
            </GeolocationProvider>
          </MatomoProvider>
        </ErrorBoundary>
      </CmsHelperProvider>
    </HobbiesApolloProvider>
  );
}

export default appWithTranslation(MyApp, {
  ...nextI18nextConfig,
});
