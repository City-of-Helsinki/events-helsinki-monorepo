import { render } from '@testing-library/react';
import React from 'react';

import TwitterShareLink from '../TwitterShareLink';

const renderComponent = (props) => render(<TwitterShareLink {...props} />);

it('should apply aria label', () => {
  const sharedLink = 'https://helsinki.fi/some/';
  const { getByLabelText } = renderComponent({ sharedLink });

  expect(getByLabelText(/Jaa Twitterissä/)).toBeInTheDocument();
});
