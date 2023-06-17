import {
  NavigationContext,
  Navigation,
  MatomoWrapper,
  useCommonTranslation,
  FooterSection,
  getLanguageOrDefault,
  usePageScrollRestoration,
  EventsCookieConsent,
} from '@events-helsinki/components';
import type { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import { ROUTES } from '../../constants';
import getEventsStaticProps from '../../domain/app/getEventsStaticProps';
import ConsentPageContent from '../../domain/cookieConsent/ConsentPageContent';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';

export default function CookieConsent() {
  const { footerMenu } = useContext(NavigationContext);
  const { t } = useCommonTranslation();
  const router = useRouter();

  const handleRedirect = () => {
    router.push(ROUTES.FRONT_PAGE);
  };

  usePageScrollRestoration();

  return (
    <MatomoWrapper>
      <HCRCApolloPage
        uri={ROUTES.COOKIE_CONSENT}
        className="pageLayout"
        navigation={<Navigation />}
        content={
          <ConsentPageContent>
            <EventsCookieConsent
              appName={t('appSports:appName')}
              isModal={false}
              onConsentGiven={handleRedirect}
            />
          </ConsentPageContent>
        }
        footer={
          <FooterSection menu={footerMenu} appName={t('appSports:appName')} />
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
        ...(await serverSideTranslationsWithCommon(language)),
      },
    };
  });
}
