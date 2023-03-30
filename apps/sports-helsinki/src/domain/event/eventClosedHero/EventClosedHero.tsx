import { useLocale } from '@events-helsinki/components';
import { Button } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import routerHelper from '../../../domain/app/routerHelper';
import styles from './eventClosedHero.module.scss';

const EventClosedHero: React.FC = () => {
  const { t } = useTranslation('event');
  const router = useRouter();
  const locale = useLocale();

  const moveToHomePage = () => {
    router.push(routerHelper.getI18nPath('/', locale));
  };

  return (
    <div className={styles.eventClosedHero}>
      <h1>{t('hero.titleEventClosed')}</h1>
      <p>{t('hero.textEventClosed')}</p>
      <Button onClick={moveToHomePage} variant="success">
        {t('hero.buttonToHomePage')}
      </Button>
    </div>
  );
};

export default EventClosedHero;
