import {
  getDateRangeStr,
  useLocale,
  getEventFields,
} from 'events-helsinki-components';
import type {
  EventFieldsFragment,
  EventFields,
} from 'events-helsinki-components';
import { IconArrowRight } from 'hds-react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { Link } from 'react-helsinki-headless-cms';

import { ROUTES } from '../../../../constants';
import { getLocalizedCmsItemUrl } from '../../../../utils/routerUtils';
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
  const search = router.asPath.split('?')[1];

  const getLinkUrl = (event: EventFieldsFragment) =>
    getLocalizedCmsItemUrl(ROUTES.COURSES, { eventId: event.id }, locale) +
    (search ? `?${search}` : '');

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
              href={getLinkUrl(event)}
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
