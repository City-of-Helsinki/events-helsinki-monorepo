import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { vi } from 'vitest';
import { render } from '@/test-utils';
import ToggleButton from '../ToggleButton';

const defaultProps = {
  isSelected: true,
  onClick: vi.fn(),
  text: 'Test button',
  value: 'test',
};

it('matches snapshot', () => {
  const { container } = render(<ToggleButton {...defaultProps} />);

  expect(container.firstChild).toMatchSnapshot();
});

it('should call onClick', async () => {
  const onClick = vi.fn();
  const { container } = render(
    <ToggleButton {...defaultProps} onClick={onClick} />
  );

  await userEvent.click(container.firstChild as HTMLElement);
  expect(onClick).toHaveBeenCalledTimes(1);
});
