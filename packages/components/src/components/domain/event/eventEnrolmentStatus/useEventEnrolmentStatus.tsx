import { EnrolmentStatusLabel } from '../../../../constants/event-constants';
import { useEventTranslation } from '../../../../hooks';
import type { EventFields } from '../../../../types';

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
  const { t } = useEventTranslation();
  const status = getEnrolmentStatus(event);
  return {
    status,
    text: t(`event:enrolmentStatus.${status}`),
  };
}

export default useEventEnrolmentStatus;
