import { act, renderHook } from '@testing-library/react';
import React from 'react';

import useShouldShowAppBackArrow from '../useShouldShowAppBackArrow';

// JSDOM doesn't implement PerformanceNavigationTiming, so we need to mock it.
class MockPerformanceNavigationTiming {
  readonly type: PerformanceNavigationTiming['type'];
  readonly entryType = 'navigation' as const;
  readonly name = '';
  readonly startTime = 0;
  readonly duration = 0;
  readonly initiatorType = 'navigation' as const;
  readonly nextHopProtocol = '';
  readonly workerStart = 0;
  readonly redirectStart = 0;
  readonly redirectEnd = 0;
  readonly fetchStart = 0;
  readonly domainLookupStart = 0;
  readonly domainLookupEnd = 0;
  readonly connectStart = 0;
  readonly connectEnd = 0;
  readonly secureConnectionStart = 0;
  readonly requestStart = 0;
  readonly responseStart = 0;
  readonly responseEnd = 0;
  readonly transferSize = 0;
  readonly encodedBodySize = 0;
  readonly decodedBodySize = 0;
  readonly serverTiming = [];
  readonly unloadEventStart = 0;
  readonly unloadEventEnd = 0;
  readonly domInteractive = 0;
  readonly domContentLoadedEventStart = 0;
  readonly domContentLoadedEventEnd = 0;
  readonly domComplete = 0;
  readonly loadEventStart = 0;
  readonly loadEventEnd = 0;
  toJSON = () => ({});

  constructor(type: PerformanceNavigationTiming['type']) {
    this.type = type;
  }
}

const mockPerformanceNavigationTiming = (
  type: PerformanceNavigationTiming['type']
) => {
  vi.spyOn(performance, 'getEntriesByType').mockReturnValue([
    new MockPerformanceNavigationTiming(type),
  ] as any);
};

describe('useShouldShowAppBackArrow', () => {
  const originalReferrer = document.referrer;
  const originalLocation = window.location;

  beforeEach(() => {
    // Mock window.location.origin
    vi.stubGlobal('location', {
      ...originalLocation,
      origin: 'http://localhost:3000',
    });
    vi.stubGlobal(
      'PerformanceNavigationTiming',
      MockPerformanceNavigationTiming
    );
  });

  afterEach(() => {
    // Restore mocks
    vi.unstubAllGlobals();
    Object.defineProperty(document, 'referrer', {
      value: originalReferrer,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  it('should return false on initial render (SSR safety)', () => {
    // For this specific test, we want to prevent the useEffect from running
    // to accurately test the initial state before any client-side effects.
    const useEffectSpy = vi
      .spyOn(React, 'useEffect')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useShouldShowAppBackArrow());

    expect(result.current).toBe(false);

    useEffectSpy.mockRestore();
  });

  it('should return true for client-side navigation', () => {
    // 'push' is not a valid type, client-side nav is not a 'full page load'
    mockPerformanceNavigationTiming('back_forward'); // or 'reload'
    const { result } = renderHook(() => useShouldShowAppBackArrow());
    act(() => {
      // The effect runs here
    });
    expect(result.current).toBe(true);
  });

  it('should return true for page reloads', () => {
    mockPerformanceNavigationTiming('reload');
    const { result } = renderHook(() => useShouldShowAppBackArrow());
    act(() => {});
    expect(result.current).toBe(true);
  });

  it('should return false for a full page load from an external referrer', () => {
    mockPerformanceNavigationTiming('navigate');
    Object.defineProperty(document, 'referrer', {
      value: 'https://www.google.com',
      configurable: true,
    });

    const { result } = renderHook(() => useShouldShowAppBackArrow());
    act(() => {});
    expect(result.current).toBe(false);
  });

  it('should return true for a full page load from an internal referrer', () => {
    mockPerformanceNavigationTiming('navigate');
    Object.defineProperty(document, 'referrer', {
      value: 'http://localhost:3000/previous-page',
      configurable: true,
    });

    const { result } = renderHook(() => useShouldShowAppBackArrow());
    act(() => {});
    expect(result.current).toBe(true);
  });

  it('should return true for a direct navigation (e.g., bookmark or typed URL)', () => {
    mockPerformanceNavigationTiming('navigate');
    Object.defineProperty(document, 'referrer', {
      value: '',
      configurable: true,
    });

    const { result } = renderHook(() => useShouldShowAppBackArrow());
    act(() => {});
    expect(result.current).toBe(true);
  });

  it('should return true if PerformanceNavigationTiming API is not available', () => {
    vi.spyOn(performance, 'getEntriesByType').mockReturnValue([]);
    const { result } = renderHook(() => useShouldShowAppBackArrow());
    act(() => {});
    expect(result.current).toBe(true);
  });
});
