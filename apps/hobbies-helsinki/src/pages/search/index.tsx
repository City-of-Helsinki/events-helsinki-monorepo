import {
  NavigationContext,
  useAppHobbiesTranslation,
  Navigation,
  MatomoWrapper,
  FooterSection,
  getLanguageOrDefault,
  usePageScrollRestoration,
  RouteMeta,
} from '@events-helsinki/components';
import type { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useContext } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import { ROUTES } from '../../constants';
import AppConfig from '../../domain/app/AppConfig';
import getHobbiesStaticProps from '../../domain/app/getHobbiesStaticProps';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import AdvancedSearch from '../../domain/search/eventSearch/AdvancedSearch';
import SearchPage from '../../domain/search/eventSearch/SearchPage';

export default function Search() {
  const { t: tAppHobbies } = useAppHobbiesTranslation();
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);
  usePageScrollRestoration();

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
          <>
            <RouteMeta origin={AppConfig.origin} />
            <SearchPage
              SearchComponent={AdvancedSearch}
              pageTitle={tAppHobbies('appHobbies:search.pageTitle')}
            />
          </>
        }
        footer={
          <FooterSection
            menu={footerMenu}
            appName={tAppHobbies('appHobbies:appName')}
            feedbackWithPadding
          />
        }
      />
    </MatomoWrapper>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(language, [
          'event',
          'search',
        ])),
      },
    };
  });
}
