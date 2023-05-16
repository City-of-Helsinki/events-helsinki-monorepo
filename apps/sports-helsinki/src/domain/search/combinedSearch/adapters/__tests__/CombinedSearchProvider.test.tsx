import mockRouter from 'next-router-mock';
import { render } from '@/test-utils';
import { useCombinedSearchContext } from '../CombinedSearchContext';
import { CombinedSearchProvider } from '../CombinedSearchProvider';

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
    'publisher=testorg',
  ])('reads the context properly', (searchParams) => {
    mockRouter.setCurrentUrl(`/?${searchParams}`);
    const { container } = render(
      <CombinedSearchProvider>
        <TestingComponent />
      </CombinedSearchProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
