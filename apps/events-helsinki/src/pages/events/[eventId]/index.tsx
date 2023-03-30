import {
  EventDetailsDocument,
  NavigationContext,
  Navigation,
  MatomoWrapper,
  useCommonTranslation,
  getLanguageOrDefault,
  FooterSection,
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
import getEventsStaticProps from '../../../domain/app/getEventsStaticProps';
import EventPageContainer from '../../../domain/event/EventPageContainer';
import serverSideTranslationsWithCommon from '../../../domain/i18n/serverSideTranslationsWithCommon';

const Event: NextPage<{
  event: EventFields;
  loading: boolean;
}> = ({ event, loading }) => {
  const { footerMenu } = useContext(NavigationContext);
  const { t } = useCommonTranslation();
  return (
    <MatomoWrapper>
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
          <FooterSection menu={footerMenu} appName={t('appEvents:appName')} />
        }
      />
    </MatomoWrapper>
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
    const { data: eventData, loading } = await apolloClient.query<
      EventDetailsQuery,
      EventDetailsQueryVariables
    >({
      query: EventDetailsDocument,
      variables: {
        id: (context.params?.eventId as string) || '',
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
