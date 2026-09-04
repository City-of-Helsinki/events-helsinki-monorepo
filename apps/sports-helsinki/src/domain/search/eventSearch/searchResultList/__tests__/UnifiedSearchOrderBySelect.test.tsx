import type * as EventsHelsinkiComponents from '@events-helsinki/components';
import { AccessibilityProfile } from '@events-helsinki/components';
import React from 'react';
import { render, screen, userEvent, waitFor } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import type * as CombinedSearchContextModule from '../../../combinedSearch/adapters/CombinedSearchContext';
import { useCombinedSearchContext } from '../../../combinedSearch/adapters/CombinedSearchContext';
import UnifiedSearchOrderBySelect from '../UnifiedSearchOrderBySelect';

const useGeolocationMock = vi.fn();
const useHandleUnifiedSearchOrderChangeMock = vi.fn();

vi.mock('@events-helsinki/components', async (importOriginal) => {
  const actual = await importOriginal<typeof EventsHelsinkiComponents>();
  return {
    ...actual,
    useGeolocation: () => useGeolocationMock(),
  };
});

vi.mock('../../../../../hooks/useHandleUnifiedSearchOrderChange', async () => ({
  default: () => useHandleUnifiedSearchOrderChangeMock,
}));

vi.mock('../../../combinedSearch/adapters/CombinedSearchContext', async () => {
  const actual = await vi.importActual<typeof CombinedSearchContextModule>(
    '../../../combinedSearch/adapters/CombinedSearchContext'
  );
  return {
    ...actual,
    useCombinedSearchContext: vi.fn(actual.useCombinedSearchContext),
  };
});

const mockedUseCombinedSearchContext = vi.mocked(useCombinedSearchContext);

const setContext = (
  overrides: Partial<
    ReturnType<typeof useCombinedSearchContext>['formValues']
  > = {}
) => {
  mockedUseCombinedSearchContext.mockReturnValue({
    formValues: {
      accessibilityProfile: undefined,
      venueOrderBy: undefined,
      ...overrides,
    } as never,
    searchVariables: {} as never,
    setFormValues: vi.fn(),
    setFormValue: vi.fn(),
    updateRouteToSearchPage: vi.fn(),
    resetFormValues: vi.fn(),
  });
};

beforeEach(() => {
  vi.clearAllMocks();
  setContext();
  useGeolocationMock.mockReturnValue({
    coordinates: null,
    loading: false,
    called: false,
    resolve: vi.fn(),
  });
});

it('renders the select with default relevance option when no venueOrderBy is set', () => {
  render(<UnifiedSearchOrderBySelect />);
  expect(
    screen.getByText(translations.search.orderBy.relevance)
  ).toBeInTheDocument();
});

it('does not show the accessibility option when no accessibilityProfile is selected', async () => {
  render(<UnifiedSearchOrderBySelect />);
  await userEvent.click(screen.getByRole('combobox'));
  expect(
    screen.queryByText(translations.search.orderBy.accessibility)
  ).not.toBeInTheDocument();
});

// eslint-disable-next-line @stylistic/max-len
it('keeps the accessibility option hidden from the open list even when an accessibilityProfile is selected', async () => {
  setContext({ accessibilityProfile: AccessibilityProfile.Wheelchair });
  render(<UnifiedSearchOrderBySelect />);
  await userEvent.click(screen.getByRole('combobox'));
  // The accessibility option is added with visible: false — it is only used
  // to preselect the value, never shown in the open dropdown list.
  expect(
    screen.queryByText(translations.search.orderBy.accessibility)
  ).not.toBeInTheDocument();
});

it('preselects the alphabetical option when venueOrderBy is name', () => {
  setContext({ venueOrderBy: 'name' });
  render(<UnifiedSearchOrderBySelect />);
  expect(
    screen.getByText(translations.search.orderBy.alphabetical)
  ).toBeInTheDocument();
});

it('preselects the distance option when venueOrderBy is distance', () => {
  setContext({ venueOrderBy: 'distance' });
  render(<UnifiedSearchOrderBySelect />);
  expect(
    screen.getByText(translations.search.orderBy.distance)
  ).toBeInTheDocument();
});

it('falls back to the default relevance option when venueOrderBy has no matching option', () => {
  setContext({ venueOrderBy: '-distance' });
  render(<UnifiedSearchOrderBySelect />);
  expect(
    screen.getByText(translations.search.orderBy.relevance)
  ).toBeInTheDocument();
});

it('preselects the accessibility option when venueOrderBy matches the accessibility profile', () => {
  setContext({
    accessibilityProfile: AccessibilityProfile.Wheelchair,
    venueOrderBy: AccessibilityProfile.Wheelchair,
  });
  render(<UnifiedSearchOrderBySelect />);
  expect(
    screen.getByText(translations.search.orderBy.accessibility)
  ).toBeInTheDocument();
});

it('shows a loading spinner icon while geolocation is loading', () => {
  useGeolocationMock.mockReturnValue({
    coordinates: null,
    loading: true,
    called: false,
    resolve: vi.fn(),
  });
  const { container } = render(<UnifiedSearchOrderBySelect />);
  expect(container.querySelector('[class*="loadingSpinner"]')).not.toBeNull();
});

it('calls handleUnifiedSearchOrderChange when a different option is selected', async () => {
  render(<UnifiedSearchOrderBySelect />);
  await userEvent.click(screen.getByRole('combobox'));
  const option = await screen.findByRole('option', {
    name: translations.search.orderBy.alphabetical,
  });
  await userEvent.click(option);
  await waitFor(() => {
    expect(useHandleUnifiedSearchOrderChangeMock).toHaveBeenCalled();
  });
});
