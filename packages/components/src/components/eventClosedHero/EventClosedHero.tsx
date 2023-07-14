import { Button } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { useAppThemeContext } from '../../themeProvider';
import styles from './eventClosedHero.module.scss';

export type EventClosedHeroProps = {
  onClick: () => void;
};

const EventClosedHero: React.FC<EventClosedHeroProps> = ({ onClick }) => {
  const { t } = useTranslation('event');
  const { defaultButtonTheme: theme, defaultButtonVariant: variant } =
    useAppThemeContext();
  return (
    <div className={styles.eventClosedHero}>
      <h1>{t('hero.titleEventClosed')}</h1>
      <p>{t('hero.textEventClosed')}</p>
      <Button onClick={onClick} theme={theme} variant={variant}>
        {t('hero.buttonToHomePage')}
      </Button>
    </div>
  );
};

export default EventClosedHero;
