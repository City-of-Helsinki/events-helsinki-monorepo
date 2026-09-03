import type { Venue } from '@events-helsinki/components';
import { ProviderType } from '@events-helsinki/components';
import React from 'react';
import { render, screen } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import { fakeVenue } from '@/test-utils/mockDataUtils';
import VenueInfo from '../VenueInfo';

const getFakeVenue = (overrides?: Partial<Venue>) =>
  fakeVenue(overrides) as Venue;

const infoTranslations = translations.venue.info;

it('renders opening hours when a connection with an opening hours section exists', () => {
  const venue = getFakeVenue({
    connections: [
      {
        sectionType: 'OPENING_HOURS',
        name: 'Ma-Pe 8-20',
      } as never,
    ],
  });
  render(<VenueInfo venue={venue} />);
  expect(
    screen.getByText(infoTranslations.labelOpeningHours)
  ).toBeInTheDocument();
  expect(screen.getByText('Ma-Pe 8-20')).toBeInTheDocument();
});

it('does not render opening hours when there are no matching connections', () => {
  const venue = getFakeVenue({ connections: [] });
  render(<VenueInfo venue={venue} />);
  expect(
    screen.queryByText(infoTranslations.labelOpeningHours)
  ).not.toBeInTheDocument();
});

it('renders contact details when telephone and email are present', () => {
  const venue = getFakeVenue({
    telephone: '0401234567',
    email: 'test@example.com',
    connections: [],
  });
  render(<VenueInfo venue={venue} />);
  expect(
    screen.getByText(infoTranslations.labelContactDetails)
  ).toBeInTheDocument();
  expect(screen.getByText('0401234567')).toBeInTheDocument();
  expect(screen.getByText('test@example.com')).toBeInTheDocument();
});

it('renders additional contact sections from connections', () => {
  const venue = getFakeVenue({
    telephone: '',
    email: '',
    connections: [
      {
        sectionType: 'PHONE_OR_EMAIL',
        name: 'Reception',
        phone: '0409876543',
      } as never,
    ],
  });
  render(<VenueInfo venue={venue} />);
  expect(screen.getByText('Reception')).toBeInTheDocument();
  expect(screen.getByText('0409876543')).toBeInTheDocument();
});

it('does not render contact details when there is no phone, email or section', () => {
  const venue = getFakeVenue({
    telephone: '',
    email: '',
    connections: [],
  });
  render(<VenueInfo venue={venue} />);
  expect(
    screen.queryByText(infoTranslations.labelContactDetails)
  ).not.toBeInTheDocument();
});

it('renders venue information links when infoUrl is present', () => {
  const venue = getFakeVenue({
    infoUrl: 'https://example.com/info',
    connections: [],
  });
  render(<VenueInfo venue={venue} />);
  expect(
    screen.getByText(infoTranslations.labelVenueInformationLinks)
  ).toBeInTheDocument();
  expect(screen.getByText(infoTranslations.link.website)).toBeInTheDocument();
});

it('renders other information links from connections', () => {
  const venue = getFakeVenue({
    infoUrl: '',
    connections: [
      {
        sectionType: 'LINK',
        url: 'https://example.com/other',
        name: 'Other link',
      } as never,
    ],
  });
  render(<VenueInfo venue={venue} />);
  expect(screen.getByText('Other link')).toBeInTheDocument();
});

it('does not render venue information links when there is no infoUrl or link connections', () => {
  const venue = getFakeVenue({ infoUrl: '', connections: [] });
  render(<VenueInfo venue={venue} />);
  expect(
    screen.queryByText(infoTranslations.labelVenueInformationLinks)
  ).not.toBeInTheDocument();
});

it('always renders the route info section', () => {
  const venue = getFakeVenue({ connections: [] });
  render(<VenueInfo venue={venue} />);
  expect(screen.getByText(infoTranslations.labelRoute)).toBeInTheDocument();
  expect(
    screen.getByText(translations.venue.location.directionsHSL)
  ).toBeInTheDocument();
  expect(
    screen.getByText(translations.venue.location.directionsGoogle)
  ).toBeInTheDocument();
});

it('renders the Helsinki-city-owned service owner info with the searchByHelsinkiOnly link', () => {
  const venue = getFakeVenue({
    providerType: ProviderType.SelfProduced,
    displayedServiceOwnerType: 'MUNICIPAL_SERVICE',
    displayedServiceOwner: 'Liikuntavirasto',
    connections: [],
  } as never);
  render(<VenueInfo venue={venue} />);
  expect(
    screen.getByText(translations.common.cityOfHelsinki)
  ).toBeInTheDocument();
  expect(screen.getByText('Liikuntavirasto')).toBeInTheDocument();
  expect(screen.getByTestId('helsinkiOnlyLink')).toBeInTheDocument();
});

it('cleans redundant municipal-service prefixes and Helsinki suffixes from the service owner name', () => {
  const venue = getFakeVenue({
    providerType: ProviderType.SelfProduced,
    displayedServiceOwnerType: 'MUNICIPAL_SERVICE',
    displayedServiceOwner:
      'kunnallinen palvelu, Liikuntapaikka, Helsingin kaupunki',
    connections: [],
  } as never);
  render(<VenueInfo venue={venue} />);
  expect(screen.getByText('Liikuntapaikka')).toBeInTheDocument();
});

it('renders a non-Helsinki-owned service owner without the city icon or link', () => {
  const venue = getFakeVenue({
    providerType: ProviderType.PrivateCompany,
    displayedServiceOwnerType: 'PRIVATE_SERVICE',
    displayedServiceOwner: 'Private Gym Ltd',
    connections: [],
  } as never);
  render(<VenueInfo venue={venue} />);
  expect(screen.getByText('Private Gym Ltd')).toBeInTheDocument();
  expect(
    screen.queryByText(translations.common.cityOfHelsinki)
  ).not.toBeInTheDocument();
  expect(screen.queryByTestId('helsinkiOnlyLink')).not.toBeInTheDocument();
});

it('does not render service owner info when there is no displayedServiceOwner and it is not Helsinki-owned', () => {
  const venue = getFakeVenue({
    providerType: ProviderType.PrivateCompany,
    displayedServiceOwnerType: 'PRIVATE_SERVICE',
    displayedServiceOwner: '',
    connections: [],
  } as never);
  render(<VenueInfo venue={venue} />);
  expect(
    screen.queryByText(infoTranslations.labelResponsibleForVenue)
  ).not.toBeInTheDocument();
});
