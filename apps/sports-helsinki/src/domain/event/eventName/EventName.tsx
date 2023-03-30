import {
  useEventTranslation,
  useLocale,
  getEventFields,
  isEventCancelled,
} from '@events-helsinki/components';
import type { EventFieldsFragment } from '@events-helsinki/components';
import React from 'react';

import styles from './eventName.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const EventName: React.FC<Props> = ({ event }) => {
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
