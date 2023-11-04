import { Footer, Link, Logo, logoFi, logoSv } from 'hds-react';
import dynamic from 'next/dynamic';
import type { FunctionComponent } from 'react';
import type { Menu } from 'react-helsinki-headless-cms';
import { useMenuQuery } from 'react-helsinki-headless-cms/apollo';
import { DEFAULT_FOOTER_MENU_NAME } from '../../constants';
import { useCommonTranslation } from '../../hooks';
import useFooterTranslation from '../../hooks/useFooterTranslation';
import useLocale from '../../hooks/useLocale';

import { resetFocusId } from '../resetFocus/ResetFocus';
import styles from './footer.module.scss';

const AskemFeedbackContainer = dynamic(
  () =>
    import('../../components/askem').then((mod) => mod.AskemFeedbackContainer),
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
};
const FooterSection: FunctionComponent<FooterSectionProps> = ({
  appName,
  menu,
  hasFeedBack = true,
  feedbackWithPadding = false,
  consentUrl = '/cookie-consent',
}: FooterSectionProps) => {
  const { t } = useFooterTranslation();
  const { t: commonT } = useCommonTranslation();
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
      {hasFeedBack && (
        <AskemFeedbackContainer
          withPadding={feedbackWithPadding}
          consentUrl={consentUrl}
        />
      )}
      <Footer title={appName} className={styles.footer}>
        <Footer.Base
          copyrightHolder={t('footer:copyright')}
          copyrightText={t('footer:allRightsReserved')}
          logo={
            <Logo
              src={locale === 'sv' ? logoSv : logoFi}
              size="medium"
              alt={commonT('common:cityOfHelsinki')}
            />
          }
          backToTopLabel={t('footer:backToTop')}
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
