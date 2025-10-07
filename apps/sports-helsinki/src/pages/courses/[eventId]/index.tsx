import {
  EventDetailsDocument,
  NavigationContext,
  Navigation,
  FooterSection,
  getLanguageOrDefault,
  useResilientTranslation,
  PageBreadcrumbTitleDocument,
  getFilteredBreadcrumbs,
  getEventFields,
  isEventClosed,
  isEventCancelled,
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
import React, { useContext } from 'react';
import type { PageType } from 'react-helsinki-headless-cms';
import {
  Page as RHHCPage,
  getBreadcrumbsFromPage,
} from 'react-helsinki-headless-cms';
import { ROUTES } from '../../../constants';
import AppConfig from '../../../domain/app/AppConfig';
import getSportsStaticProps from '../../../domain/app/getSportsStaticProps';
import EventPageContainer from '../../../domain/event/EventPageContainer';

import serverSideTranslationsWithCommon from '../../../domain/i18n/serverSideTranslationsWithCommon';

const EventPage: NextPage<{
  event: EventFields;
  loading: boolean;
  breadcrumbs?: BreadcrumbListItem[];
}> = ({ event, loading, breadcrumbs }) => {
  const { footerMenu } = useContext(NavigationContext);
  const { resilientT } = useResilientTranslation();
  return (
    <RHHCPage
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <EventPageContainer
          breadcrumbs={breadcrumbs}
          event={event}
          loading={loading}
          showSimilarEvents={AppConfig.showSimilarEvents}
        />
      }
      footer={
        <FooterSection
          menu={footerMenu}
          appName={resilientT('appSports:appName')}
        />
      }
    />
  );
};
export default EventPage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

function getIdProp(params: GetStaticPropsContext['params']) {
  const id = (params?.eventId as string) ?? '';
  // If the fallback is set to 'blocking' and
  // the source maps are enabled in the prod package,
  // the source map filename is used as an id.
  if (id.endsWith('.map')) {
    return undefined;
  }
  return id;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async ({ apolloClient }) => {
    const language = getLanguageOrDefault(context.locale);
    const id = getIdProp(context.params);
    if (!id) {
      return {
        notFound: true,
      };
    }
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
      // eslint-disable-next-line no-console
      console.debug('Event could not be found.', 'Responding with not found!', {
        id,
      });
      return {
        notFound: true,
      };
    }

    /**
     * If the event is already closed (ended or cancelled), respond with `notFound`.
     *
     * NOTE: HTTP 410 Gone would be a better response, but it's not available when SSG / ISR is used
     * and implementing that feature with a middleware would require fetching the event multiple times.
     *
     * INFO: Since SSG / ISR is in use _without revalidate-feature_, a closed event can also be rendered,
     * (in shape of a "warning page", not as event detail page). The `getStaticProps` will rerun only after
     * the statically generated page has been deleted or revalidated on demand.
     * For auto clean, there is a cleaner cronjob. Ondemand revalidation can be triggered by calling `/api/revalidate`.
     */
    if (isEventClosed(event) || isEventCancelled(event)) {
      // eslint-disable-next-line no-console
      console.info(
        'Event closed (or cancelled).',
        'Responding with not found!',
        {
          id,
          eventEndTime: event.endTime,
          eventStatus: event.eventStatus,
        }
      );
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
