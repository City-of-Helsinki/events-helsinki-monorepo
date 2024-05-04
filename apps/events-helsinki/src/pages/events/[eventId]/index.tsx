import {
  EventDetailsDocument,
  NavigationContext,
  Navigation,
  getLanguageOrDefault,
  FooterSection,
  useResilientTranslation,
  PageBreadcrumbTitleDocument,
  getFilteredBreadcrumbs,
  getEventFields,
} from '@events-helsinki/components';
import type {
  EventFields,
  EventDetailsQuery,
  EventDetailsQueryVariables,
  PageBreadcrumbTitleQuery,
  PageBreadcrumbTitleQueryVariables,
} from '@events-helsinki/components';
import type { BreadcrumbListItem } from 'hds-react';
import type { GetStaticPropsContext, NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import type { PageType } from 'react-helsinki-headless-cms';
import {
  Page as RHHCPage,
  getBreadcrumbsFromPage,
} from 'react-helsinki-headless-cms';
import { ROUTES } from '../../../constants';
import AppConfig from '../../../domain/app/AppConfig';
import getEventsStaticProps from '../../../domain/app/getEventsStaticProps';
import serverSideTranslationsWithCommon from '../../../domain/i18n/serverSideTranslationsWithCommon';

const Event: NextPage<{
  event: EventFields;
  loading: boolean;
  breadcrumbs?: BreadcrumbListItem[];
}> = ({ event, loading, breadcrumbs }) => {
  const { footerMenu } = useContext(NavigationContext);
  const { resilientT } = useResilientTranslation();

  const EventPageContainerNoSSR = dynamic(
    () => import('../../../domain/event/EventPageContainer'),
    {
      ssr: false,
    }
  );

  return (
    <RHHCPage
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <EventPageContainerNoSSR
          breadcrumbs={breadcrumbs}
          event={event}
          loading={loading}
          showSimilarEvents={AppConfig.showSimilarEvents}
        />
      }
      footer={
        <FooterSection
          menu={footerMenu}
          appName={resilientT('appEvents:appName')}
        />
      }
    />
  );
};
export default Event;

// export default eventsWithApollo(Event);
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getEventsStaticProps(context, async ({ apolloClient }) => {
    const language = getLanguageOrDefault(context.locale);
    const id = (context.params?.eventId as string) || '';
    const { data: eventData, loading } = await apolloClient.query<
      EventDetailsQuery,
      EventDetailsQueryVariables
    >({
      query: EventDetailsDocument,
      variables: {
        id,
        include: ['in_language', 'keywords', 'location', 'audience'],
      },
    });

    const event = eventData?.eventDetails;

    if (!event) {
      return {
        notFound: true,
      };
    }

    const { data: pageBreadcrumbTitleData } = await apolloClient.query<
      PageBreadcrumbTitleQuery,
      PageBreadcrumbTitleQueryVariables
    >({
      query: PageBreadcrumbTitleDocument,
      variables: {
        id: `/${language}${ROUTES.SEARCH}/`,
      },
    });
    const searchPage = pageBreadcrumbTitleData.page;
    const breadcrumbs: BreadcrumbListItem[] = [
      ...getFilteredBreadcrumbs(getBreadcrumbsFromPage(searchPage as PageType)),
      { title: getEventFields(event, language)?.name ?? id, path: null },
    ];

    return {
      props: {
        event,
        loading,
        breadcrumbs,
        ...(await serverSideTranslationsWithCommon(language, [
          'search',
          'event',
        ])),
      },
    };
  });
}
