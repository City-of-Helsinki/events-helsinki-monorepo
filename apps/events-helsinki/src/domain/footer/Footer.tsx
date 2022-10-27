import { useLocale, resetFocusId } from 'events-helsinki-components';
import useCommonTranslation from 'events-helsinki-components/hooks/useCommonTranslation';
import useFooterTranslation from 'events-helsinki-components/hooks/useFooterTranslation';
import { Footer, Link } from 'hds-react';
import type { FunctionComponent } from 'react';
import React from 'react';
import { useMenuQuery } from 'react-helsinki-headless-cms/apollo';

import { DEFAULT_FOOTER_MENU_NAME, ROUTES } from '../../constants';
import { getI18nPath } from '../../utils/routerUtils';
import styles from './footer.module.scss';
import FooterCategories from './FooterCategories';

const FooterSection: FunctionComponent = () => {
  const { t } = useFooterTranslation();
  const { t: tCommon } = useCommonTranslation();
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
    <Footer title={tCommon('eventsCommon:appName')} className={styles.footer}>
      <Footer.Navigation>
        <Footer.Item
          as={Link}
          label={t('footer:searchHobbies')}
          href={getI18nPath(ROUTES.SEARCH, locale)}
        />
      </Footer.Navigation>
      <FooterCategories />
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
