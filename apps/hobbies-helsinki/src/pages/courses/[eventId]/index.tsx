import {
  EventDetailsDocument,
  NavigationContext,
  Navigation,
  MatomoWrapper,
  useCommonTranslation,
} from 'events-helsinki-components';
import type {
  EventFields,
  EventDetailsQuery,
  EventDetailsQueryVariables,
} from 'events-helsinki-components';
import FooterSection from 'events-helsinki-components/components/footer/Footer';
import type { GetStaticPropsContext, NextPage } from 'next';
import React, { useContext } from 'react';
import { Page as RHHCPage } from 'react-helsinki-headless-cms';
import AppConfig from '../../../domain/app/AppConfig';
import getHobbiesStaticProps from '../../../domain/app/getHobbiesStaticProps';
import routerHelper from '../../../domain/app/routerHelper';
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
          <FooterSection menu={footerMenu} appName={t('appHobbies:appName')} />
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
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async ({ apolloClient }) => {
    const locale = routerHelper.getLocaleOrError(context.locale);
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
