import React from 'react';

import { useEventTranslation, useLocale } from '../../hooks';
import type { EventFieldsFragment } from '../../types';
import { getEventFields, isEventCancelled } from '../../utils';
import styles from './eventName.module.scss';

interface EventNameProps {
  event: EventFieldsFragment;
}

const EventName: React.FC<EventNameProps> = ({ event }) => {
  const { t } = useEventTranslation();
  const locale = useLocale();
  const { name } = getEventFields(event, locale);
  const isCancelled = isEventCancelled(event);
  return (
    <>
      {isCancelled && (
        <span className={styles.eventCancelled}>
          {t('event:eventCancelled')}
          {': '}
        </span>
      )}
      {name}
    </>
  );
};

export default EventName;
