import { ApolloProvider } from '@apollo/client';
import { useEventsApolloClientFromConfig } from 'events-helsinki-components';
import type { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useRef, useEffect } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';

import Navigation from '../../common-events/components/navigation/Navigation';
import { ROUTES } from '../../constants';
import getHobbiesStaticProps from '../../domain/app/getHobbiesStaticProps';
import FooterSection from '../../domain/footer/Footer';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import MatomoWrapper from '../../domain/matomoWrapper/MatomoWrapper';
import AdvancedSearch from '../../domain/search/eventSearch/AdvancedSearch';
import SearchPage from '../../domain/search/eventSearch/SearchPage';
import { getLocaleOrError } from '../../utils/routerUtils';

export default function Search() {
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);
  const eventsApolloClient = useEventsApolloClientFromConfig();

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

  return (
    <MatomoWrapper>
      <HCRCApolloPage
        uri={ROUTES.SEARCH}
        className="pageLayout"
        navigation={<Navigation />}
        content={
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <ApolloProvider client={eventsApolloClient}>
            <SearchPage
              SearchComponent={AdvancedSearch}
              pageTitle={'eventSearch.title'}
            />
          </ApolloProvider>
        }
        footer={<FooterSection />}
      />
    </MatomoWrapper>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async () => {
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
