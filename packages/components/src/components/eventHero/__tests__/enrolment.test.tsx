import { render, screen } from '@testing-library/react';

import {
  endOfTomorrow,
  startOfTomorrow,
  startOfYesterday,
  subDays,
} from 'date-fns';
import { defaultConfig } from 'react-helsinki-headless-cms';
import { EnrolmentStatusLabel } from '../../../constants';
import { useAppThemeContext } from '../../../themeProvider';
import type { AppThemeContextProps } from '../../../themeProvider/AppThemeContext';
import type { EventFields } from '../../../types/event-types';
import * as GetEventEnrolmentStatus from '../../../utils/getEventEnrolmentStatus';
import EventHero, {
  EnrolmentStatusInfo,
  OfferButton,
  getIsEnrolmentOpen,
} from '../EventHero';

vi.mock('react-helsinki-headless-cms', async (importOriginal) => ({
  ...(await importOriginal()),
  useConfig: () => defaultConfig,
  BackgroundImage: () => <div>Mock BackgroundImage</div>,
}));

vi.mock('../../../hooks/useSuperEventLazyLoad', () => ({
  default: () => ({ superEvent: null }),
}));

// Mock dependencies
vi.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '',
  }),
}));

vi.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

vi.mock('../../../hooks/useLocale', () => ({
  default: () => 'fi',
}));

vi.mock('../../../themeProvider', async (importOriginal) => {
  return {
    ...(await importOriginal()),
    useAppThemeContext: vi.fn(),
  };
});

const mockUseAppThemeContext = vi.mocked(useAppThemeContext);

mockUseAppThemeContext.mockReturnValue({
  theme: {
    defaultButtonTheme: 'coat',
    defaultButtonVariant: 'primary',
  },
} as AppThemeContextProps);

const baseEvent: EventFields = {
  id: '1',
  name: { fi: 'Event Name' },
  shortDescription: { fi: 'Event description' },
  description: { fi: 'long description' },
  keywords: [],
  location: null,
  startTime: '2023-01-01T12:00:00.000Z',
  publisher: 'publisher:1',
  provider: { fi: 'Provider' },
  images: [],
  offers: [],
  superEvent: null,
  eventStatus: 'EventScheduled',
  externalLinks: [],
  subEvents: [],
  inLanguage: [],
  audience: [],
  endTime: null,
  enrolmentEndTime: null,
  enrolmentStartTime: null,
  registration: null,
};

afterAll(() => {
  vi.restoreAllMocks();
});

describe('getIsEnrolmentOpen', () => {
  it('should return false if event is not defined', () => {
    const result = getIsEnrolmentOpen(undefined);
    expect(result).toBe(false);
  });

  it('should return false if registration is not defined', () => {
    const result = getIsEnrolmentOpen({
      ...baseEvent,
      registration: undefined,
      enrolmentEndTime: undefined,
      enrolmentStartTime: undefined,
    });
    expect(result).toBe(false);
  });

  it('should return true if remainingAttendeeCapacity is greater than 0', () => {
    const event: EventFields = {
      ...baseEvent,
      registration: {
        enrolmentStartTime: startOfYesterday().toISOString(),
        enrolmentEndTime: endOfTomorrow().toISOString(),
        remainingAttendeeCapacity: 10,
      },
    };
    const result = getIsEnrolmentOpen(event);
    expect(result).toBe(true);
  });

  it('should return true event with waiting list capacity and remainingWaitingListCapacity is greater than 0', () => {
    const event: EventFields = {
      ...baseEvent,
      registration: {
        remainingAttendeeCapacity: 0,
        waitingListCapacity: 10,
        remainingWaitingListCapacity: 5,
      },
    };
    const result = getIsEnrolmentOpen(event);
    expect(result).toBe(true);
  });

  it('should return true if event is queueable', () => {
    const event: EventFields = {
      ...baseEvent,
      registration: {
        enrolmentStartTime: startOfYesterday().toISOString(),
        enrolmentEndTime: endOfTomorrow().toISOString(),
        remainingAttendeeCapacity: 0,
        waitingListCapacity: 10,
        remainingWaitingListCapacity: 5,
      },
    };

    const result = getIsEnrolmentOpen(event);
    expect(result).toBe(true);
  });

  it('should return false if both remaining capacities are 0', () => {
    const event: EventFields = {
      ...baseEvent,
      registration: {
        ...baseEvent.registration,
        remainingAttendeeCapacity: 0,
        remainingWaitingListCapacity: 0,
      },
    };
    const result = getIsEnrolmentOpen(event);
    expect(result).toBe(false);
  });

  it.each([
    [true, true],
    [false, false],
  ])(
    'should return %s if enrolment has not started yet and enrolmentFormAvailableBeforeHand is %s',
    (enrolmentFormAvailableBeforeHand, expectedResult) => {
      const event: EventFields = {
        ...baseEvent,
        registration: {
          enrolmentStartTime: startOfTomorrow().toISOString(),
          enrolmentEndTime: endOfTomorrow().toISOString(),
          remainingAttendeeCapacity: 10,
        },
      };
      const result = getIsEnrolmentOpen(
        event,
        undefined,
        enrolmentFormAvailableBeforeHand
      );

      expect(result).toBe(expectedResult);
    }
  );

  it('should use superEvent registration data if event registration is missing', () => {
    const event: EventFields = {
      ...baseEvent,
      enrolmentStartTime: subDays(new Date(), 1).toISOString(),
      enrolmentEndTime: endOfTomorrow().toISOString(),
      registration: null, // No registration on sub-event
    };
    const superEvent: EventFields = {
      ...baseEvent,
      id: 'super-event-1',
      registration: {
        remainingAttendeeCapacity: 10,
      },
    };

    const status = GetEventEnrolmentStatus.getEnrolmentStatus(
      event,
      superEvent
    );
    expect(status).toBe(EnrolmentStatusLabel.enrollable);
  });

  it('should return full if superEvent registration data shows no capacity', () => {
    const event: EventFields = {
      ...baseEvent,
      enrolmentStartTime: subDays(new Date(), 1).toISOString(),
      enrolmentEndTime: endOfTomorrow().toISOString(),
      registration: null,
    };
    const superEvent: EventFields = {
      ...baseEvent,
      id: 'super-event-1',
      registration: { remainingAttendeeCapacity: 0 },
    };
    const status = GetEventEnrolmentStatus.getEnrolmentStatus(
      event,
      superEvent
    );
    expect(status).toBe(EnrolmentStatusLabel.full);
  });
});

describe('OfferButton', () => {
  it('should render if offerInfoUrl exists and enrolment is open', () => {
    const eventWithOpenEnrolment: EventFields = {
      ...baseEvent,
      offers: [
        { isFree: false, price: null, infoUrl: { fi: 'https://hel.fi' } },
      ],
      registration: {
        enrolmentStartTime: startOfYesterday().toISOString(),
        enrolmentEndTime: endOfTomorrow().toISOString(),
        remainingAttendeeCapacity: 10,
      },
    };

    render(<OfferButton event={eventWithOpenEnrolment} />);
    expect(
      screen.getByRole('button', { name: 'hero.ariaLabelEnrol' })
    ).toBeInTheDocument();
  });

  it('should render when offerInfoUrl exists and enrolment time is not given', () => {
    const eventWithClosedEnrolment: EventFields = {
      ...baseEvent,
      offers: [
        { isFree: false, price: null, infoUrl: { fi: 'https://hel.fi' } },
      ],
      registration: {
        ...baseEvent.registration,
        remainingAttendeeCapacity: 0,
        waitingListCapacity: 0,
        remainingWaitingListCapacity: 0,
      },
      enrolmentStartTime: undefined,
    };

    const { container } = render(
      <OfferButton event={eventWithClosedEnrolment} />
    );
    expect(container).not.toBeEmptyDOMElement();
    expect(
      screen.getByRole('button', { name: 'hero.ariaLabelEnrol' })
    ).toBeInTheDocument();
  });

  it('should not render if offerInfoUrl exists, enrolment time is given, but enrolment is not open', () => {
    const eventWithClosedEnrolment: EventFields = {
      ...baseEvent,
      offers: [
        { isFree: false, price: null, infoUrl: { fi: 'https://hel.fi' } },
      ],
      registration: {
        ...baseEvent.registration,
        remainingAttendeeCapacity: 0,
        waitingListCapacity: 0,
        remainingWaitingListCapacity: 0,
      },
      enrolmentStartTime: startOfYesterday().toISOString(),
    };

    const { container } = render(
      <OfferButton event={eventWithClosedEnrolment} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should not render if enrolment is open but offerInfoUrl does not exist', () => {
    const eventWithoutOfferUrl: EventFields = {
      ...baseEvent,
      offers: [{ isFree: false, price: null, infoUrl: null }],
      registration: {
        ...baseEvent.registration,
        remainingAttendeeCapacity: 10,
      },
    };

    const { container } = render(<OfferButton event={eventWithoutOfferUrl} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should not render if offerInfoUrl does not exist and enrolment is not open', () => {
    const eventWithoutOfferAndClosedEnrolment: EventFields = {
      ...baseEvent,
      offers: [{ isFree: false, price: null, infoUrl: null }],
      registration: {
        ...baseEvent.registration,
        remainingAttendeeCapacity: 0,
      },
    };

    const { container } = render(
      <OfferButton event={eventWithoutOfferAndClosedEnrolment} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe('EnrolmentStatusInfo', () => {
  const hiddenForStatuses = [
    EnrolmentStatusLabel.noEnrolmentTimes,
    EnrolmentStatusLabel.enrollable,
    EnrolmentStatusLabel.queueable,
  ];

  it('should not render if enrolmentStartTime is missing', () => {
    vi.spyOn(GetEventEnrolmentStatus, 'getEnrolmentStatus').mockReturnValue(
      EnrolmentStatusLabel.enrollable
    );
    const eventWithoutStartTime: EventFields = {
      ...baseEvent,
      enrolmentStartTime: null,
      enrolmentEndTime: '2023-01-10T12:00:00.000Z',
    };
    const { container } = render(
      <EnrolmentStatusInfo event={eventWithoutStartTime} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should not render if enrolmentEndTime is missing', () => {
    vi.spyOn(GetEventEnrolmentStatus, 'getEnrolmentStatus').mockReturnValue(
      EnrolmentStatusLabel.enrollable
    );
    const eventWithoutEndTime: EventFields = {
      ...baseEvent,
      enrolmentStartTime: '2023-01-01T12:00:00.000Z',
      enrolmentEndTime: null,
    };
    const { container } = render(
      <EnrolmentStatusInfo event={eventWithoutEndTime} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it.each(
    Object.values(EnrolmentStatusLabel).filter(
      (status) => !hiddenForStatuses.includes(status)
    )
  )(
    'should render if enrolment times are present and status is "%s"',
    (status) => {
      vi.spyOn(GetEventEnrolmentStatus, 'getEnrolmentStatus').mockReturnValue(
        status
      );
      const eventWithEnrolment: EventFields = {
        ...baseEvent,
        enrolmentStartTime: startOfYesterday().toISOString(),
        enrolmentEndTime: endOfTomorrow().toISOString(),
      };
      const { container } = render(
        <EnrolmentStatusInfo event={eventWithEnrolment} />
      );
      expect(screen.getByText(/event:enrolmentStatus/)).toBeInTheDocument();
      expect(container).not.toBeEmptyDOMElement();
    }
  );

  it.each(hiddenForStatuses)(
    'should not render if status is "%s" even if enrolment times are present',
    (status) => {
      vi.spyOn(GetEventEnrolmentStatus, 'getEnrolmentStatus').mockReturnValue(
        status
      );
      const eventWithEnrolment: EventFields = {
        ...baseEvent,
        enrolmentStartTime: startOfYesterday().toISOString(),
        enrolmentEndTime: endOfTomorrow().toISOString(),
      };
      const { container } = render(
        <EnrolmentStatusInfo event={eventWithEnrolment} />
      );
      expect(
        screen.queryByTestId('event-enrolment-status')
      ).not.toBeInTheDocument();
      expect(container).toBeEmptyDOMElement();
    }
  );

  it('should apply alert class when enrolment status is "full"', () => {
    vi.spyOn(GetEventEnrolmentStatus, 'getEnrolmentStatus').mockReturnValue(
      EnrolmentStatusLabel.full
    );
    const eventWithEnrolment: EventFields = {
      ...baseEvent,
      enrolmentStartTime: startOfYesterday().toISOString(),
      enrolmentEndTime: endOfTomorrow().toISOString(),
    };
    render(<EnrolmentStatusInfo event={eventWithEnrolment} />);
    const statusElement = screen.getByText(/event:enrolmentStatus/);
    // The component applies a class from a CSS module, so we check for its existence.
    // We cannot check for the exact class name (e.g., 'eventHero_alert_123'),
    // but we can check that a class attribute is present.
    // In a real-world scenario with identity-obj-proxy, we could check for `toHaveClass('alert')`.
    expect(statusElement).toHaveAttribute('class');
    expect(statusElement.getAttribute('class')).toContain('alert');
  });
});

describe("EventHero's enrolment features", () => {
  it.each<
    [
      EnrolmentStatusLabel,
      { showOfferButton: boolean; showEnrolmentStatus: boolean },
    ]
  >([
    [
      EnrolmentStatusLabel.enrollable,
      { showOfferButton: true, showEnrolmentStatus: false },
    ],
    [
      EnrolmentStatusLabel.enrolmentEnded,
      { showOfferButton: false, showEnrolmentStatus: true },
    ],
    [
      EnrolmentStatusLabel.enrolmentNotStartedYet,
      { showOfferButton: true, showEnrolmentStatus: true },
    ],
    [
      EnrolmentStatusLabel.full,
      { showOfferButton: false, showEnrolmentStatus: true },
    ],
    [
      EnrolmentStatusLabel.noEnrolmentTimes,
      { showOfferButton: false, showEnrolmentStatus: false },
    ],
    [
      EnrolmentStatusLabel.queueable,
      { showOfferButton: true, showEnrolmentStatus: false },
    ],
  ])('Status: %s => %o', (status, { showOfferButton, showEnrolmentStatus }) => {
    vi.spyOn(GetEventEnrolmentStatus, 'getEnrolmentStatus').mockReturnValue(
      status
    );
    render(
      <EventHero
        event={{
          ...baseEvent,
          enrolmentStartTime: startOfYesterday().toISOString(),
          enrolmentEndTime: endOfTomorrow().toISOString(),
          offers: [{ infoUrl: { fi: 'https://hel.fi' } }],
          registration:
            status === EnrolmentStatusLabel.noEnrolmentTimes
              ? null
              : {
                  ...baseEvent.registration,
                  enrolmentStartTime: startOfYesterday().toISOString(),
                  enrolmentEndTime: endOfTomorrow().toISOString(),
                  remainingAttendeeCapacity:
                    status === EnrolmentStatusLabel.full ||
                    EnrolmentStatusLabel.queueable
                      ? 0
                      : 10,
                  remainingWaitingListCapacity:
                    status === EnrolmentStatusLabel.full ? 0 : 5,
                },
        }}
      />
    );
    expect(screen.getByText(baseEvent.name.fi!)).toBeInTheDocument();
    if (showEnrolmentStatus) {
      expect(screen.getByText(/event:enrolmentStatus/)).toBeInTheDocument();
    } else {
      expect(
        screen.queryByTestId('event-enrolment-status')
      ).not.toBeInTheDocument();
    }

    if (showOfferButton) {
      expect(
        screen.getByRole('button', {
          name: /(hero\.ariaLabelEnrol|hero\.ariaLabelQueueEnrol|hero\.ariaLabelQueueBuy)/i,
        })
      ).toBeInTheDocument();
    } else {
      expect(
        screen.queryByRole('button', {
          name: /(hero\.ariaLabelEnrol|hero\.ariaLabelQueueEnrol|hero\.ariaLabelQueueBuy)/i,
        })
      ).not.toBeInTheDocument();
    }
  });
});
