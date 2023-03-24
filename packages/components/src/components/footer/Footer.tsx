import { Footer, Link } from 'hds-react';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { Menu } from 'react-helsinki-headless-cms';
import { useMenuQuery } from 'react-helsinki-headless-cms/apollo';
import { DEFAULT_FOOTER_MENU_NAME } from '../../constants';
import useFooterTranslation from '../../hooks/useFooterTranslation';
import useLocale from '../../hooks/useLocale';

import { resetFocusId } from '../resetFocus/ResetFocus';
import styles from './footer.module.scss';

type FooterSectionProps = {
  appName: string;
  menu?: Menu;
};

const FooterSection: FunctionComponent<FooterSectionProps> = ({
  appName,
  menu,
}: FooterSectionProps) => {
  const { t } = useFooterTranslation();
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
    <Footer title={appName} className={styles.footer}>
      <Footer.Utilities
        backToTopLabel={t('footer:backToTop')}
        onBackToTopClick={handleBackToTop}
      ></Footer.Utilities>
      <Footer.Base
        copyrightHolder={t('footer:copyright')}
        copyrightText={t('footer:allRightsReserved')}
      >
        {footerMenu?.menuItems?.nodes?.map(
          // FIXME: HCRC-build sometimes fails - this type should not be needed.
          (navigationItem: Menu['menuItems']['nodes'][number]) => (
            <Footer.Item
              className={styles.footerLink}
              key={navigationItem?.id}
              as={Link}
              href={navigationItem?.path || ''}
              label={navigationItem?.label}
            />
          )
        )}
      </Footer.Base>
    </Footer>
  );
};

export default FooterSection;
