import React from 'react';

import { render } from '@/test-utils';
import Container from '../Container';

it('matches snapshot', () => {
  const { container } = render(<Container>Hello</Container>);

  expect(container.firstChild).toMatchSnapshot();
});
