import { IconCalendarClock, IconLocation } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import type { EventFieldsFragment } from '../../../index';
import {
  useLocale,
  getDateRangeStr,
  EventLocationText as LocationText,
  getEventFields,
} from '../../../index';
import EventKeywords from '../eventKeywords/EventKeywords';
import type { keyWordOnClickArgs } from '../eventKeywords/EventKeywords';
import styles from './eventDetails.module.scss';

export type EventDetailsCardProps = {
  event: EventFieldsFragment;
  clickAction: (args: keyWordOnClickArgs) => void | undefined;
};
const EventDetailsCard: React.FC<EventDetailsCardProps> = ({
  event,
  clickAction,
}) => {
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
          clickAction={clickAction}
        />
      </div>
    </div>
  );
};

export default EventDetailsCard;
