import { translations } from '@events-helsinki/common-i18n/tests/initI18n';
import React from 'react';
import { render, screen, userEvent, waitFor } from '@/test-utils';
import { fakePlace } from '@/test-utils/mockDataUtils';
import { PlaceDetailsDocument } from '../../../types';
import PlaceFilter from '../PlaceFilter';

const placeId = 'helsinki:123';
const placeName = 'Gräsan taitojen talo';

const place = fakePlace({ id: placeId, name: { fi: placeName } });
const placeResponse = {
  data: {
    placeDetails: place,
  },
};

const request = {
  query: PlaceDetailsDocument,
  variables: {
    id: placeId,
  },
};

const mocks = [
  {
    request,
    result: placeResponse,
  },
];

it('matches snapshot', async () => {
  const { container } = render(
    <PlaceFilter id={placeId} onRemove={jest.fn()} />,
    { mocks }
  );

  await screen.findByText(placeName);
  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked', async () => {
  const onClickMock = jest.fn();
  render(<PlaceFilter id={placeId} onRemove={onClickMock} />, {
    mocks,
  });

  await screen.findByText(placeName);

  await userEvent.click(screen.getByRole('button'));

  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledWith(placeId, 'place');
});

it("should return null if place doesn't exist", async () => {
  const mocks = [
    {
      request,
      error: new Error('not found'),
    },
  ];

  const { container } = render(
    <PlaceFilter id={placeId} onRemove={jest.fn()} />,
    {
      mocks,
    }
  );

  await waitFor(() => {
    expect(
      screen.queryByText(translations.common.loading)
    ).not.toBeInTheDocument();
  });

  expect(container.innerHTML).toBe('');
});
