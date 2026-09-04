import type * as EventsHelsinkiComponents from '@events-helsinki/components';
import { AccessibilityProfile } from '@events-helsinki/components';
import type { Option } from 'hds-react';
import { act, renderHook, waitFor } from '@/test-utils';
import type * as CombinedSearchContextModule from '../../domain/search/combinedSearch/adapters/CombinedSearchContext';
import { useCombinedSearchContext } from '../../domain/search/combinedSearch/adapters/CombinedSearchContext';
import useHandleUnifiedSearchOrderChange from '../useHandleUnifiedSearchOrderChange';

const useGeolocationMock = vi.fn();

vi.mock('@events-helsinki/components', async (importOriginal) => {
  const actual = await importOriginal<typeof EventsHelsinkiComponents>();
  return {
    ...actual,
    useGeolocation: () => useGeolocationMock(),
  };
});

vi.mock(
  '../../domain/search/combinedSearch/adapters/CombinedSearchContext',
  async () => {
    const actual = await vi.importActual<typeof CombinedSearchContextModule>(
      '../../domain/search/combinedSearch/adapters/CombinedSearchContext'
    );
    return {
      ...actual,
      useCombinedSearchContext: vi.fn(actual.useCombinedSearchContext),
    };
  }
);

const mockedUseCombinedSearchContext = vi.mocked(useCombinedSearchContext);

const option = (value: string): Option => ({
  label: value,
  value,
  selected: false,
  isGroupLabel: false,
  visible: true,
  disabled: false,
});

describe('useHandleUnifiedSearchOrderChange', () => {
  const setFormValues = vi.fn();
  const updateRouteToSearchPage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseCombinedSearchContext.mockReturnValue({
      formValues: { accessibilityProfile: undefined } as never,
      searchVariables: {} as never,
      setFormValues,
      setFormValue: vi.fn(),
      updateRouteToSearchPage,
      resetFormValues: vi.fn(),
    });
    useGeolocationMock.mockReturnValue({
      coordinates: null,
      loading: false,
      called: false,
      resolve: vi.fn(),
    });
  });

  it('sets the venueOrderBy directly for an accessibility profile option', async () => {
    const { result } = renderHook(() => useHandleUnifiedSearchOrderChange());

    await act(async () => {
      result.current([], option(AccessibilityProfile.Wheelchair));
    });

    await waitFor(() => {
      expect(setFormValues).toHaveBeenCalledWith({
        venueOrderBy: AccessibilityProfile.Wheelchair,
      });
    });
    expect(updateRouteToSearchPage).toHaveBeenCalledWith({ shallow: true });
  });

  it('sets the ascending venueOrderBy for a non-accessibility, non-distance option', async () => {
    const { result } = renderHook(() => useHandleUnifiedSearchOrderChange());

    await act(async () => {
      result.current([], option('name-asc'));
    });

    await waitFor(() => {
      expect(setFormValues).toHaveBeenCalledWith({ venueOrderBy: 'name' });
    });
    expect(updateRouteToSearchPage).toHaveBeenCalledWith({ shallow: true });
  });

  it('sets the descending venueOrderBy prefixed with "-" when orderDir is desc', async () => {
    const { result } = renderHook(() => useHandleUnifiedSearchOrderChange());

    await act(async () => {
      result.current([], option('name-desc'));
    });

    await waitFor(() => {
      expect(setFormValues).toHaveBeenCalledWith({ venueOrderBy: '-name' });
    });
  });

  it('uses already-resolved geolocation coordinates for the distance order', async () => {
    useGeolocationMock.mockReturnValue({
      coordinates: { lat: 1, lon: 2 },
      loading: false,
      called: true,
      resolve: vi.fn(),
    });
    const { result } = renderHook(() => useHandleUnifiedSearchOrderChange());

    await act(async () => {
      result.current([], option('distance-asc'));
    });

    await waitFor(() => {
      expect(setFormValues).toHaveBeenCalledWith({
        venueOrderBy: 'distance',
      });
    });
    expect(updateRouteToSearchPage).toHaveBeenCalledWith({ shallow: true });
  });

  it('resolves geolocation when not yet called for the distance order', async () => {
    const resolve = vi.fn().mockResolvedValue({ lat: 1, lon: 2 });
    useGeolocationMock.mockReturnValue({
      coordinates: null,
      loading: false,
      called: false,
      resolve,
    });
    const { result } = renderHook(() => useHandleUnifiedSearchOrderChange());

    await act(async () => {
      result.current([], option('distance-desc'));
    });

    expect(resolve).toHaveBeenCalled();
    await waitFor(() => {
      expect(setFormValues).toHaveBeenCalledWith({
        venueOrderBy: '-distance',
      });
    });
  });

  it('does nothing when geolocation resolve rejects', async () => {
    const resolve = vi.fn().mockRejectedValue(new Error('denied'));
    useGeolocationMock.mockReturnValue({
      coordinates: null,
      loading: false,
      called: false,
      resolve,
    });
    const { result } = renderHook(() => useHandleUnifiedSearchOrderChange());

    await act(async () => {
      result.current([], option('distance-asc'));
    });

    await waitFor(() => {
      expect(resolve).toHaveBeenCalled();
    });
    expect(setFormValues).not.toHaveBeenCalled();
    expect(updateRouteToSearchPage).not.toHaveBeenCalled();
  });

  it('does nothing when geolocation resolves with a null location', async () => {
    const resolve = vi.fn().mockResolvedValue(null);
    useGeolocationMock.mockReturnValue({
      coordinates: null,
      loading: false,
      called: false,
      resolve,
    });
    const { result } = renderHook(() => useHandleUnifiedSearchOrderChange());

    await act(async () => {
      result.current([], option('distance-asc'));
    });

    await waitFor(() => {
      expect(resolve).toHaveBeenCalled();
    });
    expect(setFormValues).not.toHaveBeenCalled();
    expect(updateRouteToSearchPage).not.toHaveBeenCalled();
  });
});
