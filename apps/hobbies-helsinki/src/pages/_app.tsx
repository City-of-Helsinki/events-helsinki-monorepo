import 'nprogress/nprogress.css';
import type { NavigationProviderProps } from '@events-helsinki/components';
import {
  useLocale,
  BaseApp,
  useCommonTranslation,
} from '@events-helsinki/components';
import { useRouter } from 'next/router';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

import '../styles/globals.scss';
import nextI18nextConfig from '../../next-i18next.config';
import { ROUTES } from '../constants';
import AppConfig from '../domain/app/AppConfig';
import cmsHelper from '../domain/app/headlessCmsHelper';
import HobbiesApolloProvider from '../domain/app/HobbiesApolloProvider';
import routerHelper from '../domain/app/routerHelper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppProps<P = any> = {
  pageProps: P;
  Component: React.ComponentType<P>;
};

export type CustomPageProps = NavigationProviderProps & SSRConfig;

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const { t } = useCommonTranslation();
  const locale = useLocale();
  const { asPath, pathname } = useRouter();

  return (
    <HobbiesApolloProvider>
      <BaseApp
        appName={t('appHobbies:appName')}
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
    </HobbiesApolloProvider>
  );
}

export default appWithTranslation(MyApp, {
  ...nextI18nextConfig,
});
