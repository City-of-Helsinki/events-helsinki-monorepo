import { render } from '@testing-library/react';
import React from 'react';

import LinkedInShareLink from '../LinkedInShareLink';

const renderComponent = (props) => render(<LinkedInShareLink {...props} />);

it('should apply aria label', () => {
  const sharedLink = 'https://helsinki.fi/some/';
  renderComponent({ sharedLink });

  expect(screen.getByLabelText(/Jaa LinkedInissä/i)).toBeInTheDocument();
});
