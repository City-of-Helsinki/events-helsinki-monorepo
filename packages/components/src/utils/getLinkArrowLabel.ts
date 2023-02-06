import type { TFunction } from 'next-i18next';
import type { EventFields } from '../types/event-types';
import getDateRangeStr from './getDateRangeStr';
import { getEnrolmentStatus } from './getEventEnrolmentStatus';

export default function getLinkArrowLabel({
  item,
  locale,
  eventTranslation,
  commonTranslation,
}: {
  item: EventFields;
  locale: string;
  eventTranslation: TFunction;
  commonTranslation: TFunction;
}) {
  const status = getEnrolmentStatus(item);
  return eventTranslation(`event:enrolmentStatus.${status}`, {
    date: item.enrolmentStartTime
      ? getDateRangeStr({
          start: item.enrolmentStartTime,
          locale,
          includeWeekday: false,
          includeTime: true,
          timeAbbreviation: commonTranslation('common:timeAbbreviation'),
        })
      : '',
  });
}
