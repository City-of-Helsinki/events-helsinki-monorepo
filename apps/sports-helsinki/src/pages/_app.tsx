import {
  MatomoProvider,
  createInstance as createMatomoInstance,
} from '@jonkoops/matomo-tracker-react';
import 'nprogress/nprogress.css';
import type { NavigationProviderProps } from 'events-helsinki-components';
import {
  CmsHelperProvider,
  EventsCookieConsent,
  ResetFocus,
  useCommonTranslation,
  NavigationProvider,
  GeolocationProvider,
} from 'events-helsinki-components';
import { LoadingSpinner } from 'hds-react';
import type { AppProps as NextAppProps } from 'next/app';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';

import '../styles/globals.scss';
import nextI18nextConfig from '../../next-i18next.config';
import ApolloProvider from '../domain/app/ApolloProvider';
import AppConfig from '../domain/app/AppConfig';
import cmsHelper from '../domain/app/headlessCmsHelper';
import routerHelper from '../domain/app/routerHelper';
import ErrorFallback from '../domain/error/ErrorFallback';

const matomoInstance = createMatomoInstance(AppConfig.matomoConfiguration);

function PageLoadingSpinner() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingSpinner />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

export type CustomPageProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
} & NavigationProviderProps &
  SSRConfig;

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const { error, headerMenu, footerMenu, languages } = pageProps;
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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <React.Suspense fallback={<PageLoadingSpinner />}>
        <GeolocationProvider>
          <ApolloProvider serverError={error}>
            <CmsHelperProvider
              cmsHelper={cmsHelper}
              routerHelper={routerHelper}
            >
              <MatomoProvider value={matomoInstance}>
                <NavigationProvider
                  headerMenu={headerMenu}
                  footerMenu={footerMenu}
                  languages={languages}
                >
                  <ResetFocus />
                  <Component {...pageProps} />
                  <EventsCookieConsent
                    allowLanguageSwitch={false}
                    appName={t('appSports:appName')}
                  />
                  <ToastContainer />
                </NavigationProvider>
              </MatomoProvider>
            </CmsHelperProvider>
          </ApolloProvider>
        </GeolocationProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default appWithTranslation(MyApp, {
  ...nextI18nextConfig,
});
