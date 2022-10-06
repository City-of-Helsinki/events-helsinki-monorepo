import { IconHome } from 'hds-react';
import React from 'react';

import { render, screen, userEvent } from '../../../../tests/testUtils';
import CategoryFilter from '../CategoryFilter';

const category = {
  text: 'text',
  value: 'value',
};

it('matches snapshot', () => {
  const { container } = render(
    <CategoryFilter
      href="/test"
      icon={<IconHome />}
      text={category.text}
      value={category.value}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('calls onClick callback when category filter button is clicked', async () => {
  const testUrl = '/test';
  render(
    <CategoryFilter
      href={testUrl}
      icon={<IconHome />}
      text={category.text}
      value={category.value}
    />
  );

  expect(screen.getByText(category.text)).toBeInTheDocument();

  await userEvent.click(screen.getByText(category.text));
});
