import 'nprogress/nprogress.css';
import type { NavigationProviderProps } from '@events-helsinki/components';
import { BaseApp, useCommonTranslation } from '@events-helsinki/components';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

import '../styles/globals.scss';
import nextI18nextConfig from '../../next-i18next.config';
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

  return (
    <HobbiesApolloProvider>
      <BaseApp
        appName={t('appHobbies:appName')}
        cmsHelper={cmsHelper}
        routerHelper={routerHelper}
        matomoConfiguration={AppConfig.matomoConfiguration}
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
