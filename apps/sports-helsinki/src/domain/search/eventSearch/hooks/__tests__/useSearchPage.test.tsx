import type * as EventsHelsinkiComponents from '@events-helsinki/components';
import { EventTypeId } from '@events-helsinki/components';
import Router from 'next/router';
import mockRouter from 'next-router-mock';
import React from 'react';
import type * as ReactToastify from 'react-toastify';
import { toast } from 'react-toastify';
import { act, renderHook, waitFor } from '@/test-utils';
import TestProviders from '../../../../../../config/vitest/TestProviders';
import type * as CombinedSearchContextModule from '../../../combinedSearch/adapters/CombinedSearchContext';
import { useCombinedSearchContext } from '../../../combinedSearch/adapters/CombinedSearchContext';
import useSearchPage from '../useSearchPage';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TestProviders router={Router}>{children}</TestProviders>
);

const fetchMore = vi.fn().mockResolvedValue({});
const useEventListQueryMock = vi.fn();

vi.mock('@events-helsinki/components', async (importOriginal) => {
  const actual = await importOriginal<typeof EventsHelsinkiComponents>();
  return {
    ...actual,
    useEventListQuery: (...args: unknown[]) => useEventListQueryMock(...args),
  };
});

vi.mock('react-toastify', async (importOriginal) => {
  const actual = await importOriginal<typeof ReactToastify>();
  return {
    ...actual,
    toast: { ...actual.toast, error: vi.fn() },
  };
});

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

const eventData = (next: string | null = null) => ({
  eventList: {
    meta: { count: 2, next, previous: null },
    data: [],
  },
});

describe('eventSearch useSearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchMore.mockResolvedValue({});
    useEventListQueryMock.mockReturnValue({
      data: eventData(),
      loading: false,
      fetchMore,
    });
    mockedUseCombinedSearchContext.mockReturnValue({
      formValues: {} as never,
      searchVariables: {
        event: { eventType: EventTypeId.General } as never,
        course: { eventType: EventTypeId.Course } as never,
        venue: {} as never,
      },
      setFormValues: vi.fn(),
      setFormValue: vi.fn(),
      updateRouteToSearchPage: vi.fn(),
      resetFormValues: vi.fn(),
    });
    mockRouter.setCurrentUrl('/');
  });

  it('returns the initial loading state and result list', () => {
    const { result } = renderHook(
      () => useSearchPage({ eventType: EventTypeId.General }),
      { wrapper }
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.count).toBe(2);
    expect(result.current.hasNext).toBe(false);
    expect(result.current.isFetchingMore).toBe(false);
  });

  it('uses the course search variables when eventType is Course', () => {
    renderHook(() => useSearchPage({ eventType: EventTypeId.Course }), {
      wrapper,
    });
    expect(useEventListQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: expect.objectContaining({ eventType: EventTypeId.Course }),
      })
    );
  });

  it('uses the event search variables when eventType is not Course', () => {
    renderHook(() => useSearchPage({ eventType: EventTypeId.General }), {
      wrapper,
    });
    expect(useEventListQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: expect.objectContaining({ eventType: EventTypeId.General }),
      })
    );
  });

  it('handleLoadMore fetches the next page and toggles isFetchingMore', async () => {
    useEventListQueryMock.mockReturnValue({
      data: eventData('https://example.com/events?page=2'),
      loading: false,
      fetchMore,
    });
    const { result } = renderHook(
      () => useSearchPage({ eventType: EventTypeId.General }),
      { wrapper }
    );

    expect(result.current.hasNext).toBe(true);

    await act(async () => {
      await result.current.handleLoadMore();
    });

    expect(fetchMore).toHaveBeenCalledWith({ variables: { page: 2 } });
  });

  it('handleLoadMore does nothing when there is no next page', async () => {
    const { result } = renderHook(
      () => useSearchPage({ eventType: EventTypeId.General }),
      { wrapper }
    );

    await act(async () => {
      await result.current.handleLoadMore();
    });

    expect(fetchMore).not.toHaveBeenCalled();
  });

  it('handleLoadMore shows a toast error when fetchMore rejects', async () => {
    fetchMore.mockRejectedValueOnce(new Error('network error'));
    useEventListQueryMock.mockReturnValue({
      data: eventData('https://example.com/events?page=2'),
      loading: false,
      fetchMore,
    });
    const { result } = renderHook(
      () => useSearchPage({ eventType: EventTypeId.General }),
      { wrapper }
    );

    await act(async () => {
      await result.current.handleLoadMore();
    });

    expect(toast.error).toHaveBeenCalled();
  });

  it('scrollToResultList triggers scrolling only on small screens', () => {
    const { result } = renderHook(
      () => useSearchPage({ eventType: EventTypeId.General }),
      { wrapper }
    );
    expect(() => result.current.scrollToResultList()).not.toThrow();
  });

  it('scrollToResultCard scrolls to the given id', () => {
    const { result } = renderHook(
      () => useSearchPage({ eventType: EventTypeId.General }),
      { wrapper }
    );
    expect(() => result.current.scrollToResultCard('event-1')).not.toThrow();
  });

  it('initialPageOnLoad scrolls to the result list when scrollToResults param is present', () => {
    mockRouter.setCurrentUrl('/search?scrollToResults=true');
    const { result } = renderHook(
      () => useSearchPage({ eventType: EventTypeId.General }),
      { wrapper }
    );
    expect(() => result.current.initialPageOnLoad()).not.toThrow();
  });

  it('initialPageOnLoad scrolls to the result card and cleans the eventId param', async () => {
    mockRouter.setCurrentUrl('/search?eventId=event-1');
    const { result } = renderHook(
      () => useSearchPage({ eventType: EventTypeId.General }),
      { wrapper }
    );
    act(() => {
      result.current.initialPageOnLoad();
    });
    await waitFor(() => {
      expect(mockRouter.query.eventId).toBeUndefined();
    });
  });

  it('initialPageOnLoad does nothing when neither param is present', () => {
    mockRouter.setCurrentUrl('/search');
    const { result } = renderHook(
      () => useSearchPage({ eventType: EventTypeId.General }),
      { wrapper }
    );
    expect(() => result.current.initialPageOnLoad()).not.toThrow();
  });
});
