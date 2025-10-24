import { EnrolmentStatusLabel } from '../constants/event-constants';
import type { EventFields } from '../types/event-types';

/**
 * Checks if the event has any enrolment-related data
 * (e.g., a registration object, enrolment start time, or enrolment end time).
 *
 * @param {EventFields} event - The event object to check.
 * @returns {boolean} True if enrolment data is present, false otherwise.
 */
function hasEventEnrolmentData(event: EventFields) {
  return (
    !!event.registration ||
    !!event.enrolmentStartTime ||
    !!event.enrolmentEndTime
  );
}

/**
 * Retrieves the effective registration data for an event.
 *
 * This function handles a LinkedEvents quirk where registration data (with capacity)
 * might be on a super-event even if enrolment times are on the event itself.
 *
 * Priority:
 * 1. `event.registration`
 * 2. `superEvent.registration` (if event has enrolment data but no local registration object)
 * 3. `event` object itself (as a fallback, but capacity fields will be undefined)
 *
 * @param {EventFields} event - The event object.
 * @param {EventFields} [superEvent] - The optional super (parent) event.
 * @returns {object} An object containing the relevant enrolment and capacity details.
 */
function getEventRegistrationData(
  event: EventFields,
  superEvent?: EventFields
) {
  if (event.registration) {
    return event.registration;
  }

  // If event has enrolment data set in it's root,
  // it should also have registration field populated.
  // This is a strange behaviour in LinkedEvents,
  // that it might use registration data from super event in this case.
  if (hasEventEnrolmentData(event) && superEvent?.registration) {
    return superEvent.registration;
  }

  // fallback to "event root (enrolment) details".
  // Note that not all the registration fields exists there, but some do.
  return {
    ...event,
    maximumAttendeeCapacity: undefined,
    remainingAttendeeCapacity: undefined,
    waitingListCapacity: undefined,
    remainingWaitingListCapacity: undefined,
  };
}

/**
 * Determines the current enrolment status of an event based on its
 * enrolment times, capacity, and the current date.
 *
 * @param {EventFields} event - The event to check the status for.
 * @param {EventFields} [superEvent] - The optional super event (used to find registration data).
 * @returns {EnrolmentStatusLabel} The calculated enrolment status (e.g., "Enrollable", "Full", "Ended").
 */
export function getEnrolmentStatus(
  event: EventFields,
  superEvent?: EventFields
): EnrolmentStatusLabel {
  const now = new Date();
  // NOTE: `event.registration` needs `includes: ['registration']` as a query param.
  const {
    remainingAttendeeCapacity,
    enrolmentStartTime,
    enrolmentEndTime,
    waitingListCapacity,
    remainingWaitingListCapacity,
  } = getEventRegistrationData(event, superEvent);

  // No enrolment data given, so no enrolment times
  if (!hasEventEnrolmentData(event)) {
    return EnrolmentStatusLabel.noEnrolmentTimes;
  }

  // Enrolling is starting in future
  if (enrolmentStartTime && new Date(enrolmentStartTime) > now) {
    return EnrolmentStatusLabel.enrolmentNotStartedYet;
  }

  // Enrolling has ended already
  if (enrolmentEndTime && new Date(enrolmentEndTime) < now) {
    return EnrolmentStatusLabel.enrolmentEnded;
  }

  // There is no space left
  if (remainingAttendeeCapacity === 0) {
    // Queueable, if there is still space in queue
    if (waitingListCapacity && remainingWaitingListCapacity) {
      return EnrolmentStatusLabel.queueable;
    }
    return EnrolmentStatusLabel.full;
  }

  // Enrolling is ongoing and there is still space left
  return EnrolmentStatusLabel.enrollable;
}
