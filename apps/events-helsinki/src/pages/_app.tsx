import type { NavigationProviderProps } from '@events-helsinki/components';
import {
  useResilientTranslation,
  useLocale,
  BaseApp,
  BaseAppFallbackComponent as FallbackComponent,
} from '@events-helsinki/components';
import type { AppProps as NextAppProps } from 'next/app';
import { useRouter } from 'next/router';
import type { SSRConfig } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

import '../styles/globals.scss';
import '../styles/askem.scss';
import { ErrorBoundary } from 'react-error-boundary';
import nextI18nextConfig from '../../next-i18next.config.mjs';
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

const ErrorBoundaryFallbackComponent = ({ error }: { error: Error }) => {
  const { resilientT } = useResilientTranslation();
  const appName = resilientT('appHobbies:appName');
  return <FallbackComponent error={error} appName={appName} />;
};

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const { resilientT } = useResilientTranslation();
  const locale = useLocale();
  const { asPath, pathname } = useRouter();
  const appName = resilientT('appEvents:appName');
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackComponent}>
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
          consentUrl={ROUTES.COOKIE_CONSENT}
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
