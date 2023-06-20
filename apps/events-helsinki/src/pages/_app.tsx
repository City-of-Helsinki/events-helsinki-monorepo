import 'nprogress/nprogress.css';
import type { NavigationProviderProps } from '@events-helsinki/components';
import {
  useLocale,
  BaseApp,
  useCommonTranslation,
} from '@events-helsinki/components';
import type { AppProps as NextAppProps } from 'next/app';
import { useRouter } from 'next/router';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

import '../styles/globals.scss';
import nextI18nextConfig from '../../next-i18next.config';
import { ROUTES } from '../constants';
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
  const locale = useLocale();
  const { asPath, pathname } = useRouter();

  return (
    <EventsApolloProvider>
      <BaseApp
        appName={t('appEvents:appName')}
        cmsHelper={cmsHelper}
        routerHelper={routerHelper}
        matomoConfiguration={AppConfig.matomoConfiguration}
        askemFeedbackConfiguration={AppConfig.askemFeedbackConfiguration(
          locale
        )}
        withConsent={pathname !== ROUTES.COOKIE_CONSENT}
        asPath={asPath}
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
