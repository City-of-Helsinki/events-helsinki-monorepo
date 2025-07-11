import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen } from '@/test-utils';
import KeywordTag from '../KeywordTag';

const keyword = 'test keyword';

it('matches snapshot', () => {
  const { container } = render(
    <KeywordTag keyword={keyword} onClick={vi.fn()} />
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('calls onClick callback when clicking', async () => {
  const onClickMock = vi.fn();
  render(<KeywordTag keyword={keyword} onClick={onClickMock} />);

  expect(screen.getByText(keyword)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('link'));

  expect(onClickMock).toHaveBeenCalled();
});
