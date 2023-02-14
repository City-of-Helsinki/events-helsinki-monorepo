import {
  NavigationContext,
  useAppEventsTranslation,
  Navigation,
  MatomoWrapper,
  getLanguageOrDefault,
  FooterSection,
} from 'events-helsinki-components';
import type { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useContext } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import { ROUTES } from '../../constants';
import getEventsStaticProps from '../../domain/app/getEventsStaticProps';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import AdvancedSearch from '../../domain/search/eventSearch/AdvancedSearch';
import SearchPage from '../../domain/search/eventSearch/SearchPage';

export default function Search() {
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);
  const { t: tAppEvents } = useAppEventsTranslation();

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

  const { footerMenu } = useContext(NavigationContext);

  return (
    <MatomoWrapper>
      <HCRCApolloPage
        uri={ROUTES.SEARCH}
        className="pageLayout"
        navigation={<Navigation />}
        content={
          <SearchPage
            SearchComponent={AdvancedSearch}
            pageTitle={tAppEvents('appEvents:search.pageTitle')}
          />
        }
        footer={
          <FooterSection
            menu={footerMenu}
            appName={tAppEvents('appEvents:appName')}
          />
        }
      />
    </MatomoWrapper>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getEventsStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(language, [
          'common',
          'home',
          'event',
          'search',
        ])),
      },
    };
  });
}
