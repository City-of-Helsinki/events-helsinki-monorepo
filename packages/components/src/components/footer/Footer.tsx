import { Footer, Link, Logo, logoFi, logoSv } from 'hds-react';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';
import type { Menu } from 'react-helsinki-headless-cms';
import { useMenuQuery } from 'react-helsinki-headless-cms/apollo';
import { DEFAULT_FOOTER_MENU_NAME } from '../../constants';
import { useCommonTranslation, useResilientTranslation } from '../../hooks';
import useLocale from '../../hooks/useLocale';

import { resetFocusId } from '../resetFocus/ResetFocus';
import styles from './footer.module.scss';

const UserTrackingFeatures = dynamic(
  () => import('../widgets/UserTrackingFeatures').then((mod) => mod),
  {
    ssr: false,
  }
);

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

  return (
    <>
      <UserTrackingFeatures
        appName={appName}
        hasFeedBack={hasFeedBack}
        feedbackWithPadding={feedbackWithPadding}
        consentUrl={consentUrl}
        isModalConsent={isModalConsent}
      />
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
    </>
  );
};

export default FooterSection;
