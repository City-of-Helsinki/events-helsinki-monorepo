import { getDateRangeStr } from '@events-helsinki/components';
import type {
  EventDetails,
  EventFieldsFragment,
  OfferFieldsFragment,
} from '@events-helsinki/components';
import { advanceTo, clear } from 'jest-date-mock';
import capitalize from 'lodash/capitalize';
import * as React from 'react';
import { render, screen, userEvent } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import {
  fakeEvent,
  fakeExternalLink,
  fakeKeyword,
  fakeLocalizedObject,
  fakeOffer,
} from '@/test-utils/mockDataUtils';
import EventHero from '../EventHero';
import type { Props as EventHeroProps } from '../EventHero';

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
  return render(<EventHero event={getFakeEvent()} {...props} />);
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

// buy and enrol buttons are combined together, the difference is in the redirect url

it('should hide buy/enrol button for free events', () => {
  const mockEvent = getFakeEvent({
    offers: [fakeOffer({ isFree: true }) as OfferFieldsFragment],
  });
  render(<EventHero event={mockEvent} />);

  expect(
    screen.queryByRole('button', {
      name: new RegExp(translations.event.hero.buttonEnrol, 'i'),
    })
  ).not.toBeInTheDocument();
});

it('should show buy/enrol button', async () => {
  global.open = jest.fn();
  const infoUrl = 'https://test.url';
  const mockEvent = getFakeEvent({
    offers: [
      fakeOffer({
        isFree: false,
        infoUrl: fakeLocalizedObject(infoUrl),
      }) as OfferFieldsFragment,
    ],
    externalLinks: [],
  });

  render(<EventHero event={mockEvent} />);

  await userEvent.click(
    screen.getByRole('button', {
      name: translations.event.hero.ariaLabelEnrol,
    })
  );
  expect(global.open).toHaveBeenCalledWith(infoUrl);
});

it('Register button should be visible and clickable', async () => {
  global.open = jest.fn();
  const registrationUrl = 'https://harrastushaku.fi/register/13290';
  const mockEvent = getFakeEvent({
    externalLinks: [
      fakeExternalLink({
        link: registrationUrl,
        name: 'registration',
      }),
    ],
  });

  render(<EventHero event={mockEvent} />);

  expect(
    screen.getByText(translations.event.hero.buttonEnrol)
  ).toBeInTheDocument();

  await userEvent.click(
    screen.getByRole('button', {
      name: translations.event.hero.ariaLabelEnrol,
    })
  );

  expect(global.open).toHaveBeenCalledWith(registrationUrl);
});

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
