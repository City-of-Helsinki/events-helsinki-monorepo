import React from 'react';
import { render, screen } from '@/test-utils';
import TwitterShareLink from '../TwitterShareLink';

const renderComponent = (props: { sharedLink: string }) =>
  render(<TwitterShareLink {...props} />);

it('should apply aria label', () => {
  const sharedLink = 'https://helsinki.fi/some/';
  renderComponent({ sharedLink });

  expect(screen.getByLabelText(/Jaa Twitterissä/)).toBeInTheDocument();
});
