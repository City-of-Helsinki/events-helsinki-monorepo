import type { ShareLinkProps } from 'events-helsinki-components/components';
import React from 'react';
import { render, screen } from '@/test-utils';

import FacebookShareLink from '../FacebookShareLink';

const renderComponent = (props: ShareLinkProps) =>
  render(<FacebookShareLink {...props} />);

it('should apply aria label', () => {
  const sharedLink = 'https://helsinki.fi/some/';
  renderComponent({ sharedLink });

  expect(screen.getByLabelText(/Jaa Facebookissa/)).toBeInTheDocument();
});
