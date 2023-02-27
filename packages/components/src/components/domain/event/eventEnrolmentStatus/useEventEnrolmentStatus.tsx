import {
  useCommonTranslation,
  useEventTranslation,
  useLocale,
} from '../../../../hooks';
import type { EventFields } from '../../../../types';
import getDateRangeStr from '../../../../utils/getDateRangeStr';
import { getEnrolmentStatus } from '../../../../utils/getEventEnrolmentStatus';

function useEventEnrolmentStatus(event: EventFields) {
  const locale = useLocale();
  const { t: eventTranslation } = useEventTranslation();
  const { t: commonTranslation } = useCommonTranslation();
  const status = getEnrolmentStatus(event);
  return {
    status,
    text: eventTranslation(`event:enrolmentStatus.${status}`, {
      date: event.enrolmentStartTime
        ? getDateRangeStr({
            start: event.enrolmentStartTime,
            locale,
            includeWeekday: false,
            includeTime: true,
            timeAbbreviation:
              commonTranslation('common:timeAbbreviation') ?? '',
          })
        : '',
    }),
  };
}

export default useEventEnrolmentStatus;
