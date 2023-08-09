import * as nextNavigation from 'next/navigation';
import mockRouter from 'next-router-mock';
import qs from 'query-string';
import React from 'react';
import { render } from '@/test-utils';
import type { CombinedSearchAdapterInput } from '../../types';
import { useCombinedSearchController } from '../useCombinedSearchController';
jest.mock('next/navigation', () => ({
  __esModule: true,
  ...jest.requireActual('next/navigation'),
}));
const useSearchParamsSpy = jest.spyOn(nextNavigation, 'useSearchParams');

const outputQuery: CombinedSearchAdapterInput = {
  text: 'test text',
  venueOrderBy: 'venue-field-asc',
  eventOrderBy: 'event-field-asc',
  courseOrderBy: 'course-field-asc',
  sportsCategories: [],
  targetGroups: [],
  keywords: [],
};
const extraParamsInOutputQuery = {
  searchType: 'Venue',
  unrelatedParam: 'whatever',
};
const inputSearchParams = qs.stringify({
  ...outputQuery,
  ...extraParamsInOutputQuery,
});
const input = new URLSearchParams(inputSearchParams);

/**
 * The purpose of this component is to call
 * the updateRouteToSearchPage of the useCombinedSearchController.
 * */
function UpdateRouteToSearchPageComponent() {
  const { updateRouteToSearchPage } = useCombinedSearchController();
  React.useEffect(() => {
    updateRouteToSearchPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>UpdateRouteToSearchPageComponent</div>;
}

describe('updateRouteToSearchPage', () => {
  it.each([
    // Test the happy path where nothing changes
    [input, inputSearchParams],
    [
      new URLSearchParams(
        qs.stringify({
          text: 'to be transformed to text',
          venueOrderBy: 'to-be-order-by',
        })
      ),
      qs.stringify({
        text: 'to be transformed to text',
        venueOrderBy: 'to-be-order-by',
      }),
    ],
    // Test the backward compatibility
    [
      new URLSearchParams(
        qs.stringify({
          q: 'to be transformed to text',
          sort: 'to-be-order-by',
        })
      ),
      qs.stringify({
        q: 'to be transformed to text',
        sort: 'to-be-order-by',
        text: 'to be transformed to text',
        venueOrderBy: 'to-be-order-by',
        eventOrderBy: 'to-be-order-by',
        courseOrderBy: 'to-be-order-by',
      }),
    ],
  ])('pushes the user to a desired url', (searchParams, outputSearchParams) => {
    mockRouter.setCurrentUrl(`/?${searchParams.toString()}`);
    // TODO: Remove the useSearchParamsSpy when mockRouter supports next/navigation.
    useSearchParamsSpy.mockImplementation(
      () =>
        new nextNavigation.ReadonlyURLSearchParams(
          new URLSearchParams(searchParams.toString())
        )
    );
    render(<UpdateRouteToSearchPageComponent />);
    expect(qs.stringify(mockRouter.query)).toBe(outputSearchParams);
  });
});
