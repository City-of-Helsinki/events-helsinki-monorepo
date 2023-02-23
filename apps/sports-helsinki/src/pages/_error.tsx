import 'nprogress/nprogress.css';
import {
  CmsHelperProvider,
  getLanguageOrDefault,
  UnknownError,
  useCommonTranslation,
  NavigationProvider,
} from 'events-helsinki-components';
import type { GetStaticPropsContext } from 'next';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

import nextI18nextConfig from '../../next-i18next.config';
import ApolloProvider from '../domain/app/ApolloProvider';
import getSportsStaticProps from '../domain/app/getSportsStaticProps';
import cmsHelper from '../domain/app/headlessCmsHelper';
import routerHelper from '../domain/app/routerHelper';

import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';
import type { AppProps, CustomPageProps } from './_app';

function NextErrorPage({ pageProps }: AppProps<CustomPageProps>) {
  const { error, headerMenu, footerMenu, languages } = pageProps;
  console.log('_error page!!');
  const { t } = useCommonTranslation();
  return (
    <ApolloProvider serverError={error}>
      <CmsHelperProvider cmsHelper={cmsHelper} routerHelper={routerHelper}>
        <NavigationProvider
          headerMenu={headerMenu}
          footerMenu={footerMenu}
          languages={languages}
        >
          <UnknownError t={t} appName={t(`appSports:appName`)} />
        </NavigationProvider>
      </CmsHelperProvider>
    </ApolloProvider>
  );
}
export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(language, ['common'])),
      },
    };
  });
}
export default appWithTranslation(NextErrorPage, {
  ...nextI18nextConfig,
});
