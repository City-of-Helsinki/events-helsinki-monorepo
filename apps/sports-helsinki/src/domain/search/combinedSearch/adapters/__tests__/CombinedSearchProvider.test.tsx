import * as nextNavigation from 'next/navigation';
import mockRouter from 'next-router-mock';
import { render } from '@/test-utils';
import { useCombinedSearchContext } from '../CombinedSearchContext';
import { CombinedSearchProvider } from '../CombinedSearchProvider';

jest.mock('next/navigation', () => ({
  __esModule: true,
  ...jest.requireActual('next/navigation'),
}));
const useSearchParamsSpy = jest.spyOn(nextNavigation, 'useSearchParams');

const TestingComponent = () => {
  const { formValues, searchVariables } = useCombinedSearchContext();
  return (
    <>
      <p data-test-id="formValues">{JSON.stringify(formValues)}</p>
      <p data-test-id="event-searchVariables">
        {JSON.stringify(searchVariables.event)}
      </p>
      <p data-test-id="course-searchVariables">
        {JSON.stringify(searchVariables.course)}
      </p>
      <p data-test-id="venue-searchVariables">
        {JSON.stringify(searchVariables.course)}
      </p>
    </>
  );
};

describe('CombinedSearchProvider', () => {
  it.each([
    // text included, searchType excluded
    'text=test%20text&searchType=Course',
    // text and sportsCategories included
    'text=test%20text&sportsCategories=gym&sportsCategories=playgrounds',
    // organization included
    'organization=testorg',
  ])('reads the context properly', (searchParams) => {
    mockRouter.setCurrentUrl(`/?${searchParams}`);
    // TODO: Remove the useSearchParamsSpy when mockRouter supports next/navigation.
    useSearchParamsSpy.mockImplementation(
      () =>
        new nextNavigation.ReadonlyURLSearchParams(
          new URLSearchParams(searchParams)
        )
    );
    const { container } = render(
      <CombinedSearchProvider>
        <TestingComponent />
      </CombinedSearchProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
