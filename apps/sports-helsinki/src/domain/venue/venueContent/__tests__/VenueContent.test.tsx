import React from 'react';

import { configure, render, screen, waitFor } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import { fakeVenue } from '@/test-utils/mockDataUtils';
import VenueContent from '../VenueContent';

configure({ defaultHidden: true });

const description = 'Event description';
const email = 'test@email.com';
const telephone = '0441234567';
const streetAddress = 'Test address 1';
const venue = fakeVenue({
  description,
  streetAddress,
  email,
  telephone,
  connections: [{ sectionType: 'OPENING_HOURS', name: 'opening hours' }],
});

it('should render event content fields', async () => {
  render(<VenueContent venue={venue} />);

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: translations.common.mapBox.title })
    ).toBeInTheDocument();
  });

  const itemsByRole = [
    { role: 'heading', name: translations.venue.info.labelContactDetails },
    { role: 'heading', name: translations.venue.info.labelOpeningHours },
    { role: 'heading', name: translations.venue.info.labelRoute },
    {
      role: 'heading',
      name: translations.venue.info.labelVenueInformationLinks,
    },
    { role: 'heading', name: translations.venue.description.title },
    { role: 'heading', name: translations.venue.shareLinks.title },
    { role: 'button', name: translations.common.shareLinks.buttonCopyLink },
    { role: 'button', name: translations.common.shareLink.shareOnFacebook },
    { role: 'button', name: translations.common.shareLink.shareOnTwitter },
    { role: 'button', name: translations.common.shareLink.shareOnLinkedIn },
    { role: 'heading', name: translations.common.mapBox.title },
  ];

  itemsByRole.forEach(({ role, name }) => {
    expect(screen.getByRole(role, { name })).toBeInTheDocument();
  });

  // there is two kartta-links, thus we check that three is at least one match of each
  expect(
    screen.queryAllByRole('link', {
      name: `${translations.common.mapBox.location.openMap}. ${translations.common.srOnly.opensInANewTab} ${translations.common.srOnly.opensInAnExternalSite}`,
    })
  ).not.toHaveLength(0);

  // Both location and event info have directions links so test that both are available
  const itemsAllByRole = [
    {
      role: 'link',
      name: `${translations.common.mapBox.location.directionsGoogle}. ${translations.common.srOnly.opensInANewTab} ${translations.common.srOnly.opensInAnExternalSite}`,
    },
    {
      role: 'link',
      name: `${translations.common.mapBox.location.directionsHSL}. ${translations.common.srOnly.opensInANewTab} ${translations.common.srOnly.opensInAnExternalSite}`,
    },
  ];

  itemsAllByRole.forEach(({ role, name }) => {
    expect(screen.queryAllByRole(role, { name })).toHaveLength(2);
  });
});
