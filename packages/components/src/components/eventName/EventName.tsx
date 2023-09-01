import { IconCheckCircleFill } from 'hds-react';
import React from 'react';

import { useEventTranslation, useLocale } from '../../hooks';
import type { EventFieldsFragment } from '../../types';
import {
  getEventFields,
  isEventCancelled,
  isEventHelsinkiCityOwned,
} from '../../utils';
import styles from './eventName.module.scss';

interface EventNameProps {
  event: EventFieldsFragment;
}

const EventName: React.FC<EventNameProps> = ({ event }) => {
  const { t } = useEventTranslation();
  const locale = useLocale();
  const { name } = getEventFields(event, locale);
  const isCancelled = isEventCancelled(event);
  const isHelsinkiCityOwned = isEventHelsinkiCityOwned(event);

  return (
    <>
      {isCancelled && (
        <span className={styles.eventCancelled}>
          {t('event:eventCancelled')}
          {': '}
        </span>
      )}
      {name}
      {isHelsinkiCityOwned && (
        <IconCheckCircleFill
          className={styles.helsinkiCityOwnedIcon}
          aria-hidden
        />
      )}
    </>
  );
};

export default EventName;
