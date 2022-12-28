import { useAppSportsTranslation } from 'events-helsinki-components';
import NavigationContext from 'events-helsinki-components/src/navigationProvider/NavigationContext';
import type { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useContext } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import Navigation from '../../common-events/components/navigation/Navigation';
import { ROUTES } from '../../constants';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import FooterSection from '../../domain/footer/Footer';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import MatomoWrapper from '../../domain/matomoWrapper/MatomoWrapper';
import SearchPage from '../../domain/search/venueSearch/SearchPage';
import SimpleVenueSearch from '../../domain/search/venueSearch/VenueSearch';
import { getLocaleOrError } from '../../utils/routerUtils';

export default function Search() {
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);
  const { t: tAppSports } = useAppSportsTranslation();

  useEffect(() => {
    const listElement = listRef.current;

    if (scrollTo) {
      const listItemElement = listElement?.querySelector(
        decodeURIComponent(scrollTo.toString())
      );

      if (listItemElement) {
        listItemElement.scrollIntoView({
          block: 'center',
        });
      }
    }
  }, [scrollTo]);

  const { headerMenu, footerMenu, languages } = useContext(NavigationContext);

  return (
    <MatomoWrapper>
      <HCRCApolloPage
        uri={ROUTES.SEARCH}
        className="pageLayout"
        navigation={<Navigation menu={headerMenu} languages={languages} />}
        content={
          <SearchPage
            SearchComponent={SimpleVenueSearch}
            pageTitle={tAppSports('appSports:search.pageTitle')}
          />
        }
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
