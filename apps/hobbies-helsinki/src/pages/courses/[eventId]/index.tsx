import { EventDetailsDocument } from 'events-helsinki-components';
import type {
  EventFields,
  EventDetailsQuery,
  EventDetailsQueryVariables,
} from 'events-helsinki-components';
import type { GetStaticPropsContext, NextPage } from 'next';
import React from 'react';
import { Page as RHHCPage } from 'react-helsinki-headless-cms';
import Navigation from '../../../common-events/components/navigation/Navigation';
import AppConfig from '../../../domain/app/AppConfig';
import getHobbiesStaticProps from '../../../domain/app/getHobbiesStaticProps';
import EventPageContainer from '../../../domain/event/EventPageContainer';
import FooterSection from '../../../domain/footer/Footer';
import serverSideTranslationsWithCommon from '../../../domain/i18n/serverSideTranslationsWithCommon';
import MatomoWrapper from '../../../domain/matomoWrapper/MatomoWrapper';
import { getLocaleOrError } from '../../../utils/routerUtils';

const Event: NextPage<{
  event: EventFields;
  loading: boolean;
}> = ({ event, loading }) => {
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
        footer={<FooterSection />}
      />
    </MatomoWrapper>
  );
};
export default Event;

// export default eventsWithApollo(Event);
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async ({ apolloClient }) => {
    const locale = getLocaleOrError(context.locale);
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

    const event = eventData?.eventDetails;

    return {
      props: {
        event,
        loading,
        ...(await serverSideTranslationsWithCommon(locale, [
          'common',
          'home',
          'search',
          'event',
        ])),
      },
    };
  });
}
