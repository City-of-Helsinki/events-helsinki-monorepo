import type { Venue } from '@events-helsinki/components';
import { clear } from 'jest-date-mock';
import capitalize from 'lodash/capitalize';
import * as React from 'react';
import { render, screen } from '@/test-utils';
import { fakeOntology, fakeVenue } from '@/test-utils/mockDataUtils';
import VenueHero from '../VenueHero';
import type { Props as VenueHeroProps } from '../VenueHero';

const name = 'Venue name';
const description = 'Venue description';
const streetAddress = 'Test address 1';
const addressLocality = 'Helsinki';
const ontologyWordLabels = ['keyword 1', 'keyword 2'];
const ontologyWords = ontologyWordLabels.map((name) =>
  fakeOntology({ label: name })
);

const getFakeVenue = (overrides?: Partial<Venue>) => {
  return fakeVenue({
    name,
    description,
    ontologyWords,
    streetAddress,
    addressLocality,
    ...overrides,
  }) as Venue;
};

afterAll(() => {
  clear();
});

const renderComponent = (props?: Partial<VenueHeroProps>) => {
  return render(<VenueHero venue={getFakeVenue()} {...props} />);
};

it('should render venue name, description and location', () => {
  renderComponent();
  expect(screen.getByRole('heading', { name })).toBeInTheDocument();
  expect(
    screen.getByText([streetAddress, addressLocality].join(', '))
  ).toBeInTheDocument();
});

it('should render ontologywords', () => {
  renderComponent();

  ontologyWordLabels.forEach((keyword) => {
    expect(screen.getByText(capitalize(keyword))).toBeInTheDocument();
  });
});
