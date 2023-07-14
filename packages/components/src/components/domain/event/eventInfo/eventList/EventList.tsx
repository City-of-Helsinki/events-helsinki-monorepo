import { IconArrowRight } from 'hds-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Link } from 'react-helsinki-headless-cms';

import useLocale from '../../../../../hooks/useLocale';
import { useAppRoutingContext } from '../../../../../routingUrlProvider';
import type { EventFields } from '../../../../../types/event-types';
import { getEventFields } from '../../../../../utils/eventUtils';
import getDateRangeStr from '../../../../../utils/getDateRangeStr';
import styles from './eventList.module.scss';

const EventList: React.FC<{
  events: EventFields[];
  showDate?: boolean;
  showName?: boolean;
  id: string;
}> = ({ events, showDate = false, showName = false, id }) => {
  const { t } = useTranslation('event');
  const { t: commonTranslation } = useTranslation('common');
  const locale = useLocale();
  const router = useRouter();
  const { getEventListLinkUrl } = useAppRoutingContext();
  return (
    <ul className={styles.timeList} data-testid={id}>
      {events.map((event) => {
        const { name } = getEventFields(event, locale);
        const date = event.startTime
          ? getDateRangeStr({
              start: event.startTime,
              end: event.endTime,
              includeTime: true,
              locale,
              timeAbbreviation: commonTranslation('timeAbbreviation'),
            })
          : '';
        return (
          <li key={event.id}>
            <Link
              className={styles.link}
              iconRight={<IconArrowRight />}
              href={getEventListLinkUrl(event, router, locale)}
              aria-label={
                showDate
                  ? t('otherTimes.buttonReadMore', {
                      date,
                    })
                  : t('relatedEvents.buttonReadMore')
              }
            >
              <span>{`${showName ? name : ''} ${showDate ? date : ''}`}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default EventList;
