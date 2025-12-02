import type {
  BaseAppProps,
  NavigationProviderProps,
} from '@events-helsinki/components';
import {
  useResilientTranslation,
  useLocale,
  BaseApp,
  BaseAppFallbackComponent as FallbackComponent,
  getResilientTranslation,
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
import cmsHelper from '../domain/app/headlessCmsHelper';
import routerHelper from '../domain/app/routerHelper';
import SportsApolloProvider from '../domain/app/SportsApolloProvider';
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
  const appName = resilientT('appSports:appName');
  return <FallbackComponent error={error} appName={appName} />;
};

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const locale = useLocale();
  const { asPath, pathname } = useRouter();
  const appName: BaseAppProps['appName'] = {
    en: getResilientTranslation('appSports:appName', 'en'),
    fi: getResilientTranslation('appSports:appName', 'fi'),
    sv: getResilientTranslation('appSports:appName', 'sv'),
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackComponent}>
      <SportsApolloProvider>
        <BaseApp
          appName={appName}
          globalAppName="Sports"
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
      </SportsApolloProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(MyApp, {
  ...nextI18nextConfig,
});
