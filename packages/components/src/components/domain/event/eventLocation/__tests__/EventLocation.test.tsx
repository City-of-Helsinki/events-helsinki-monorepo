import * as React from 'react';

import { render, screen } from '@/test-utils';
import { fakeEvent, fakePlace } from '@/test-utils/mockDataUtils';
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

it('should render 1 mapLink and 2 directionsLink', () => {
  render(<EventLocation event={event} />);

  expect(
    screen.getByRole('link', {
      name: /Avaa kartta. Avautuu uudessa välilehdessä. Avautuu toisella sivustolla./i,
    })
  ).toBeInTheDocument();
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
