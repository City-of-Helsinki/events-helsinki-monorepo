import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen } from '@/test-utils';
import KeywordTag from '../KeywordTag';

const keyword = 'test keyword';

// Skip test because keyword press is disabled
it.skip('matches snapshot', () => {
  const { container } = render(
    <KeywordTag keyword={keyword} onClick={jest.fn()} />
  );

  expect(container.firstChild).toMatchSnapshot();
});

it.skip('calls onClick callback when clicking', async () => {
  const onClickMock = jest.fn();
  render(<KeywordTag keyword={keyword} onClick={onClickMock} />);

  expect(screen.getByText(keyword)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('link'));

  expect(onClickMock).toHaveBeenCalled();
});
