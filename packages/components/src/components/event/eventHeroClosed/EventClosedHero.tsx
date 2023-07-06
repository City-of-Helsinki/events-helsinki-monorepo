import { Button } from 'hds-react';
import type { NextRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import type { AppConfig, CmsRoutedAppHelper } from '../../../index';
import type { AppLanguage } from '../../../types';
import styles from './eventClosedHero.module.scss';

export interface EventCloseHeroProps {
  appConfig: AppConfig;
  router: NextRouter;
  routerHelper: CmsRoutedAppHelper;
  locale: AppLanguage;
}

const EventClosedHero: React.FC<EventCloseHeroProps> = ({
  appConfig,
  router,
  routerHelper,
  locale,
}) => {
  const { t } = useTranslation('event');

  const moveToHomePage = () => {
    router.push(routerHelper.getI18nPath('/', locale));
  };

  return (
    <div className={styles.eventClosedHero}>
      <h1>{t('hero.titleEventClosed')}</h1>
      <p>{t('hero.textEventClosed')}</p>
      <Button
        onClick={moveToHomePage}
        theme={appConfig.defaultButtonTheme}
        variant={appConfig.defaultButtonVariant}
      >
        {t('hero.buttonToHomePage')}
      </Button>
    </div>
  );
};

export default EventClosedHero;
