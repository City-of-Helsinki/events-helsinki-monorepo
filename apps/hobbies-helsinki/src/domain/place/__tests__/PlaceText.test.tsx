import { PlaceDetailsDocument } from '@events-helsinki/components';
import * as React from 'react';

import { fakePlace } from '../../../../config/vitest/mockDataUtils';
import { render, screen, waitFor } from '../../../../config/vitest/test-utils';
import PlaceText from '../PlaceText';

const placeId = 'helsinki:123';
const name = 'Gräsan taitojen talo';

const place = fakePlace({ id: placeId, name: { fi: name } });
const placeResponse = {
  data: {
    placeDetails: place,
  },
};

const mocks = [
  {
    request: {
      query: PlaceDetailsDocument,
      variables: {
        id: placeId,
      },
    },
    result: placeResponse,
  },
];

it('matches snapshot', async () => {
  const { container } = render(<PlaceText id={placeId} />, {
    mocks,
  });

  await waitFor(() => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  expect(container.firstChild).toMatchSnapshot();
});
