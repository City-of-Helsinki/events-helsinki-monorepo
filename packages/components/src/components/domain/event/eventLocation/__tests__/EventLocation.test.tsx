import { translations } from '@events-helsinki/common-i18n/tests/initI18n';
import { render, screen } from '@/test-utils';
import { fakeEvent, fakePlace } from '@/test-utils/mockDataUtils';
import {
  acceptRequiredCookieConsentsOnly,
  acceptServiceMapCookieConsents,
} from '@/test-utils/mocks/cookieMocks';
import type { EventFields } from '../../../../../types';
import EventLocation from '../EventLocation';

const eventName = 'Event name';
const addressLocality = 'Helsinki';
const streetAddress = 'Testikatu 2';
const event = fakeEvent({
  location: fakePlace({
    addressLocality: { fi: addressLocality },
    streetAddress: { fi: streetAddress },
  }),
  name: { fi: eventName },
}) as EventFields;

it('should render 1 mapLink and 2 directionsLink', async () => {
  render(<EventLocation event={event} />);

  await screen.findByRole('link', {
    name: /Avaa kartta. Avautuu uudessa välilehdessä. Avautuu toisella sivustolla./i,
  });
  expect(
    screen.getByRole('link', { name: /reittiohjeet \(hsl\)/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /reittiohjeet \(google\)/i })
  ).toBeInTheDocument();
});

it('should render event name', () => {
  render(<EventLocation event={event} />);

  expect(screen.getByText(eventName)).toBeInTheDocument();
});

it('should render location address', () => {
  render(<EventLocation event={event} />);

  expect(
    screen.getByText([streetAddress, addressLocality].join(', '))
  ).toBeInTheDocument();
});

describe('cookie consents', () => {
  describe('when disabled', () => {
    it('should not render service map', () => {
      render(<EventLocation event={event} />);
      expect(
        screen.queryByTitle(translations.common.mapBox.location.mapTitle)
      ).not.toBeInTheDocument();
    });
  });
  describe('when only required consents accepted', () => {
    it('should not render service map', () => {
      acceptRequiredCookieConsentsOnly();
      render(<EventLocation event={event} />);
      expect(
        screen.queryByTitle(translations.common.mapBox.location.mapTitle)
      ).not.toBeInTheDocument();
    });
  });
  describe('when service map consents accepted', () => {
    it('renders service map', async () => {
      acceptServiceMapCookieConsents();
      render(<EventLocation event={event} />);
      expect(
        screen.getByTitle(translations.common.mapBox.location.mapTitle)
      ).toBeInTheDocument();
    });
  });
});
