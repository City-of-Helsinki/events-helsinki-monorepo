import * as React from 'react';
import { render } from '@/test-utils';
import FilterButton from '../FilterButton';

it('matches snapshot', () => {
  const { container } = render(
    <FilterButton
      onRemove={vi.fn()}
      text="text"
      type="publisher"
      value="value"
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});
