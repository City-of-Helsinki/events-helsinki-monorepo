import * as React from 'react';

import { render, screen } from '../../../../../../config/vitest/test-utils';
import ResultsInfo from '../ResultsInfo';

it('events with 0 results matches snapshot for no results', () => {
  const { container } = render(<ResultsInfo resultsCount={0} />);

  expect(container).toMatchSnapshot();
});

it('renders no events found text', async () => {
  render(<ResultsInfo resultsCount={0} />);

  expect(
    screen.getByText(
      'Valitsemillasi hakuehdoilla ei löytynyt yhtään harrastusta.'
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
