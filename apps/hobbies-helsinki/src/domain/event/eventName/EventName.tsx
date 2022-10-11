import { useLocale } from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { EventFieldsFragment } from '../../nextApi/graphql/generated/graphql';
import { getEventFields, isEventCancelled } from '../EventUtils';
import styles from './eventName.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const EventName: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation('event');
  const locale = useLocale();
  const { name } = getEventFields(event, locale);
  const isCancelled = isEventCancelled(event);

  return (
    <>
      {isCancelled && (
        <span className={styles.eventCancelled}>
          {t('eventCancelled')}
          {': '}
        </span>
      )}
      {name}
    </>
  );
};

export default EventName;
