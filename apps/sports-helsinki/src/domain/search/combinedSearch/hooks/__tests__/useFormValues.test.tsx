import { AccessibilityProfile } from '@events-helsinki/components';
import { act, renderHook, waitFor } from '@/test-utils';
import type * as CombinedSearchContextModule from '../../adapters/CombinedSearchContext';
import { useCombinedSearchContext } from '../../adapters/CombinedSearchContext';
import { useFormValues, EMPTY_OPTION } from '../useFormValues';

vi.mock('../../adapters/CombinedSearchContext', async () => {
  const actual = await vi.importActual<typeof CombinedSearchContextModule>(
    '../../adapters/CombinedSearchContext'
  );
  return {
    ...actual,
    useCombinedSearchContext: vi.fn(actual.useCombinedSearchContext),
  };
});

const mockedUseCombinedSearchContext = vi.mocked(useCombinedSearchContext);

const formValues = (overrides = {}) => ({
  text: '',
  venueOrderBy: 'name',
  eventOrderBy: 'name',
  courseOrderBy: 'name',
  sportsCategories: [] as string[],
  targetGroups: [] as string[],
  accessibilityProfile: undefined,
  keywords: [],
  ...overrides,
});

describe('useFormValues', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseCombinedSearchContext.mockReturnValue({
      formValues: formValues() as never,
      searchVariables: {} as never,
      setFormValues: vi.fn(),
      setFormValue: vi.fn(),
      updateRouteToSearchPage: vi.fn(),
      resetFormValues: vi.fn(),
    });
  });

  it('initializes state from the context form values', () => {
    mockedUseCombinedSearchContext.mockReturnValue({
      formValues: formValues({
        text: 'skating',
        sportsCategories: ['ice_skating'],
        targetGroups: ['children'],
        accessibilityProfile: AccessibilityProfile.Wheelchair,
      }) as never,
      searchVariables: {} as never,
      setFormValues: vi.fn(),
      setFormValue: vi.fn(),
      updateRouteToSearchPage: vi.fn(),
      resetFormValues: vi.fn(),
    });

    const { result } = renderHook(() => useFormValues());

    expect(result.current.textSearchInput).toBe('skating');
    expect(result.current.selectedSportsCategories).toStrictEqual([
      'ice_skating',
    ]);
    expect(result.current.selectedTargetGroups).toStrictEqual(['children']);
    expect(result.current.selectedAccessibilityProfile).toBe(
      AccessibilityProfile.Wheelchair
    );
  });

  it('returns sportsCategories sorted alphabetically with a mapped label', () => {
    const { result } = renderHook(() => useFormValues());
    const { sportsCategories } = result.current;
    expect(sportsCategories.length).toBeGreaterThan(0);
    sportsCategories.forEach((option) => {
      expect(option.label).toBe(option.text);
    });
    const sortedTexts = [...sportsCategories]
      .map((o) => o.text)
      .sort((a, b) => a.localeCompare(b));
    expect(sportsCategories.map((o) => o.text)).toStrictEqual(sortedTexts);
  });

  it('returns targetGroups with a mapped label', () => {
    const { result } = renderHook(() => useFormValues());
    const { targetGroups } = result.current;
    expect(targetGroups.length).toBeGreaterThan(0);
    targetGroups.forEach((option) => {
      expect(option.label).toBe(option.text);
    });
  });

  it('returns accessibilityProfiles with an EMPTY_OPTION first, sorted alphabetically after', () => {
    const { result } = renderHook(() => useFormValues());
    const { accessibilityProfiles } = result.current;
    expect(accessibilityProfiles[0]).toStrictEqual(EMPTY_OPTION);
    const rest = accessibilityProfiles.slice(1);
    const sortedLabels = [...rest].map((o) => o.label).sort();
    expect(rest.map((o) => o.label)).toStrictEqual(sortedLabels);
  });

  it('allows updating the local state setters', () => {
    const { result } = renderHook(() => useFormValues());

    act(() => {
      result.current.setTextSearchInput('new text');
      result.current.setSelectedSportsCategories(['swimming']);
      result.current.setSportsCategoryInput('sw');
      result.current.setSelectedTargetGroups(['adults']);
      result.current.setSelectedAccessibilityProfile(
        AccessibilityProfile.Rollator
      );
    });

    expect(result.current.textSearchInput).toBe('new text');
    expect(result.current.selectedSportsCategories).toStrictEqual(['swimming']);
    expect(result.current.sportsCategoryInput).toBe('sw');
    expect(result.current.selectedTargetGroups).toStrictEqual(['adults']);
    expect(result.current.selectedAccessibilityProfile).toBe(
      AccessibilityProfile.Rollator
    );
  });

  it('re-initializes state when the context form values change', async () => {
    const { result, rerender } = renderHook(() => useFormValues());

    expect(result.current.textSearchInput).toBe('');

    mockedUseCombinedSearchContext.mockReturnValue({
      formValues: formValues({
        text: 'updated',
        sportsCategories: ['gym'],
        targetGroups: ['seniors'],
        accessibilityProfile: AccessibilityProfile.HearingAid,
      }) as never,
      searchVariables: {} as never,
      setFormValues: vi.fn(),
      setFormValue: vi.fn(),
      updateRouteToSearchPage: vi.fn(),
      resetFormValues: vi.fn(),
    });
    rerender();

    await waitFor(() => {
      expect(result.current.textSearchInput).toBe('updated');
    });
    expect(result.current.selectedSportsCategories).toStrictEqual(['gym']);
    expect(result.current.selectedTargetGroups).toStrictEqual(['seniors']);
    expect(result.current.selectedAccessibilityProfile).toBe(
      AccessibilityProfile.HearingAid
    );
  });
});
