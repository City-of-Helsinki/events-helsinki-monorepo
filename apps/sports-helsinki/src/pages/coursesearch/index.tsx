import { EventTypeId, NavigationContext } from 'events-helsinki-components';
import type { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useContext } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import AdvancedSearch from 'domain/search/eventSearch/AdvancedSearch';
import Navigation from '../../common-events/components/navigation/Navigation';
import { ROUTES } from '../../constants';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import FooterSection from '../../domain/footer/Footer';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import MatomoWrapper from '../../domain/matomoWrapper/MatomoWrapper';
import SearchPage from '../../domain/search/eventSearch/SearchPage';
import { getLocaleOrError } from '../../utils/routerUtils';

export default function Search() {
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);
  // Check whether the eventType search param is given
  const hasEventTypeParam = !!new URLSearchParams(
    router.asPath.split('?')[1]
  ).get('eventType');

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

  // If the event type param is not given, add it and
  // forward the browser to the proper event type page.
  // The EventType-param is a mandatory param for a combined search.
  // Use the General EventType as a default.
  React.useEffect(() => {
    if (!hasEventTypeParam) {
      router.push(
        { query: { ...router.query, eventType: EventTypeId.General } },
        undefined,
        { shallow: true }
      );
    }
  }, [router, hasEventTypeParam]);

  return (
    <MatomoWrapper>
      <HCRCApolloPage
        uri={ROUTES.COURSESEARCH}
        className="pageLayout"
        navigation={<Navigation menu={headerMenu} languages={languages} />}
        content={
          <SearchPage
            SearchComponent={AdvancedSearch}
            pageTitle={'eventSearch.title'}
            eventType={EventTypeId.General}
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
