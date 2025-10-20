import { EnrolmentStatusLabel } from '../constants/event-constants';
import type { EventFields } from '../types/event-types';

export function getEnrolmentStatus(event: EventFields): EnrolmentStatusLabel {
  const now = new Date();
  // NOTE: `event.registration` needs `includes: ['registration']` as a query param.
  const {
    remainingAttendeeCapacity,
    enrolmentStartTime,
    enrolmentEndTime,
    waitingListCapacity,
    remainingWaitingListCapacity,
  } = event?.registration || {
    ...event,
    remainingAttendeeCapacity: undefined,
    waitingListCapacity: undefined,
    remainingWaitingListCapacity: undefined,
  };

  if (remainingAttendeeCapacity === 0) {
    if (waitingListCapacity && remainingWaitingListCapacity) {
      return EnrolmentStatusLabel.queueable;
    }
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
