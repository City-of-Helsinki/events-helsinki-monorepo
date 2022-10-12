import { IconAngleRight } from 'hds-react';
import * as React from 'react';
import { render, screen } from '@/test-utils';

import IconButton from '../IconButton';

const ariaLabel = 'aria label';

it('should render icon button', () => {
  render(<IconButton ariaLabel={ariaLabel} icon={<IconAngleRight />} />);

  expect(screen.getByRole('button', { name: ariaLabel })).toBeInTheDocument();
});
