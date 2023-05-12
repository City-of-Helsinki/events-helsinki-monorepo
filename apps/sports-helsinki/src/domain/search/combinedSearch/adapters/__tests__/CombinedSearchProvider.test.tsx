import mockRouter from 'next-router-mock';
import qs from 'query-string';
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
  it('reads the context properly', () => {
    const searchParams = new URLSearchParams('text=test%20text');
    const { container } = render(
      <CombinedSearchProvider searchParams={searchParams}>
        <TestingComponent />
      </CombinedSearchProvider>
    );
    expect(container).toMatchSnapshot();
  });

  // FIXME: Skipped while this feature is still planned
  it.skip('pushes the router when search params changes', () => {
    mockRouter.setCurrentUrl(`/`);
    expect(qs.stringify(mockRouter.query)).toBe('');
    const searchParams = new URLSearchParams('text=test%20text');
    render(
      <CombinedSearchProvider searchParams={searchParams}>
        <TestingComponent />
      </CombinedSearchProvider>
    );
    expect(qs.stringify(mockRouter.query)).toBe('text=test%20text');
  });
});
