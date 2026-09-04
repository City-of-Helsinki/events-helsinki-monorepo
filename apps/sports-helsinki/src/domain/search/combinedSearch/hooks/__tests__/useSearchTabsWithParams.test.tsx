import { EventTypeId } from '@events-helsinki/components';
import { useRouter } from 'next/router';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@/test-utils';
import { PARAM_SEARCH_TYPE } from '../../constants';
import useSearchTabsWithParams from '../useSearchTabsWithParams';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockedUseRouter = vi.mocked(useRouter);

const createMockRouter = (overrides = {}) => ({
  query: {},
  asPath: '/',
  replace: vi.fn(),
  ...overrides,
});

describe('useSearchTabsWithParams', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initTab from valid searchType URL parameter', () => {
    mockedUseRouter.mockReturnValue(
      createMockRouter({
        asPath: `/?${PARAM_SEARCH_TYPE}=${EventTypeId.General}`,
        query: { [PARAM_SEARCH_TYPE]: EventTypeId.General },
      }) as any
    );

    const { result } = renderHook(() =>
      useSearchTabsWithParams(EventTypeId.Course)
    );

    expect(result.current.initTab).toBe(EventTypeId.General);
    expect(result.current.searchTypeParam).toBe(EventTypeId.General);
  });

  it('should use defaultTab when searchType param is missing from URL', async () => {
    const mockReplace = vi.fn();
    mockedUseRouter.mockReturnValue(
      createMockRouter({
        asPath: '/',
        query: {},
        replace: mockReplace,
      }) as any
    );

    const { result } = renderHook(() =>
      useSearchTabsWithParams(EventTypeId.Course)
    );

    expect(result.current.initTab).toBe(EventTypeId.Course);
    expect(result.current.searchTypeParam).toBeNull();

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        { query: { [PARAM_SEARCH_TYPE]: EventTypeId.Course } },
        undefined,
        { shallow: true }
      );
    });
  });

  it('should replace router when searchTypeParam is invalid', async () => {
    const mockReplace = vi.fn();
    mockedUseRouter.mockReturnValue(
      createMockRouter({
        asPath: `/?${PARAM_SEARCH_TYPE}=InvalidTab`,
        query: { [PARAM_SEARCH_TYPE]: 'InvalidTab' },
        replace: mockReplace,
      }) as any
    );

    const { result } = renderHook(() =>
      useSearchTabsWithParams(EventTypeId.General)
    );

    // initTab reflects the URL param as-is (cast to SearchTabId)
    expect(result.current.searchTypeParam).toBe('InvalidTab');

    // But the effect triggers and corrects the router
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        { query: { [PARAM_SEARCH_TYPE]: EventTypeId.General } },
        undefined,
        { shallow: true }
      );
    });
  });

  it('should handle valid Venue tab ID', () => {
    mockedUseRouter.mockReturnValue(
      createMockRouter({
        asPath: `/?${PARAM_SEARCH_TYPE}=Venue`,
        query: { [PARAM_SEARCH_TYPE]: 'Venue' },
      }) as any
    );

    const { result } = renderHook(() =>
      useSearchTabsWithParams(EventTypeId.General)
    );

    expect(result.current.initTab).toBe('Venue');
    expect(result.current.searchTypeParam).toBe('Venue');
  });

  it('should handle Course tab ID', () => {
    mockedUseRouter.mockReturnValue(
      createMockRouter({
        asPath: `/?${PARAM_SEARCH_TYPE}=${EventTypeId.Course}`,
        query: { [PARAM_SEARCH_TYPE]: EventTypeId.Course },
      }) as any
    );

    const { result } = renderHook(() =>
      useSearchTabsWithParams(EventTypeId.General)
    );

    expect(result.current.initTab).toBe(EventTypeId.Course);
    expect(result.current.searchTypeParam).toBe(EventTypeId.Course);
  });

  it('should parse URL parameters correctly from asPath with multiple query params', () => {
    mockedUseRouter.mockReturnValue(
      createMockRouter({
        asPath: `/?${PARAM_SEARCH_TYPE}=${EventTypeId.General}&text=swimming&location=downtown`,
        query: {
          [PARAM_SEARCH_TYPE]: EventTypeId.General,
          text: 'swimming',
          location: 'downtown',
        },
      }) as any
    );

    const { result } = renderHook(() =>
      useSearchTabsWithParams(EventTypeId.Course)
    );

    expect(result.current.initTab).toBe(EventTypeId.General);
    expect(result.current.searchTypeParam).toBe(EventTypeId.General);
  });

  it('should not call replace when searchTypeParam is already valid', () => {
    const mockReplace = vi.fn();
    mockedUseRouter.mockReturnValue(
      createMockRouter({
        asPath: `/?${PARAM_SEARCH_TYPE}=${EventTypeId.Course}`,
        query: { [PARAM_SEARCH_TYPE]: EventTypeId.Course },
        replace: mockReplace,
      }) as any
    );

    renderHook(() => useSearchTabsWithParams(EventTypeId.Course));

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('should handle empty query string with default tab fallback', async () => {
    const mockReplace = vi.fn();
    mockedUseRouter.mockReturnValue(
      createMockRouter({
        asPath: '/',
        query: {},
        replace: mockReplace,
      }) as any
    );

    const { result } = renderHook(() =>
      useSearchTabsWithParams('Venue' as const)
    );

    expect(result.current.initTab).toBe('Venue');

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        { query: { [PARAM_SEARCH_TYPE]: 'Venue' } },
        undefined,
        { shallow: true }
      );
    });
  });

  it('should handle effect re-run when defaultTab changes', async () => {
    const mockReplace = vi.fn();
    const routerMock = createMockRouter({
      asPath: '/',
      query: {},
      replace: mockReplace,
    });

    mockedUseRouter.mockReturnValue(routerMock as any);

    const { rerender } = renderHook(
      ({ defaultTab }) => useSearchTabsWithParams(defaultTab),
      {
        initialProps: { defaultTab: EventTypeId.General },
      }
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        { query: { [PARAM_SEARCH_TYPE]: EventTypeId.General } },
        undefined,
        { shallow: true }
      );
    });

    vi.clearAllMocks();

    act(() => {
      rerender({ defaultTab: EventTypeId.Course });
    });

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        { query: { [PARAM_SEARCH_TYPE]: EventTypeId.Course } },
        undefined,
        { shallow: true }
      );
    });
  });
});
