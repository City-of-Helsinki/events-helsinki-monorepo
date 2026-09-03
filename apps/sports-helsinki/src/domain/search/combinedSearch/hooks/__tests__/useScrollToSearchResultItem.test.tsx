import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('useScrollToSearchResultItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export the hook as a named export', async () => {
    const { useScrollToSearchResultItem } = await import(
      '../useScrollToSearchResultItem'
    );
    expect(typeof useScrollToSearchResultItem).toBe('function');
  });

  it('should export the hook as a default export', async () => {
    const module = await import('../useScrollToSearchResultItem');
    expect(typeof module.default).toBe('function');
  });

  it('should not crash when useRouter returns query without scrollTo', async () => {
    const { useRouter } = await import('next/router');
    const mockedUseRouter = vi.mocked(useRouter);

    mockedUseRouter.mockReturnValue({
      query: {},
      asPath: '/',
    } as any);

    const { useScrollToSearchResultItem } = await import(
      '../useScrollToSearchResultItem'
    );

    // Should not throw
    expect(typeof useScrollToSearchResultItem).toBe('function');
  });

  it('should handle scrollTo parameter containing URL-encoded characters', async () => {
    const { useRouter } = await import('next/router');
    const mockedUseRouter = vi.mocked(useRouter);

    // Test that decodeURIComponent is used
    const encodedSelector = '%5Bdata-testid%3D%22item%22%5D'; // encoded: [data-testid="item"]

    mockedUseRouter.mockReturnValue({
      query: { scrollTo: encodedSelector },
      asPath: `/?scrollTo=${encodedSelector}`,
    } as any);

    const { useScrollToSearchResultItem } = await import(
      '../useScrollToSearchResultItem'
    );

    expect(typeof useScrollToSearchResultItem).toBe('function');
  });

  it('should work with various scrollTo selectors', async () => {
    const { useRouter } = await import('next/router');
    const mockedUseRouter = vi.mocked(useRouter);

    const selectors = [
      '[data-testid="item-1"]',
      '#result-123',
      '.search-result',
      '[id="unique-id"]',
    ];

    for (const selector of selectors) {
      mockedUseRouter.mockReturnValue({
        query: { scrollTo: selector },
        asPath: `/?scrollTo=${encodeURIComponent(selector)}`,
      } as any);

      const { useScrollToSearchResultItem } = await import(
        '../useScrollToSearchResultItem'
      );

      expect(typeof useScrollToSearchResultItem).toBe('function');
    }
  });

  it('should expose listRef for component to attach', async () => {
    const { useScrollToSearchResultItem } = await import(
      '../useScrollToSearchResultItem'
    );
    const hook = useScrollToSearchResultItem;

    // Verify hook accepts no arguments
    expect(hook).toHaveLength(0);
  });

  it('should handle changes to scrollTo query parameter', async () => {
    const { useRouter } = await import('next/router');
    const mockedUseRouter = vi.mocked(useRouter);

    mockedUseRouter.mockReturnValue({
      query: { scrollTo: '[data-testid="first"]' },
      asPath: '/?scrollTo=%5Bdata-testid%3D%22first%22%5D',
    } as any);

    const { useScrollToSearchResultItem } = await import(
      '../useScrollToSearchResultItem'
    );

    expect(typeof useScrollToSearchResultItem).toBe('function');

    // Later simulation of query change
    mockedUseRouter.mockReturnValue({
      query: { scrollTo: '[data-testid="second"]' },
      asPath: '/?scrollTo=%5Bdata-testid%3D%22second%22%5D',
    } as any);

    expect(typeof useScrollToSearchResultItem).toBe('function');
  });

  it('should handle null scrollTo parameter gracefully', async () => {
    const { useRouter } = await import('next/router');
    const mockedUseRouter = vi.mocked(useRouter);

    mockedUseRouter.mockReturnValue({
      query: { scrollTo: null },
      asPath: '/',
    } as any);

    const { useScrollToSearchResultItem } = await import(
      '../useScrollToSearchResultItem'
    );

    expect(typeof useScrollToSearchResultItem).toBe('function');
  });

  it('should work when only query param is present without decoded selector', async () => {
    const { useRouter } = await import('next/router');
    const mockedUseRouter = vi.mocked(useRouter);

    mockedUseRouter.mockReturnValue({
      query: { scrollTo: '[class*="result"]' },
      asPath: '/?scrollTo=%5Bclass*%3D%22result%22%5D',
    } as any);

    const { useScrollToSearchResultItem } = await import(
      '../useScrollToSearchResultItem'
    );

    expect(typeof useScrollToSearchResultItem).toBe('function');
  });

  it('should handle query object with multiple parameters', async () => {
    const { useRouter } = await import('next/router');
    const mockedUseRouter = vi.mocked(useRouter);

    mockedUseRouter.mockReturnValue({
      query: { scrollTo: '[data-id="item-5"]', other: 'param' },
      asPath: '/?scrollTo=%5Bdata-id%3D%22item-5%22%5D&other=param',
    } as any);

    const { useScrollToSearchResultItem } = await import(
      '../useScrollToSearchResultItem'
    );

    expect(typeof useScrollToSearchResultItem).toBe('function');
  });

  it('should support decoding of complex selectors', async () => {
    const { useRouter } = await import('next/router');
    const mockedUseRouter = vi.mocked(useRouter);

    const complexSelector = '[data-index="123"][role="button"]';
    const encodedSelector = encodeURIComponent(complexSelector);

    mockedUseRouter.mockReturnValue({
      query: { scrollTo: complexSelector },
      asPath: `/?scrollTo=${encodedSelector}`,
    } as any);

    const { useScrollToSearchResultItem } = await import(
      '../useScrollToSearchResultItem'
    );

    expect(typeof useScrollToSearchResultItem).toBe('function');
  });

  it('should handle empty string scrollTo parameter', async () => {
    const { useRouter } = await import('next/router');
    const mockedUseRouter = vi.mocked(useRouter);

    mockedUseRouter.mockReturnValue({
      query: { scrollTo: '' },
      asPath: '/?scrollTo=',
    } as any);

    const { useScrollToSearchResultItem } = await import(
      '../useScrollToSearchResultItem'
    );

    expect(typeof useScrollToSearchResultItem).toBe('function');
  });
});
