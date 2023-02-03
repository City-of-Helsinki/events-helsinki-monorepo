import { getEnrolmentStatus } from '../components';
import { useCommonTranslation, useEventTranslation } from '../hooks';
import type { EventFields } from '../types';
import getDateRangeStr from './getDateRangeStr';

export default function getLinkArrowLabel(item: EventFields, locale: string) {
  const { t: commonTranslation } = useCommonTranslation();
  const { t: eventTranslation } = useEventTranslation();
  const status = getEnrolmentStatus(item);
  const linkArrowLabel = eventTranslation(`event:enrolmentStatus.${status}`, {
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
  return {
    linkArrowLabel,
  };
}
