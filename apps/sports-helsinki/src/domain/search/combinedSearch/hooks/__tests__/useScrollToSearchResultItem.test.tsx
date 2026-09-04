import { renderHook } from '@/test-utils';
import { useScrollToSearchResultItem } from '../useScrollToSearchResultItem';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('useScrollToSearchResultItem', () => {
  let scrollIntoViewSpy: ReturnType<typeof vi.fn>;
  let querySelectorSpy: ReturnType<typeof vi.spyOn>;
  let decodeURIComponentSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    vi.clearAllMocks();

    const { useRouter } = await import('next/router');
    vi.mocked(useRouter).mockReturnValue({
      query: {},
      asPath: '/',
    } as any);

    scrollIntoViewSpy = vi.fn();
    Element.prototype.scrollIntoView =
      scrollIntoViewSpy as unknown as typeof Element.prototype.scrollIntoView;
    querySelectorSpy = vi.spyOn(Element.prototype, 'querySelector');
    decodeURIComponentSpy = vi.spyOn(global, 'decodeURIComponent');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not attempt to scroll when there is no scrollTo query param', async () => {
    const { useRouter } = await import('next/router');
    vi.mocked(useRouter).mockReturnValue({
      query: {},
      asPath: '/',
    } as any);

    renderHook(() => useScrollToSearchResultItem());

    expect(decodeURIComponentSpy).not.toHaveBeenCalled();
    expect(querySelectorSpy).not.toHaveBeenCalled();
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('does not attempt to scroll when scrollTo query param is null', async () => {
    const { useRouter } = await import('next/router');
    vi.mocked(useRouter).mockReturnValue({
      query: { scrollTo: null },
      asPath: '/',
    } as any);

    renderHook(() => useScrollToSearchResultItem());

    expect(querySelectorSpy).not.toHaveBeenCalled();
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('does not attempt to scroll when scrollTo query param is an empty string', async () => {
    const { useRouter } = await import('next/router');
    vi.mocked(useRouter).mockReturnValue({
      query: { scrollTo: '' },
      asPath: '/?scrollTo=',
    } as any);

    renderHook(() => useScrollToSearchResultItem());

    expect(querySelectorSpy).not.toHaveBeenCalled();
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  // NOTE: the hook's `listRef` is never attached to a rendered DOM element
  // anywhere in the app (it is a local ref that isn't returned by the hook),
  // so `listElement?.querySelector(...)` always short-circuits on `null` and
  // the decode/query/scroll pipeline never actually runs today. These tests
  // pin down that real, current behaviour rather than the hook's intent, and
  // should be revisited if/when the ref-wiring bug is fixed separately.
  it.each([
    '[data-testid="item-1"]',
    '#result-123',
    '.search-result',
    '%5Bdata-testid%3D%22item%22%5D',
  ])(
    'does not throw and does not invoke decode/query/scroll for scrollTo=%s given the unattached listRef',
    async (scrollTo) => {
      const { useRouter } = await import('next/router');
      vi.mocked(useRouter).mockReturnValue({
        query: { scrollTo },
        asPath: `/?scrollTo=${scrollTo}`,
      } as any);

      expect(() =>
        renderHook(() => useScrollToSearchResultItem())
      ).not.toThrow();

      expect(decodeURIComponentSpy).not.toHaveBeenCalled();
      expect(querySelectorSpy).not.toHaveBeenCalled();
      expect(scrollIntoViewSpy).not.toHaveBeenCalled();
    }
  );

  it('re-runs the effect without throwing when the scrollTo query param changes across rerenders', async () => {
    const { useRouter } = await import('next/router');
    const mockedUseRouter = vi.mocked(useRouter);

    mockedUseRouter.mockReturnValue({
      query: { scrollTo: '[data-testid="first"]' },
      asPath: '/?scrollTo=%5Bdata-testid%3D%22first%22%5D',
    } as any);

    const { rerender } = renderHook(() => useScrollToSearchResultItem());

    mockedUseRouter.mockReturnValue({
      query: { scrollTo: '[data-testid="second"]' },
      asPath: '/?scrollTo=%5Bdata-testid%3D%22second%22%5D',
    } as any);

    expect(() => rerender()).not.toThrow();
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });
});
