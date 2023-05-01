import {
  NavigationContext,
  Navigation,
  MatomoWrapper,
  useCommonTranslation,
  FooterSection,
  getLanguageOrDefault,
  usePageScrollRestoration,
} from '@events-helsinki/components';
import type { GetStaticPropsContext } from 'next';
import React, { useContext } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import { ROUTES } from '../../constants';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import CombinedSearchPage from '../../domain/search/combinedSearch/CombinedSearchPage';

export default function Search() {
  const { footerMenu } = useContext(NavigationContext);
  const { t } = useCommonTranslation();
  usePageScrollRestoration();
  return (
    <MatomoWrapper>
      <HCRCApolloPage
        uri={ROUTES.SEARCH}
        className="pageLayout"
        navigation={<Navigation />}
        content={<CombinedSearchPage defaultTab="Venue" />}
        footer={
          <FooterSection menu={footerMenu} appName={t('appSports:appName')} />
        }
      />
    </MatomoWrapper>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(language, [
          'event',
          'search',
          'errors',
          'venue',
        ])),
      },
    };
  });
}
