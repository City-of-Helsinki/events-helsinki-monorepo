import 'nprogress/nprogress.css';
import type { NavigationProviderProps } from '@events-helsinki/components';
import {
  useLocale,
  BaseApp,
  useCommonTranslation,
} from '@events-helsinki/components';
import { FallbackComponent } from '@events-helsinki/components/app/BaseApp';
import { useRouter } from 'next/router';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

import '../styles/globals.scss';
import { ErrorBoundary } from 'react-error-boundary';
import nextI18nextConfig from '../../next-i18next.config';
import { ROUTES } from '../constants';
import AppConfig from '../domain/app/AppConfig';
import cmsHelper from '../domain/app/headlessCmsHelper';
import HobbiesApolloProvider from '../domain/app/HobbiesApolloProvider';
import routerHelper from '../domain/app/routerHelper';
import {
  getCardUrl,
  getEventListLinkUrl,
  getEventUrl,
  getKeywordOnClickHandler,
  getOrganizationSearchUrl,
  getHelsinkiOnlySearchUrl,
  getPlainEventUrl,
} from '../domain/search/eventSearch/utils';

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
  const appName = t('appHobbies:appName');
  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => (
        <FallbackComponent error={error} appName={appName} />
      )}
    >
      <HobbiesApolloProvider>
        <BaseApp
          appName={appName}
          cmsHelper={cmsHelper}
          routerHelper={routerHelper}
          matomoConfiguration={AppConfig.matomoConfiguration}
          askemFeedbackConfiguration={AppConfig.askemFeedbackConfiguration(
            locale
          )}
          withConsent={pathname !== ROUTES.COOKIE_CONSENT}
          asPath={asPath}
          defaultButtonTheme={AppConfig.defaultButtonTheme}
          defaultButtonVariant={AppConfig.defaultButtonVariant}
          getCardUrl={getCardUrl}
          getEventUrl={getEventUrl}
          getEventListLinkUrl={getEventListLinkUrl}
          getOrganizationSearchUrl={getOrganizationSearchUrl}
          getHelsinkiOnlySearchUrl={getHelsinkiOnlySearchUrl}
          getPlainEventUrl={getPlainEventUrl}
          getKeywordOnClickHandler={getKeywordOnClickHandler}
          {...pageProps}
        >
          <Component {...pageProps} />
        </BaseApp>
      </HobbiesApolloProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(MyApp, {
  ...nextI18nextConfig,
});
