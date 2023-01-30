import { EnrolmentStatusLabel } from '../../../../constants/event-constants';
import {
  useCommonTranslation,
  useEventTranslation,
  useLocale,
} from '../../../../hooks';
import type { EventFields } from '../../../../types';
import { getDateRangeStr } from '../../../../utils';

export function getEnrolmentStatus(event: EventFields): EnrolmentStatusLabel {
  const now = new Date();
  const { remainingAttendeeCapacity, enrolmentStartTime, enrolmentEndTime } =
    event;

  // TODO: Add EnrolmentStatusLabel.queueable when we can resolve it
  if (remainingAttendeeCapacity === 0) {
    return EnrolmentStatusLabel.full;
  } else if (enrolmentStartTime && new Date(enrolmentStartTime) > now) {
    return EnrolmentStatusLabel.enrolmentNotStartedYet;
  } else if (enrolmentEndTime && new Date(enrolmentEndTime) < now) {
    return EnrolmentStatusLabel.enrolmentEnded;
  } else if (
    enrolmentStartTime &&
    enrolmentEndTime &&
    remainingAttendeeCapacity
  ) {
    return EnrolmentStatusLabel.enrollable;
  }
  return EnrolmentStatusLabel.noEnrolmentTimes;
}

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
            timeAbbreviation: commonTranslation('common:timeAbbreviation'),
          })
        : '',
    }),
  };
}

export default useEventEnrolmentStatus;
