import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EnrolmentStatusLabel } from '../../constants/event-constants';
import type { EventFields } from '../../types/event-types';
import { getEnrolmentStatus } from '../getEventEnrolmentStatus';

const MOCK_NOW = '2023-10-26T12:00:00.000Z';

// Helper to create a date string relative to the mocked "now"
const getRelativeDate = (days: number) => {
  const date = new Date(MOCK_NOW);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

const baseEvent: Partial<EventFields> = {
  id: 'test:1',
  name: { fi: 'Test Event' },
  startTime: getRelativeDate(10),
};

describe('getEnrolmentStatus', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(MOCK_NOW));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return "noEnrolmentTimes" if there is no enrolment data', () => {
    const event: EventFields = {
      ...baseEvent,
    } as EventFields;
    expect(getEnrolmentStatus(event)).toBe(
      EnrolmentStatusLabel.noEnrolmentTimes
    );
  });

  it('should return "enrolmentNotStartedYet" if enrolment starts in the future', () => {
    const event: EventFields = {
      ...baseEvent,
      enrolmentStartTime: getRelativeDate(1), // Starts tomorrow
    } as EventFields;
    expect(getEnrolmentStatus(event)).toBe(
      EnrolmentStatusLabel.enrolmentNotStartedYet
    );
  });

  it('should return "enrolmentEnded" if enrolment has already ended', () => {
    const event: EventFields = {
      ...baseEvent,
      enrolmentStartTime: getRelativeDate(-2), // Started 2 days ago
      enrolmentEndTime: getRelativeDate(-1), // Ended yesterday
    } as EventFields;
    expect(getEnrolmentStatus(event)).toBe(EnrolmentStatusLabel.enrolmentEnded);
  });

  it('should return "enrollable" if enrolment is open and there is capacity', () => {
    const event: EventFields = {
      ...baseEvent,
      registration: {
        enrolmentStartTime: getRelativeDate(-1), // Started yesterday
        enrolmentEndTime: getRelativeDate(1), // Ends tomorrow
        remainingAttendeeCapacity: 10,
      },
    } as EventFields;
    expect(getEnrolmentStatus(event)).toBe(EnrolmentStatusLabel.enrollable);
  });

  it('should return "full" if there is no remaining attendee capacity and no waiting list', () => {
    const event: EventFields = {
      ...baseEvent,
      registration: {
        enrolmentStartTime: getRelativeDate(-1),
        enrolmentEndTime: getRelativeDate(1),
        remainingAttendeeCapacity: 0,
      },
    } as EventFields;
    expect(getEnrolmentStatus(event)).toBe(EnrolmentStatusLabel.full);
  });

  it('should return "full" if waiting list exists but has no capacity', () => {
    const event: EventFields = {
      ...baseEvent,
      registration: {
        enrolmentStartTime: getRelativeDate(-1),
        enrolmentEndTime: getRelativeDate(1),
        remainingAttendeeCapacity: 0,
        waitingListCapacity: 10,
        remainingWaitingListCapacity: 0,
      },
    } as EventFields;
    expect(getEnrolmentStatus(event)).toBe(EnrolmentStatusLabel.full);
  });

  it('should return "queueable" if main capacity is full but waiting list has space', () => {
    const event: EventFields = {
      ...baseEvent,
      registration: {
        enrolmentStartTime: getRelativeDate(-1),
        enrolmentEndTime: getRelativeDate(1),
        remainingAttendeeCapacity: 0,
        waitingListCapacity: 10,
        remainingWaitingListCapacity: 5,
      },
    } as EventFields;
    expect(getEnrolmentStatus(event)).toBe(EnrolmentStatusLabel.queueable);
  });

  it('should return "enrollable" if enrolment is ongoing and capacity is null (unlimited)', () => {
    const event: EventFields = {
      ...baseEvent,
      registration: {
        enrolmentStartTime: getRelativeDate(-1),
        enrolmentEndTime: getRelativeDate(1),
        remainingAttendeeCapacity: null,
      },
    } as EventFields;
    expect(getEnrolmentStatus(event)).toBe(EnrolmentStatusLabel.enrollable);
  });

  it('should return "enrollable" if enrolment is ongoing and capacity is undefined', () => {
    const event: EventFields = {
      ...baseEvent,
      registration: {
        enrolmentStartTime: getRelativeDate(-1),
        enrolmentEndTime: getRelativeDate(1),
        remainingAttendeeCapacity: undefined,
      },
    } as EventFields;
    expect(getEnrolmentStatus(event)).toBe(EnrolmentStatusLabel.enrollable);
  });

  describe('with superEvent (LinkedEvents quirk)', () => {
    const superEvent: EventFields = {
      ...baseEvent,
      id: 'test:super',
      registration: {
        enrolmentStartTime: getRelativeDate(-1),
        enrolmentEndTime: getRelativeDate(1),
        remainingAttendeeCapacity: 10,
        waitingListCapacity: 5,
        remainingWaitingListCapacity: 2,
      },
    } as EventFields;

    it('should use superEvent registration data when event has enrolment times but no registration object', () => {
      const event: EventFields = {
        ...baseEvent,
        // Enrolment times on event, but no registration object
        enrolmentStartTime: getRelativeDate(-1),
        enrolmentEndTime: getRelativeDate(1),
        registration: undefined,
      } as EventFields;

      // With space, should be enrollable based on superEvent
      expect(getEnrolmentStatus(event, superEvent)).toBe(
        EnrolmentStatusLabel.enrollable
      );
    });

    it('should use superEvent registration data for "full" status', () => {
      const fullSuperEvent: EventFields = {
        ...superEvent,
        registration: {
          ...superEvent.registration,
          remainingAttendeeCapacity: 0,
          remainingWaitingListCapacity: 0,
        },
      } as EventFields;

      const event: EventFields = {
        ...baseEvent,
        enrolmentStartTime: getRelativeDate(-1),
        registration: undefined,
      } as EventFields;

      expect(getEnrolmentStatus(event, fullSuperEvent)).toBe(
        EnrolmentStatusLabel.full
      );
    });

    it('should use superEvent registration data for "queueable" status', () => {
      const queueableSuperEvent: EventFields = {
        ...superEvent,
        registration: {
          ...superEvent.registration,
          remainingAttendeeCapacity: 0,
          remainingWaitingListCapacity: 3,
        },
      } as EventFields;

      const event: EventFields = {
        ...baseEvent,
        enrolmentStartTime: getRelativeDate(-1),
        registration: undefined,
      } as EventFields;

      expect(getEnrolmentStatus(event, queueableSuperEvent)).toBe(
        EnrolmentStatusLabel.queueable
      );
    });

    it('should prioritize event registration data if it exists', () => {
      const eventWithRegistration: EventFields = {
        ...baseEvent,
        registration: {
          enrolmentStartTime: getRelativeDate(-1),
          enrolmentEndTime: getRelativeDate(1),
          remainingAttendeeCapacity: 0, // Event is full
        },
      } as EventFields;

      // superEvent has space, but event's own registration says it's full.
      expect(getEnrolmentStatus(eventWithRegistration, superEvent)).toBe(
        EnrolmentStatusLabel.full
      );
    });

    it('should not use superEvent if event has no enrolment data', () => {
      const eventWithoutEnrolmentData: EventFields = {
        ...baseEvent,
        registration: undefined,
        enrolmentStartTime: undefined,
        enrolmentEndTime: undefined,
      } as EventFields;

      // Even if superEvent has enrolment data, the function should report
      // no enrolment for the sub-event itself.
      expect(getEnrolmentStatus(eventWithoutEnrolmentData, superEvent)).toBe(
        EnrolmentStatusLabel.noEnrolmentTimes
      );
    });

    it('should handle fallback correctly when superEvent has no registration', () => {
      const superEventWithoutRegistration: EventFields = {
        ...superEvent,
        registration: undefined,
      } as EventFields;

      const event: EventFields = {
        ...baseEvent,
        enrolmentStartTime: getRelativeDate(-1),
        registration: undefined,
      } as EventFields;

      // Falls back to event root data, which has no capacity info.
      // Since enrolment is active, it's considered enrollable.
      expect(getEnrolmentStatus(event, superEventWithoutRegistration)).toBe(
        EnrolmentStatusLabel.enrollable
      );
    });

    it('should handle enrolment ended status from super event registration', () => {
      const endedSuperEvent: EventFields = {
        ...superEvent,
        registration: {
          ...superEvent.registration,
          enrolmentEndTime: getRelativeDate(-1), // Ended yesterday
        },
      } as EventFields;

      const event: EventFields = {
        ...baseEvent,
        enrolmentStartTime: getRelativeDate(-2),
        registration: undefined,
      } as EventFields;

      expect(getEnrolmentStatus(event, endedSuperEvent)).toBe(
        EnrolmentStatusLabel.enrolmentEnded
      );
    });
  });
});
