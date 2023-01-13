import NavigationContext from 'events-helsinki-components/src/navigationProvider/NavigationContext';
import type { GetStaticPropsContext } from 'next';
import React, { useContext } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import CombinedSearchPage from 'domain/search/combinedSearch/CombinedSearchPage';
import Navigation from '../../common-events/components/navigation/Navigation';
import { ROUTES } from '../../constants';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import FooterSection from '../../domain/footer/Footer';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import MatomoWrapper from '../../domain/matomoWrapper/MatomoWrapper';
import { getLocaleOrError } from '../../utils/routerUtils';

export default function Search() {
  const { headerMenu, footerMenu, languages } = useContext(NavigationContext);

  return (
    <MatomoWrapper>
      <HCRCApolloPage
        uri={ROUTES.SEARCH}
        className="pageLayout"
        navigation={<Navigation menu={headerMenu} languages={languages} />}
        content={<CombinedSearchPage defaultTab="Venue" />}
        footer={<FooterSection menu={footerMenu} />}
      />
    </MatomoWrapper>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async () => {
    const locale = getLocaleOrError(context.locale);
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
