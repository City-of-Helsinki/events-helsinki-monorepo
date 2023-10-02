import React from 'react';

import { useEventTranslation, useLocale } from '../../hooks';
import type { EventFieldsFragment } from '../../types';
import {
  getEventFields,
  isEventCancelled,
  isEventHelsinkiCityOwned,
} from '../../utils';
import HelsinkiCityOwnedIcon from '../helsinkiCityOwnedIcon/HelsinkiCityOwnedIcon';
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
      {isHelsinkiCityOwned && <HelsinkiCityOwnedIcon />}
    </>
  );
};

export default EventName;
