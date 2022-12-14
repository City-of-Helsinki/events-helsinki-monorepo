import { initTestI18n as i18n } from 'events-helsinki-common-i18n';
import React from 'react';

import { screen, render, userEvent } from '@/test-utils';
import FooterCategories from '../FooterCategories';

beforeEach(() => {
  i18n.changeLanguage('fi');
});

// TODO: fix test, got broken after Links refactoring
/* test('component should be accessible', async () => {
  const { container } = render(<FooterCategories />);

  expect(await axe(container)).toHaveNoViolations();
}); */

it('should route to event search page by clicking category', async () => {
  const { router } = render(<FooterCategories />);

  await userEvent.click(screen.getByRole('link', { name: /musiikki/i }));

  expect(router.pathname).toMatchSnapshot();
});

//  TODO: It seems that hds Footer does not support logoLanguage yet
it.todo('should show Swedish logo');
// test("should show Swedish logo", async () => {
//   i18n.changeLanguage("sv");
//   render(<FooterCategories />);

//   await act(() =>
//     userEvent.click(screen.getByRole("link", { name: /musik/i }))
//   );

//   expect(screen.queryByRole("img")).toHaveClass("sv");
// });
