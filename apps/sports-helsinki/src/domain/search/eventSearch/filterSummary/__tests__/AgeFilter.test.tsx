import userEvent from '@testing-library/user-event';
import React from 'react';

import { screen, render } from '@/test-utils';
import type { AgeFilterProps } from '../AgeFilter';
import AgeFilter from '../AgeFilter';

const props: AgeFilterProps = {
  onRemove: jest.fn(),
  value: '10',
  type: 'minAge',
};

it('matches snapshot', () => {
  const { container } = render(<AgeFilter {...props} />);

  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked', async () => {
  const onClickMock = jest.fn();
  render(<AgeFilter {...props} onRemove={onClickMock} />);

  expect(screen.getByText(`${props.value} v`)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button'));

  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledWith(props.value, 'minAge');
});
