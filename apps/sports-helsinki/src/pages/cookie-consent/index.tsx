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
import React, { useCallback, useContext } from 'react';
import { Page as HCRCApolloPage } from 'react-helsinki-headless-cms/apollo';
import { ROUTES } from '../../constants';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import ConsentPageContent from '../../domain/cookieConsent/ConsentPageContent';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';

export default function CookieConsent() {
  const { footerMenu } = useContext(NavigationContext);
  const { t } = useCommonTranslation();
  const router = useRouter();
  /* 
  // bug or feature: query is empty in handleRedirect
  const router = useRouter();
  const params: { returnPath?: string } = router.query; */

  const handleRedirect = useCallback(() => {
    if (window) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const returnPath: string | null = urlSearchParams.get('returnPath');
      if (returnPath) {
        router.push(returnPath);
      }
    }
  }, [router]);

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
  return getSportsStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);
    return {
      props: {
        ...(await serverSideTranslationsWithCommon(language)),
      },
    };
  });
}
