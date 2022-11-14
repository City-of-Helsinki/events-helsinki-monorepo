import {
  useLocale,
  getDateRangeStr,
  EventLocationText as LocationText,
  getEventFields,
} from 'events-helsinki-components';
import type { EventFieldsFragment } from 'events-helsinki-components';
import { IconCalendarClock, IconLocation } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import EventKeywords from '../eventKeywords/EventKeywords';
import styles from './eventDetails.module.scss';

export type EventDetailsProps = {
  event: EventFieldsFragment;
};
const EventDetails: React.FC<EventDetailsProps> = (props) => {
  const event = props.event;
  const { t } = useTranslation('common');
  const locale = useLocale();

  if (!event) {
    return null;
  }

  const { startTime, endTime, location } = getEventFields(event, locale);

  return (
    <div>
      {!!startTime && (
        <div className={styles.infoRow}>
          <div className={styles.withIcon}>
            <div className={styles.icon}>
              <IconCalendarClock aria-hidden />
            </div>
            <div className={styles.text}>
              {getDateRangeStr({
                start: startTime,
                end: endTime,
                locale,
                includeTime: true,
                timeAbbreviation: t('timeAbbreviation'),
              })}
            </div>
          </div>
        </div>
      )}
      {location && (
        <div className={styles.infoRow}>
          <div className={styles.withIcon}>
            <div className={styles.icon}>
              <IconLocation aria-hidden />
            </div>
            <div className={styles.text}>
              <LocationText
                event={event}
                showDistrict={false}
                showLocationName
              />
            </div>
          </div>
        </div>
      )}
      <div className={styles.infoRow}>
        <EventKeywords
          event={event}
          showIsFree
          showKeywordsCount
          withActions={false}
        />
      </div>
    </div>
  );
};

export default EventDetails;
