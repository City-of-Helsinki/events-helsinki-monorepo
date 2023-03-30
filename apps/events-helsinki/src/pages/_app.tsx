import 'nprogress/nprogress.css';
import type { NavigationProviderProps } from '@events-helsinki/components';
import { BaseApp, useCommonTranslation } from '@events-helsinki/components';
import type { AppProps as NextAppProps } from 'next/app';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

import '../styles/globals.scss';
import nextI18nextConfig from '../../next-i18next.config';
import AppConfig from '../domain/app/AppConfig';
import EventsApolloProvider from '../domain/app/EventsApolloProvider';
import cmsHelper from '../domain/app/headlessCmsHelper';
import routerHelper from '../domain/app/routerHelper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

export type CustomPageProps = NavigationProviderProps & SSRConfig;

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const { t } = useCommonTranslation();

  return (
    <EventsApolloProvider>
      <BaseApp
        appName={t('appEvents:appName')}
        cmsHelper={cmsHelper}
        routerHelper={routerHelper}
        matomoConfiguration={AppConfig.matomoConfiguration}
        {...pageProps}
      >
        <Component {...pageProps} />
      </BaseApp>
    </EventsApolloProvider>
  );
}

export default appWithTranslation(MyApp, {
  ...nextI18nextConfig,
});
