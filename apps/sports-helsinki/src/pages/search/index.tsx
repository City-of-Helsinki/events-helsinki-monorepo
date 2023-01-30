import { NavigationContext, Navigation } from 'events-helsinki-components';
import type { GetStaticPropsContext } from 'next';
import React, { useContext } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import { ROUTES } from '../../constants';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import routerHelper from '../../domain/app/routerHelper';
import FooterSection from '../../domain/footer/Footer';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import MatomoWrapper from '../../domain/matomoWrapper/MatomoWrapper';
import CombinedSearchPage from '../../domain/search/combinedSearch/CombinedSearchPage';

export default function Search() {
  const { footerMenu } = useContext(NavigationContext);

  return (
    <MatomoWrapper>
      <HCRCApolloPage
        uri={ROUTES.SEARCH}
        className="pageLayout"
        navigation={<Navigation />}
        content={<CombinedSearchPage defaultTab="Venue" />}
        footer={<FooterSection menu={footerMenu} />}
      />
    </MatomoWrapper>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async () => {
    const locale = routerHelper.getLocaleOrError(context.locale);
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(locale, [
          'common',
          'home',
          'event',
          'search',
        ])),
      },
    };
  });
}
