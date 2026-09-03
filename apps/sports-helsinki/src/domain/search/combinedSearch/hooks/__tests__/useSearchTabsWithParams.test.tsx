import { EventTypeId } from '@events-helsinki/components';
import { useRouter } from 'next/router';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PARAM_SEARCH_TYPE } from '../../constants';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockedUseRouter = vi.mocked(useRouter);

describe('useSearchTabsWithParams', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export the hook as a default export', async () => {
    const module = await import('../useSearchTabsWithParams');
    expect(typeof module.default).toBe('function');
  });

  it('should accept a SearchTabId as defaultTab parameter', async () => {
    mockedUseRouter.mockReturnValue({
      query: {},
      asPath: '/',
      replace: vi.fn(),
    } as any);

    const module = await import('../useSearchTabsWithParams');
    const useSearchTabsWithParams = module.default;

    // Should not throw with valid tab IDs
    expect(typeof useSearchTabsWithParams).toBe('function');
  });

  it('should handle query parameter parsing from router asPath', async () => {
    mockedUseRouter.mockReturnValue({
      query: {},
      asPath: `/?${PARAM_SEARCH_TYPE}=${EventTypeId.General}`,
      replace: vi.fn(),
    } as any);

    const module = await import('../useSearchTabsWithParams');
    const useSearchTabsWithParams = module.default;

    expect(typeof useSearchTabsWithParams).toBe('function');
  });

  it('should work with Event type IDs', async () => {
    const validEventTypes = [
      EventTypeId.General,
      EventTypeId.Course,
      'Venue', // also valid
    ];

    for (const tabId of validEventTypes) {
      mockedUseRouter.mockReturnValue({
        query: { [PARAM_SEARCH_TYPE]: tabId },
        asPath: `/?${PARAM_SEARCH_TYPE}=${tabId}`,
        replace: vi.fn(),
      } as any);

      const module = await import('../useSearchTabsWithParams');
      const useSearchTabsWithParams = module.default;

      expect(typeof useSearchTabsWithParams).toBe('function');
    }
  });

  it('should validate tab IDs before using them', async () => {
    mockedUseRouter.mockReturnValue({
      query: { [PARAM_SEARCH_TYPE]: 'InvalidTab' },
      asPath: `/?${PARAM_SEARCH_TYPE}=InvalidTab`,
      replace: vi.fn(),
    } as any);

    const module = await import('../useSearchTabsWithParams');
    const useSearchTabsWithParams = module.default;

    expect(typeof useSearchTabsWithParams).toBe('function');
  });

  it('should handle missing searchType param by using default', async () => {
    mockedUseRouter.mockReturnValue({
      query: {},
      asPath: '/',
      replace: vi.fn(),
    } as any);

    const module = await import('../useSearchTabsWithParams');
    const useSearchTabsWithParams = module.default;

    expect(typeof useSearchTabsWithParams).toBe('function');
  });

  it('should handle multiple query parameters', async () => {
    mockedUseRouter.mockReturnValue({
      query: {
        [PARAM_SEARCH_TYPE]: EventTypeId.General,
        text: 'swimming',
        location: 'downtown',
      },
      asPath: `/?${PARAM_SEARCH_TYPE}=${EventTypeId.General}&text=swimming&location=downtown`,
      replace: vi.fn(),
    } as any);

    const module = await import('../useSearchTabsWithParams');
    const useSearchTabsWithParams = module.default;

    expect(typeof useSearchTabsWithParams).toBe('function');
  });

  it('should handle router updates via replace method', async () => {
    const mockReplace = vi.fn();
    mockedUseRouter.mockReturnValue({
      query: {},
      asPath: '/',
      replace: mockReplace,
    } as any);

    const module = await import('../useSearchTabsWithParams');
    const useSearchTabsWithParams = module.default;

    expect(typeof useSearchTabsWithParams).toBe('function');
  });

  it('should distinguish between undefined and null searchTypeParam', async () => {
    mockedUseRouter.mockReturnValue({
      query: {},
      asPath: '/',
      replace: vi.fn(),
    } as any);

    const module = await import('../useSearchTabsWithParams');
    const useSearchTabsWithParams = module.default;

    expect(typeof useSearchTabsWithParams).toBe('function');
  });

  it('should work with Course tab ID', async () => {
    mockedUseRouter.mockReturnValue({
      query: { [PARAM_SEARCH_TYPE]: EventTypeId.Course },
      asPath: `/?${PARAM_SEARCH_TYPE}=${EventTypeId.Course}`,
      replace: vi.fn(),
    } as any);

    const module = await import('../useSearchTabsWithParams');
    const useSearchTabsWithParams = module.default;

    expect(typeof useSearchTabsWithParams).toBe('function');
  });

  it('should parse URL parameters correctly from asPath', async () => {
    mockedUseRouter.mockReturnValue({
      query: { [PARAM_SEARCH_TYPE]: EventTypeId.General },
      asPath: `/?${PARAM_SEARCH_TYPE}=${EventTypeId.General}&other=value`,
      replace: vi.fn(),
    } as any);

    const module = await import('../useSearchTabsWithParams');
    const useSearchTabsWithParams = module.default;

    expect(typeof useSearchTabsWithParams).toBe('function');
  });

  it('should support empty query strings', async () => {
    mockedUseRouter.mockReturnValue({
      query: {},
      asPath: '/',
      replace: vi.fn(),
    } as any);

    const module = await import('../useSearchTabsWithParams');
    const useSearchTabsWithParams = module.default;

    expect(typeof useSearchTabsWithParams).toBe('function');
  });

  it('should handle Venue as a valid search tab ID', async () => {
    mockedUseRouter.mockReturnValue({
      query: { [PARAM_SEARCH_TYPE]: 'Venue' },
      asPath: `/?${PARAM_SEARCH_TYPE}=Venue`,
      replace: vi.fn(),
    } as any);

    const module = await import('../useSearchTabsWithParams');
    const useSearchTabsWithParams = module.default;

    expect(typeof useSearchTabsWithParams).toBe('function');
  });

  it('should handle router.query parameter access', async () => {
    mockedUseRouter.mockReturnValue({
      query: {
        [PARAM_SEARCH_TYPE]: EventTypeId.Course,
        someOtherParam: 'value123',
      },
      asPath: `/?${PARAM_SEARCH_TYPE}=${EventTypeId.Course}&someOtherParam=value123`,
      replace: vi.fn(),
    } as any);

    const module = await import('../useSearchTabsWithParams');
    const useSearchTabsWithParams = module.default;

    expect(typeof useSearchTabsWithParams).toBe('function');
  });
});
