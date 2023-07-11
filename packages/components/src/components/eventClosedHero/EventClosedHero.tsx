import type { CommonButtonProps } from 'hds-react';
import { Button } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './eventClosedHero.module.scss';

export type EventClosedHeroProps = {
  onClick: () => void;
  theme?: CommonButtonProps['theme'];
  variant?: CommonButtonProps['variant'];
};

const EventClosedHero: React.FC<EventClosedHeroProps> = ({
  onClick,
  theme,
  variant,
}) => {
  const { t } = useTranslation('event');

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
