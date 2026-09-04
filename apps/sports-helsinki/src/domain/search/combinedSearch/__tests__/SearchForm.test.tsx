import React from 'react';
import { render, screen, userEvent, waitFor } from '@/test-utils';
import { translations } from '@/test-utils/initI18n';
import type * as CombinedSearchContextModule from '../adapters/CombinedSearchContext';
import { useCombinedSearchContext } from '../adapters/CombinedSearchContext';
import type * as UseFormValuesModule from '../hooks/useFormValues';
import { useFormValues } from '../hooks/useFormValues';
import { SimpleSearchForm } from '../SearchForm';

vi.mock('../adapters/CombinedSearchContext', async () => {
  const actual = await vi.importActual<typeof CombinedSearchContextModule>(
    '../adapters/CombinedSearchContext'
  );
  return {
    ...actual,
    useCombinedSearchContext: vi.fn(),
  };
});

vi.mock('../hooks/useFormValues', async () => {
  const actual = await vi.importActual<typeof UseFormValuesModule>(
    '../hooks/useFormValues'
  );
  return {
    ...actual,
    useFormValues: vi.fn(),
  };
});

vi.mock('../../eventSearch/filterSummary/FilterSummary', () => ({
  __esModule: true,

  default: ({ onClear }: { onClear: () => void }) => (
    <button type="button" onClick={onClear}>
      mock-clear-filters
    </button>
  ),
}));

const mockedUseCombinedSearchContext = vi.mocked(useCombinedSearchContext);
const mockedUseFormValues = vi.mocked(useFormValues);

const resetFormValues = vi.fn();
const setFormValues = vi.fn();
const setFormValue = vi.fn();
const updateRouteToSearchPage = vi.fn();

const setTextSearchInput = vi.fn();
const setSelectedSportsCategories = vi.fn();
const setSelectedTargetGroups = vi.fn();
const setSelectedAccessibilityProfile = vi.fn();

const sportsCategories = [
  { label: 'Uinti', value: 'swimming', text: 'Uinti' },
  { label: 'Jooga', value: 'yoga', text: 'Jooga' },
];

const targetGroups = [
  { label: 'Aikuiset', value: 'adults', text: 'Aikuiset' },
  { label: 'Lapset', value: 'children', text: 'Lapset' },
];

const accessibilityProfiles = [
  { label: '', value: '' },
  { label: 'Pyörätuoli', value: 'wheelchair' },
];

const setFormValuesState = (
  overrides: Partial<ReturnType<typeof useFormValues>> = {}
) => {
  mockedUseFormValues.mockReturnValue({
    textSearchInput: '',
    setTextSearchInput,
    selectedSportsCategories: [],
    setSelectedSportsCategories,
    sportsCategoryInput: '',
    setSportsCategoryInput: vi.fn(),
    sportsCategories: sportsCategories as never,
    selectedTargetGroups: [],
    setSelectedTargetGroups,
    targetGroups: targetGroups as never,
    accessibilityProfiles: accessibilityProfiles as never,
    selectedAccessibilityProfile: undefined,
    setSelectedAccessibilityProfile,
    ...overrides,
  });
};

beforeEach(() => {
  vi.clearAllMocks();
  process.env.NEXT_PUBLIC_SHOW_TARGET_GROUP_FILTER = 'true';
  mockedUseCombinedSearchContext.mockReturnValue({
    formValues: {} as never,
    searchVariables: {} as never,
    setFormValues,
    setFormValue,
    updateRouteToSearchPage,
    resetFormValues,
  });
  setFormValuesState();
});

it('renders the title and description when provided', () => {
  render(
    <SimpleSearchForm
      scrollToResultList={vi.fn()}
      title="Etsi liikuntaa"
      description="Kuvausteksti"
    />
  );
  expect(screen.getByText('Etsi liikuntaa')).toBeInTheDocument();
  expect(screen.getByText('Kuvausteksti')).toBeInTheDocument();
});

it('does not render a title or description when they are not provided', () => {
  render(<SimpleSearchForm scrollToResultList={vi.fn()} />);
  expect(screen.queryByText('Etsi liikuntaa')).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
});

it('updates the text search input value on change', async () => {
  render(<SimpleSearchForm scrollToResultList={vi.fn()} />);
  const input = screen.getByPlaceholderText(
    translations.appSports.search.search.placeholder
  );
  await userEvent.type(input, 'a');
  expect(setTextSearchInput).toHaveBeenCalled();
});

it('shows the target group filter when the AppConfig flag is enabled', () => {
  render(<SimpleSearchForm scrollToResultList={vi.fn()} />);
  expect(
    screen.getByText(translations.search.search.titleDropdownTargetGroup)
  ).toBeInTheDocument();
});

it('hides the target group filter when the AppConfig flag is disabled', () => {
  process.env.NEXT_PUBLIC_SHOW_TARGET_GROUP_FILTER = 'false';
  render(<SimpleSearchForm scrollToResultList={vi.fn()} />);
  expect(
    screen.queryByText(translations.search.search.titleDropdownTargetGroup)
  ).not.toBeInTheDocument();
});

it('updates the selected sports categories when an option is chosen', async () => {
  render(<SimpleSearchForm scrollToResultList={vi.fn()} />);
  const [sportsCategorySelect] = screen.getAllByRole('combobox');
  await userEvent.click(sportsCategorySelect);
  const option = await screen.findByRole('option', { name: 'Uinti' });
  await userEvent.click(option);
  await waitFor(() => {
    expect(setSelectedSportsCategories).toHaveBeenCalledWith(['swimming']);
  });
});

it('updates the selected target groups when an option is chosen', async () => {
  render(<SimpleSearchForm scrollToResultList={vi.fn()} />);
  // Order in the DOM: sportsCategory, targetGroup, accessibilityProfile.
  const [, targetGroupSelect] = screen.getAllByRole('combobox');
  await userEvent.click(targetGroupSelect);
  const option = await screen.findByRole('option', { name: 'Aikuiset' });
  await userEvent.click(option);
  await waitFor(() => {
    expect(setSelectedTargetGroups).toHaveBeenCalledWith(['adults']);
  });
});

it('sets the selected accessibility profile and updates venueOrderBy when a real option is chosen', async () => {
  render(<SimpleSearchForm scrollToResultList={vi.fn()} />);
  // Order in the DOM: sportsCategory, targetGroup, accessibilityProfile.
  const [, , accessibilitySelect] = screen.getAllByRole('combobox');
  await userEvent.click(accessibilitySelect);
  const option = await screen.findByRole('option', { name: 'Pyörätuoli' });
  await userEvent.click(option);
  await waitFor(() => {
    expect(setSelectedAccessibilityProfile).toHaveBeenCalledWith('wheelchair');
  });
  expect(setFormValue).toHaveBeenCalledWith('venueOrderBy', 'wheelchair');
});

it('calls resetFormValues when the clear filters control is clicked', async () => {
  render(<SimpleSearchForm scrollToResultList={vi.fn()} />);
  await userEvent.click(
    screen.getByRole('button', { name: 'mock-clear-filters' })
  );
  expect(resetFormValues).toHaveBeenCalledTimes(1);
});

it('submits the form with the current values, updates the route and scrolls to the results', async () => {
  const scrollToResultList = vi.fn();
  setFormValuesState({
    textSearchInput: 'jooga',
    selectedSportsCategories: ['yoga'],
    selectedTargetGroups: ['adults'],
    selectedAccessibilityProfile: 'wheelchair',
  });
  render(<SimpleSearchForm scrollToResultList={scrollToResultList} />);
  await userEvent.click(
    screen.getByRole('button', {
      name: translations.search.search.buttonSearch,
    })
  );
  expect(setFormValues).toHaveBeenCalledWith({
    text: 'jooga',
    sportsCategories: ['yoga'],
    targetGroups: ['adults'],
    accessibilityProfile: 'wheelchair',
  });
  expect(updateRouteToSearchPage).toHaveBeenCalledWith({ shallow: true });
  expect(scrollToResultList).toHaveBeenCalledTimes(1);
});

it('submits the form without throwing when scrollToResultList is not provided', async () => {
  render(
    <SimpleSearchForm scrollToResultList={undefined as unknown as () => void} />
  );
  await userEvent.click(
    screen.getByRole('button', {
      name: translations.search.search.buttonSearch,
    })
  );
  expect(setFormValues).toHaveBeenCalled();
  expect(updateRouteToSearchPage).toHaveBeenCalledWith({ shallow: true });
});
