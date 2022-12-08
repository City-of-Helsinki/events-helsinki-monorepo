import userEvent from '@testing-library/user-event';
import type { EventFieldsFragment } from 'events-helsinki-components';
import mockRouter from 'next-router-mock';
import React from 'react';

import { render, screen } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import { fakeEvent } from '@/test-utils/mockDataUtils';
import LargeVenueCard from '../LargeVenueCard';

const renderComponent = () =>
  render(
    <LargeVenueCard id="123" title="Event title" location="Event location" />
  );

beforeEach(() => {
  mockRouter.setCurrentUrl('/');
});

describe('large venue card', () => {
  // TODO: when HDS fixes the tag id -> uncomment
  /* it('for accessibility violations', async () => {
    const event = fakeEvent() as EventFieldsFragment;
    const { container } = renderComponent(event);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }); */

  // Skipped, because this is not available after the Link-component is changed from react-router Link.
  it.skip('should go to venue page by clicking event card', async () => {
    const event = fakeEvent({
      id: '123',
    }) as EventFieldsFragment;

    const { router } = renderComponent();

    expect(router.pathname).toStrictEqual('/');

    await userEvent.click(
      screen.getByRole('link', {
        name: translations.event.eventCard.ariaLabelLink.replace(
          '{{name}}',
          event.name.fi as string
        ),
      })
    );

    expect(router.pathname).toStrictEqual('/kurssit/123');
  });
});
