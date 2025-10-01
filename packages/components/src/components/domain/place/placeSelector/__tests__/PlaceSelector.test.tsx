import { IconStar } from 'hds-react';
import React from 'react';
import { actWait, render, userEvent, waitFor, screen } from '@/test-utils';
import { fakePlaces } from '@/test-utils/mockDataUtils';

import { HELSINKI_OCD_DIVISION_ID } from '../../../../../constants';
import {
  PlaceDetailsDocument,
  PlaceListDocument,
} from '../../../../../types/generated/graphql';
import PlaceSelector from '../PlaceSelector';

const variables = {
  divisions: [HELSINKI_OCD_DIVISION_ID],
  hasUpcomingEvents: true,
  pageSize: 10,
  text: '',
};

const placeNames = [
  'Annantalo',
  'Kallion kirjasto',
  'Kanneltalo',
  'Keskustakirjasto Oodi',
  'Vuosaaren kirjasto',
  'Stoa',
  'Suomen Kansallisteatteri',
  'Töölön kirjasto',
];

const places = fakePlaces(
  placeNames.length,
  placeNames.map((place) => ({
    id: `id-${place}`.replace(' ', '-'),
    name: {
      fi: place,
      en: place,
      sv: place,
    },
  }))
);

const placesResponse = { data: { placeList: { ...places } } };

const searchWord = 'malmi';

const filteredPlaceNames = [
  'Malmin kirjasto',
  'Malmin toimintakeskus',
  'Malminkartanon kirjasto',
  'Malmitalo',
];

const filteredPlaces = fakePlaces(
  filteredPlaceNames.length,
  filteredPlaceNames.map((place) => ({
    id: `id-${place}.replace(' ', '-')`,
    name: {
      fi: place,
      en: place,
      sv: place,
    },
  }))
);

const filteredPlacesResponse = { data: { placeList: { ...filteredPlaces } } };

const placeId = places.data[0].id as string;
const placeName = places.data[0].name?.fi as string;

const placeDetailsResponse = {
  data: {
    placeDetails: {
      ...places.data[0],
      name: {
        fi: placeName,
      },
    },
  },
};

const mocks = [
  {
    request: {
      query: PlaceListDocument,
      variables,
    },
    result: { ...placesResponse },
  },
  {
    request: {
      query: PlaceListDocument,
      variables: { ...variables, text: searchWord },
    },
    result: { ...filteredPlacesResponse },
  },
  {
    request: {
      query: PlaceDetailsDocument,
      variables: { id: placeId },
    },
    result: { ...placeDetailsResponse },
  },
];

const defaultProps = {
  checkboxName: 'places_checkbox',
  icon: <IconStar />,
  name: 'place',
  onChange: vi.fn(),
  showSearch: true,
  title: 'Etsi tapahtumapaikka',
  value: [],
};

it('should filter place options', async () => {
  render(<PlaceSelector {...defaultProps} />, {
    mocks,
  });
  await actWait();
  await userEvent.click(
    screen.getByRole('button', { name: /etsi tapahtumapaikka/i })
  );

  await userEvent.type(
    screen.getByRole('textbox', {
      name: /etsi tapahtumapaikka kirjoita hakusana/i,
    }),
    // uppercase to test case insesitivity
    searchWord.toUpperCase()
  );

  await waitFor(() => {
    expect(
      screen.getByRole('checkbox', { name: filteredPlaceNames[0] })
    ).toBeInTheDocument();
  });

  filteredPlaceNames.forEach((place) => {
    expect(screen.getByRole('checkbox', { name: place })).toBeInTheDocument();
  });
});

it('should render selected value correctly', async () => {
  render(<PlaceSelector {...defaultProps} value={[placeId]} />, {
    mocks,
  });
  await waitFor(() => {
    expect(screen.getByText(placeName)).toBeInTheDocument();
  });
});
