import { ApolloProvider } from '@apollo/client';
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
} from 'events-helsinki-components';
import { LoadingSpinner } from 'hds-react';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import type { AppProps as NextAppProps } from 'next/app';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';
import { ConfigProvider as RHHCConfigProvider } from 'react-helsinki-headless-cms';
import { ToastContainer } from 'react-toastify';

import '../styles/globals.scss';
import nextI18nextConfig from '../../next-i18next.config';
import AppConfig from '../domain/app/AppConfig';
import { useApolloClient } from '../domain/clients/eventsFederationApolloClient';
import useRHHCConfig from '../hooks/useRHHCConfig';

const matomoInstance = createMatomoInstance(AppConfig.matomoConfiguration);

function Center({ children }: { children: React.ReactNode }) {
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
      {children}
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
  const apolloClient = useApolloClient();
  const router = useRouter();
  const rhhcConfig = useRHHCConfig();
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
    <ApolloProvider client={apolloClient}>
      <RHHCConfigProvider config={rhhcConfig}>
        <NavigationProvider
          headerMenu={headerMenu}
          footerMenu={footerMenu}
          languages={languages}
        >
          <ResetFocus />
          <MatomoProvider value={matomoInstance}>
            {router.isFallback ? (
              <Center>
                <LoadingSpinner />
              </Center>
            ) : error ? (
              <Error
                statusCode={error.networkError?.statusCode ?? 400}
                title={error.title}
              />
            ) : (
              <>
                <Component {...pageProps} />
                <EventsCookieConsent
                  allowLanguageSwitch={false}
                  appName={t('appEvents:appName')}
                />
              </>
            )}
          </MatomoProvider>
          <ToastContainer />
        </NavigationProvider>
      </RHHCConfigProvider>
    </ApolloProvider>
  );
}

export default appWithTranslation(MyApp, {
  ...nextI18nextConfig,
});
