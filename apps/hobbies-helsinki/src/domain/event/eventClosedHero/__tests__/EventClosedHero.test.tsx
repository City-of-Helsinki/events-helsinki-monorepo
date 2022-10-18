import React from 'react';

import { render, screen, userEvent } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import EventClosedHero from '../EventClosedHero';

it('should render all text fields', () => {
  render(<EventClosedHero />);

  expect(
    screen.getByRole('heading', {
      name: translations.event.hero.titleEventClosed,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByText(translations.event.hero.textEventClosed)
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: translations.event.hero.buttonToHomePage,
    })
  ).toBeInTheDocument();
});

it('should go to home page when clicking button', () => {
  const { router } = render(<EventClosedHero />);

  await userEvent.click(
    screen.getByRole('button', {
      name: translations.event.hero.buttonToHomePage,
    })
  );
  expect(router.pathname).toBe('');
});
