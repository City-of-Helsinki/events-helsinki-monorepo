import { Footer, Link, Logo, logoFi, logoSv } from 'hds-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { FunctionComponent } from 'react';
import type { Menu } from 'react-helsinki-headless-cms';
import { useMenuQuery } from 'react-helsinki-headless-cms/apollo';
import useAskemContext from '../../components/askem/useAskemContext';
import { DEFAULT_FOOTER_MENU_NAME } from '../../constants';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';
import { useCommonTranslation, useResilientTranslation } from '../../hooks';
import useLocale from '../../hooks/useLocale';

import { resetFocusId } from '../resetFocus/ResetFocus';
import styles from './footer.module.scss';

type FooterSectionProps = {
  appName: string;
  menu?: Menu;
  hasFeedBack?: boolean;
  feedbackWithPadding?: boolean;
  consentUrl?: string;
  isModalConsent?: boolean;
};
const FooterSection: FunctionComponent<FooterSectionProps> = ({
  appName,
  menu,
  hasFeedBack = true,
  feedbackWithPadding = false,
  consentUrl = '/cookie-consent',
  isModalConsent = true,
}: FooterSectionProps) => {
  const { t: commonT } = useCommonTranslation();
  const { resilientT } = useResilientTranslation();
  const locale = useLocale();
  const { asPath } = useRouter();
  const { cookieDomain, askemConfiguration: askemConfigurationInput } =
    useCookieConfigurationContext();

  const { askemInstance, handleConsentGiven } = useAskemContext({
    cookieDomain,
    asPath,
    askemConfigurationInput,
  });

  const { data: footerMenuData } = useMenuQuery({
    skip: !!menu,
    variables: {
      id: DEFAULT_FOOTER_MENU_NAME[locale],
    },
  });

  const footerMenu = menu ?? footerMenuData?.menu;

  // override Footer component default behaviour which focuses skip-link
  const handleBackToTop = () => {
    window?.scrollTo({ top: 0 });
    document.querySelector<HTMLDivElement>(`#${resetFocusId}`)?.focus();
  };

  const AskemProvider = dynamic(
    () => import('../../components/askem').then((mod) => mod.AskemProvider),
    {
      ssr: false,
    }
  );

  const AskemFeedbackContainer = dynamic(
    () =>
      import('../../components/askem').then(
        (mod) => mod.AskemFeedbackContainer
      ),
    {
      ssr: false,
    }
  );

  const EventsCookieConsent = dynamic(
    () => import('../../components/eventsCookieConsent/EventsCookieConsent'),
    { ssr: false }
  );

  return (
    <AskemProvider value={askemInstance}>
      {hasFeedBack && (
        <AskemFeedbackContainer
          withPadding={feedbackWithPadding}
          consentUrl={consentUrl}
        />
      )}
      {isModalConsent && (
        <EventsCookieConsent
          onConsentGiven={handleConsentGiven}
          allowLanguageSwitch={false}
          appName={appName}
        />
      )}
      <Footer title={appName} className={styles.footer}>
        <Footer.Base
          copyrightHolder={resilientT('footer:copyright')}
          copyrightText={resilientT('footer:allRightsReserved')}
          logo={
            <Logo
              src={locale === 'sv' ? logoSv : logoFi}
              size="medium"
              alt={commonT('common:cityOfHelsinki')}
            />
          }
          backToTopLabel={resilientT('footer:backToTop')}
          onBackToTopClick={handleBackToTop}
        >
          {footerMenu?.menuItems?.nodes?.map((navigationItem) => (
            <Footer.Link
              className={styles.footerLink}
              key={navigationItem?.id}
              as={Link}
              href={navigationItem?.path || ''}
              label={navigationItem?.label ?? undefined}
            />
          ))}
        </Footer.Base>
      </Footer>
    </AskemProvider>
  );
};

export default FooterSection;
