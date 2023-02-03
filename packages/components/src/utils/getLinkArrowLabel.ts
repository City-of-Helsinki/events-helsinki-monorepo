import type { TFunction } from 'next-i18next';
import { getEnrolmentStatus } from '../components';
import type { EventFields } from '../types';
import getDateRangeStr from './getDateRangeStr';

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
