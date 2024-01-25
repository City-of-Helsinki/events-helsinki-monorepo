import {
  EventDetailsDocument,
  NavigationContext,
  Navigation,
  FooterSection,
  getLanguageOrDefault,
  useResilientTranslation,
} from '@events-helsinki/components';
import type {
  EventFields,
  EventDetailsQuery,
  EventDetailsQueryVariables,
} from '@events-helsinki/components';
import type { GetStaticPropsContext, NextPage } from 'next';
import React, { useContext } from 'react';
import { Page as RHHCPage } from 'react-helsinki-headless-cms';
import AppConfig from '../../../domain/app/AppConfig';
import getSportsStaticProps from '../../../domain/app/getSportsStaticProps';
import EventPageContainer from '../../../domain/event/EventPageContainer';

import serverSideTranslationsWithCommon from '../../../domain/i18n/serverSideTranslationsWithCommon';

const EventPage: NextPage<{
  event: EventFields;
  loading: boolean;
}> = ({ event, loading }) => {
  const { footerMenu } = useContext(NavigationContext);
  const { resilientT } = useResilientTranslation();
  return (
    <RHHCPage
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <EventPageContainer
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

// export default eventsWithApollo(Event);
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
    if (!eventData) {
      return {
        notFound: true,
      };
    }
    const event = eventData?.eventDetails;

    return {
      props: {
        event,
        loading,
        ...(await serverSideTranslationsWithCommon(language, [
          'search',
          'event',
        ])),
      },
    };
  });
}
