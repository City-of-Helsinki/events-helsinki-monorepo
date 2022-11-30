import {
  useFooterTranslation,
  useLocale,
  resetFocusId,
  useAppSportsTranslation,
} from 'events-helsinki-components';
import { Footer, Link } from 'hds-react';
import type { FunctionComponent } from 'react';
import React from 'react';
import { useMenuQuery } from 'react-helsinki-headless-cms/apollo';

import { DEFAULT_FOOTER_MENU_NAME, ROUTES } from '../../constants';
import { getI18nPath } from '../../utils/routerUtils';
import styles from './footer.module.scss';

const FooterSection: FunctionComponent = () => {
  const { t } = useFooterTranslation();
  const { t: tAppSports } = useAppSportsTranslation();
  const locale = useLocale();

  const { data } = useMenuQuery({
    variables: {
      id: DEFAULT_FOOTER_MENU_NAME[locale],
    },
  });

  // override Footer component default behaviour which focuses skip-link
  const handleBackToTop = () => {
    window?.scrollTo({ top: 0 });
    document.querySelector<HTMLDivElement>(`#${resetFocusId}`)?.focus();
  };

  return (
    <Footer
      theme="dark"
      title={tAppSports('appSports:appName')}
      className={styles.footer}
    >
      <Footer.Navigation>
        <Footer.Item
          as={Link}
          label={tAppSports('appSports:footer.searchSports')}
          href={getI18nPath(ROUTES.SEARCH, locale)}
        />
      </Footer.Navigation>
      <Footer.Utilities
        backToTopLabel={t('footer:backToTop')}
        onBackToTopClick={handleBackToTop}
      ></Footer.Utilities>
      <Footer.Base
        copyrightHolder={t('footer:copyright')}
        copyrightText={t('footer:allRightsReserved')}
      >
        {data?.menu?.menuItems?.nodes?.map((navigationItem) => (
          <Footer.Item
            className={styles.footerLink}
            key={navigationItem?.id}
            as={Link}
            href={navigationItem?.path || ''}
            label={navigationItem?.label}
          />
        ))}
      </Footer.Base>
    </Footer>
  );
};

export default FooterSection;
