import type { NavigationProviderProps } from '@events-helsinki/components';
import {
  useLocale,
  BaseApp,
  useAppEventsTranslation,
} from '@events-helsinki/components';
import { FallbackComponent } from '@events-helsinki/components/app/BaseApp';
import type { AppProps as NextAppProps } from 'next/app';
import { useRouter } from 'next/router';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

import '../styles/globals.scss';
import { ErrorBoundary } from 'react-error-boundary';
import nextI18nextConfig from '../../next-i18next.config';
import { ROUTES } from '../constants';
import AppConfig from '../domain/app/AppConfig';
import EventsApolloProvider from '../domain/app/EventsApolloProvider';
import cmsHelper from '../domain/app/headlessCmsHelper';
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
} & Omit<NextAppProps<P>, 'pageProps'>;

export type CustomPageProps = NavigationProviderProps & SSRConfig;

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const { t } = useAppEventsTranslation();
  const locale = useLocale();
  const { asPath, pathname } = useRouter();
  const appName = t('appEvents:appName');
  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => (
        <FallbackComponent error={error} appName={appName} />
      )}
    >
      <EventsApolloProvider>
        <BaseApp
          appName={appName}
          cmsHelper={cmsHelper}
          cookieDomain={AppConfig.hostname}
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
      </EventsApolloProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(MyApp, {
  ...nextI18nextConfig,
});
