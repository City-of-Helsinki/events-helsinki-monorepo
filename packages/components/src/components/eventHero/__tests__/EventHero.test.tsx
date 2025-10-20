import { endOfTomorrow, startOfYesterday } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
import capitalize from 'lodash/capitalize';
import * as React from 'react';
import { render, screen, userEvent } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import {
  fakeEvent,
  fakeKeyword,
  fakeLocalizedObject,
  fakeOffer,
} from '@/test-utils/mockDataUtils';
import {
  EventTypeId,
  type EventDetails,
  type EventFieldsFragment,
  type OfferFieldsFragment,
} from '../../../types/generated/graphql';
import getDateRangeStr from '../../../utils/getDateRangeStr';
import type { EventHeroProps } from '../EventHero';
import EventHero from '../EventHero';

const name = 'Event name';
const startTime = '2020-06-22T07:00:00.000000Z';
const endTime = '2020-06-22T10:00:00.000000Z';
const shortDescription = 'Event description';
const locationName = 'Location name';
const streetAddress = 'Test address 1';
const addressLocality = 'Helsinki';

const keywordNames = ['keyword 1', 'keyword 2'];
const keywords = keywordNames.map((name) =>
  fakeKeyword({ name: { fi: name } })
);

const getFakeEvent = (overrides?: Partial<EventDetails>) => {
  return fakeEvent({
    name: { fi: name },
    keywords,
    startTime,
    endTime,
    publisher: '',
    shortDescription: { fi: shortDescription },
    location: {
      internalId: 'tprek:8740',
      addressLocality: { fi: addressLocality },
      name: { fi: locationName },
      streetAddress: { fi: streetAddress },
    },
    externalLinks: [],
    locationExtraInfo: null,
    ...overrides,
  }) as EventFieldsFragment;
};

afterAll(() => {
  clear();
});

const renderComponent = (props?: Partial<EventHeroProps>) => {
  const event = getFakeEvent();
  return render(<EventHero event={event} {...props} />, {
    routes: [`/tapahtuma/${event.id}?returnPath=/haku`],
  });
};

it('should render event name, description and location', () => {
  renderComponent();

  expect(screen.getByRole('heading', { name })).toBeInTheDocument();
  expect(screen.getByText(shortDescription)).toBeInTheDocument();
  expect(
    screen.getByText([locationName, streetAddress, addressLocality].join(', '))
  ).toBeInTheDocument();
});

it('should go to event list', async () => {
  const { router } = renderComponent();

  await userEvent.click(
    screen.getByRole('link', {
      name: translations.event.hero.ariaLabelBackButton,
    })
  );
  expect(router.pathname).toBe('/haku');
});

it('should render keywords', () => {
  renderComponent();

  keywordNames.forEach((keyword) => {
    expect(screen.getByText(capitalize(keyword))).toBeInTheDocument();
  });
});

it('should render today tag', () => {
  advanceTo('2020-06-22');
  renderComponent();

  expect(
    screen.getByRole('link', {
      name: translations.event.categories.labelToday,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('link', {
      name: translations.event.categories.labelThisWeek,
    })
  ).not.toBeInTheDocument();
});

it('should render this week tag', () => {
  advanceTo('2020-06-23');
  renderComponent();

  expect(
    screen.queryByRole('link', {
      name: translations.event.categories.labelToday,
    })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('link', {
      name: translations.event.categories.labelThisWeek,
    })
  ).toBeInTheDocument();
});

it('should hide buy/enrol button if no offer url', () => {
  const mockEvent = getFakeEvent({
    offers: [
      fakeOffer({
        infoUrl: {
          fi: '',
          en: '',
          sv: '',
        },
      }) as OfferFieldsFragment,
    ],
  });
  render(<EventHero event={mockEvent} />);

  expect(
    screen.queryByRole('button', {
      name: new RegExp(translations.event.hero.buttonEnrol, 'i'),
    })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', {
      name: new RegExp(translations.event.hero.ariaLabelBuyTickets, 'i'),
    })
  ).not.toBeInTheDocument();
});

// should show Buy for EventTypeId.General AND isFree = false
// should show Enrol in all other cases

it.each([
  [EventTypeId.Course, false, translations.event.hero.ariaLabelEnrol],
  [EventTypeId.Course, true, translations.event.hero.ariaLabelEnrol],
  [EventTypeId.General, true, translations.event.hero.ariaLabelEnrol],
  [EventTypeId.General, false, translations.event.hero.ariaLabelBuyTickets],
])(
  'should show buy/enrol button',
  async (eventType, isFree, buttonAriaLabel) => {
    global.open = vi.fn();
    const infoUrl = 'https://test.url';
    const mockEvent = getFakeEvent({
      typeId: eventType,
      offers: [
        fakeOffer({
          isFree,
          infoUrl: fakeLocalizedObject(infoUrl),
        }) as OfferFieldsFragment,
      ],
      externalLinks: [],
      registration: {
        enrolmentStartTime: startOfYesterday().toISOString(),
        enrolmentEndTime: endOfTomorrow().toISOString(),
        remainingAttendeeCapacity: 10,
      },
    });

    render(<EventHero event={mockEvent} />);

    await userEvent.click(
      screen.getByRole('button', {
        name: new RegExp(buttonAriaLabel, 'i'),
      })
    );
    expect(global.open).toHaveBeenCalledWith(infoUrl);
  }
);

it('should show event dates if super event is defined', () => {
  const mockEvent = getFakeEvent();
  const mockSuperEvent = getFakeEvent({
    startTime: '2020-06-22T07:00:00.000000Z',
    endTime: '2025-06-26T07:00:00.000000Z',
  });
  render(
    <EventHero
      event={mockEvent}
      superEvent={{ data: mockSuperEvent, status: 'resolved' }}
    />
  );

  const dateStr = getDateRangeStr({
    start: mockEvent.startTime as string,
    end: mockEvent.endTime,
    locale: 'fi',
    includeTime: true,
    timeAbbreviation: translations.common.timeAbbreviation,
  });

  expect(screen.getByText(dateStr)).toBeInTheDocument();
});
