import Router from 'next/router';
import mockRouter from 'next-router-mock';
import React from 'react';
import type * as ReactToastify from 'react-toastify';
import { toast } from 'react-toastify';
import { act, renderHook, waitFor } from '@/test-utils';
import TestProviders from '../../../../../../config/vitest/TestProviders';
import useSearchPage from '../useSearchPage';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TestProviders router={Router}>{children}</TestProviders>
);

const fetchMore = vi.fn().mockResolvedValue({});
const mockUnifiedSearchListQuery = vi.fn();

vi.mock('../../../../unifiedSearch/useUnifiedSearchListQuery', () => ({
  default: (...args: unknown[]) => mockUnifiedSearchListQuery(...args),
}));

vi.mock('react-toastify', async (importOriginal) => {
  const actual = await importOriginal<typeof ReactToastify>();
  return {
    ...actual,
    toast: { ...actual.toast, error: vi.fn() },
  };
});

const venuesData = (hasNextPage = false, endCursor: string | null = null) => ({
  unifiedSearch: {
    count: 3,
    pageInfo: { hasNextPage, endCursor },
    edges: [
      { node: { venue: { id: 'venue-1', name: 'Venue one' } } },
      { node: { venue: null } },
    ],
  },
});

describe('venueSearch useSearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchMore.mockResolvedValue({});
    mockUnifiedSearchListQuery.mockReturnValue({
      data: venuesData(),
      loading: false,
      fetchMore,
    });
    mockRouter.setCurrentUrl('/');
  });

  it('returns the initial loading state and normalizes the venue list', () => {
    const { result } = renderHook(() => useSearchPage(), { wrapper });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.count).toBe(3);
    expect(result.current.hasNext).toBe(false);
    expect(result.current.isFetchingMore).toBe(false);
    // The edge with a null venue node should be filtered out
    expect(result.current.resultList).toStrictEqual([
      { id: 'venue-1', name: 'Venue one' },
    ]);
  });

  it('handleLoadMore fetches more with the pagination cursor', async () => {
    mockUnifiedSearchListQuery.mockReturnValue({
      data: venuesData(true, 'cursor-1'),
      loading: false,
      fetchMore,
    });
    const { result } = renderHook(() => useSearchPage(), { wrapper });

    expect(result.current.hasNext).toBe(true);

    await act(async () => {
      await result.current.handleLoadMore();
    });

    expect(fetchMore).toHaveBeenCalledWith({
      first: 25,
      after: 'cursor-1',
    });
  });

  it('handleLoadMore shows a toast error when fetchMore rejects', async () => {
    fetchMore.mockRejectedValueOnce(new Error('network error'));
    const { result } = renderHook(() => useSearchPage(), { wrapper });

    await act(async () => {
      await result.current.handleLoadMore();
    });

    expect(toast.error).toHaveBeenCalled();
  });

  it('scrollToResultList and scrollToResultCard do not throw', () => {
    const { result } = renderHook(() => useSearchPage(), { wrapper });
    expect(() => result.current.scrollToResultList()).not.toThrow();
    expect(() => result.current.scrollToResultCard('venue-1')).not.toThrow();
  });

  it('initialPageOnLoad scrolls to the result list when scrollToResults param is present', () => {
    mockRouter.setCurrentUrl('/search?scrollToResults=true');
    const { result } = renderHook(() => useSearchPage(), { wrapper });
    expect(() => result.current.initialPageOnLoad()).not.toThrow();
  });

  it('initialPageOnLoad scrolls to the result card and cleans the venueId param', async () => {
    mockRouter.setCurrentUrl('/search?venueId=venue-1');
    const { result } = renderHook(() => useSearchPage(), { wrapper });
    act(() => {
      result.current.initialPageOnLoad();
    });
    await waitFor(() => {
      expect(mockRouter.query.venueId).toBeUndefined();
    });
  });

  it('initialPageOnLoad does nothing when neither param is present', () => {
    mockRouter.setCurrentUrl('/search');
    const { result } = renderHook(() => useSearchPage(), { wrapper });
    expect(() => result.current.initialPageOnLoad()).not.toThrow();
  });

  it('returns an empty result list when there is no data', () => {
    mockUnifiedSearchListQuery.mockReturnValue({
      data: undefined,
      loading: true,
      fetchMore,
    });
    const { result } = renderHook(() => useSearchPage(), { wrapper });
    expect(result.current.resultList).toStrictEqual([]);
    expect(result.current.count).toBe(0);
    expect(result.current.hasNext).toBe(false);
    expect(result.current.isLoading).toBe(true);
  });
});
