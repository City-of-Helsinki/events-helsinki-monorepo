import { EnrolmentStatusLabel } from '../constants/event-constants';
import type { EventFields } from '../types/event-types';

export function getEnrolmentStatus(event: EventFields): EnrolmentStatusLabel {
  const now = new Date();

  // NOTE: `event.registration` needs `includes: ['registration']` as a query param.
  const { remainingAttendeeCapacity, enrolmentStartTime, enrolmentEndTime } =
    event?.registration || { ...event, remainingAttendeeCapacity: undefined };

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
