import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import React from 'react';

import { render, screen } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import LargeVenueCard from '../LargeVenueCard';

const renderComponent = () =>
  render(
    <LargeVenueCard
      id="tprek:123"
      title="Venue title"
      location="Venue location"
    />
  );

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});

describe('large venue card', () => {
  it('should go to venue page by clicking venue card', async () => {
    const { router } = renderComponent();

    expect(router.pathname).toStrictEqual('/');

    await userEvent.click(
      screen.getAllByRole('link', {
        name: translations.venue.venueCard.ariaLabelLink.replace(
          '{{name}}',
          'Venue title'
        ),
      })[0]
    );

    expect(router.pathname).toStrictEqual('/paikat/tprek:123');
  });
});
