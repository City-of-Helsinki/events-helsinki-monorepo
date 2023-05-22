import { EventTypeId } from '@events-helsinki/components';
import * as React from 'react';

import { render, screen } from '@/test-utils';
import ResultsInfo from '../ResultsInfo';

it.each<['Venue' | EventTypeId | undefined, string]>([
  ['Venue', 'Valitsemillasi hakuehdoilla ei löytynyt yhtään paikkaa.'],
  [
    EventTypeId.General,
    'Valitsemillasi hakuehdoilla ei löytynyt yhtään tapahtumaa.',
  ],
  [
    EventTypeId.Course,
    'Valitsemillasi hakuehdoilla ei löytynyt yhtään harrastusta.',
  ],
])('renders no events found text', (itemType, infoText) => {
  render(<ResultsInfo itemType={itemType} resultsCount={0} />);
  expect(screen.getByText(infoText)).toBeInTheDocument();
});

it('events with 0 results matches snapshot for no results', () => {
  const { container } = render(
    <ResultsInfo itemType="Venue" resultsCount={0} />
  );

  expect(container).toMatchSnapshot();
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
