import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import {
  MatomoProvider,
  createInstance as createMatomoInstance,
} from '@jonkoops/matomo-tracker-react';
import 'nprogress/nprogress.css';
import { LoadingSpinner } from 'hds-react';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import type { AppProps as NextAppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Error from 'next/error';
import type { NextRouter } from 'next/router';
import React from 'react';
import { ConfigProvider as RHHCConfigProvider } from 'react-helsinki-headless-cms';
import { ToastContainer } from 'react-toastify';

import '../styles/globals.scss';
import EventsConfigProvider from '../common-events/configProvider/ConfigProvider';
import AppConfig from '../domain/app/AppConfig';
import { useCmsApollo } from '../domain/clients/cmsApolloClient';
import { useEventsApolloClient } from '../domain/clients/eventsApolloClient';
import useEventsConfig from '../hooks/useEventsConfig';
import useRHHCConfig from '../hooks/useRHHCConfig';

const matomoInstance = createMatomoInstance(AppConfig.matomoConfiguration);

const TopProgressBar = dynamic(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  () => {
    return import('events-helsinki-components').then(
      (components) => components.TopProgressBar
    );
  },
  { ssr: false }
);

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
  initialApolloState: NormalizedCacheObject;
  initialEventsApolloState: NormalizedCacheObject;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
} & SSRConfig;

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const {
    initialApolloState: initialCmsApolloState,
    initialEventsApolloState,
    error,
  } = pageProps;
  // console.debug({ initialCmsApolloState, initialEventsApolloState });
  const cmsApolloClient = useCmsApollo(initialCmsApolloState);
  const eventsApolloClient = useEventsApolloClient(initialEventsApolloState);
  const eventsConfig = useEventsConfig(eventsApolloClient);
  const router = eventsConfig.router as NextRouter;
  const rhhcConfig = useRHHCConfig(cmsApolloClient, eventsApolloClient);

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
    <EventsConfigProvider config={eventsConfig}>
      <RHHCConfigProvider config={rhhcConfig}>
        <TopProgressBar />
        <ApolloProvider client={cmsApolloClient}>
          <ApolloProvider client={eventsApolloClient}>
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
                <Component {...pageProps} />
              )}
            </MatomoProvider>
          </ApolloProvider>
        </ApolloProvider>
        <ToastContainer />
      </RHHCConfigProvider>
    </EventsConfigProvider>
  );
}

export default appWithTranslation(MyApp);
