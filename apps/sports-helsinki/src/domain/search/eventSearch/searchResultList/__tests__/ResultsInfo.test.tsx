import type { AppLanguage } from 'events-helsinki-components';
import * as useLocale from 'events-helsinki-components/hooks/useLocale';

import * as React from 'react';

import { render, screen, userEvent, waitFor } from '@/test-utils';
import ResultsInfo from '../ResultsInfo';

it('events with 0 results matches snapshot for no results', () => {
  const { container } = render(<ResultsInfo resultsCount={0} />);

  expect(container).toMatchSnapshot();
});

it('renders no events found text', async () => {
  render(<ResultsInfo resultsCount={0} />);

  expect(
    screen.getByText(
      'Valitsemillasi hakuehdoilla ei löytynyt yhtään harrastusta'
    )
  ).toBeInTheDocument();
});

it.each([1, 4])(
  'renders few events found text when event count is %i',
  async (resultsCount) => {
    render(<ResultsInfo resultsCount={resultsCount} />);

    const texts = [
      'Valitsemillasi hakuehdoilla löytyi vain vähän hakutuloksia.',
    ];

    texts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  }
);

it.each<[AppLanguage, number]>([
  ['en', 4],
  ['en', 0],
  ['sv', 0],
])(
  'renders language change button under search results when current language is %s and there are %i %s search items',
  async (language, resultsCount) => {
    // @ts-ignore
    jest.spyOn(useLocale, 'default').mockReturnValue(language);

    const { router } = render(<ResultsInfo resultsCount={resultsCount} />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Näytä hakutulokset suomeksi' })
    );

    await waitFor(() => {
      expect(router.pathname).toBe(`/kurssihaku`);
    });
  }
);

// eslint-disable-next-line max-len
it('renders does not render language change button under eventss search results when current language is Finnish', () => {
  // @ts-ignore
  jest.spyOn(useLocale, 'default').mockReturnValue('fi');

  render(<ResultsInfo resultsCount={0} />);

  expect(
    screen.queryByRole('button', { name: 'Näytä hakutulokset suomeksi' })
  ).not.toBeInTheDocument();
});
