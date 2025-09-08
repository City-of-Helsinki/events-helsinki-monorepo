import { renderHook } from '@testing-library/react';
import router from 'next-router-mock';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import useCanonicalUrl from '../useCanonicalUrl';

// Mock next/router
vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

describe('useCanonicalUrl', () => {
  const origin = 'https://test.hki.fi';
  const originalLocation = window.location;

  beforeEach(() => {
    // Mock window.location.origin
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...originalLocation, origin },
    });
  });

  afterEach(() => {
    // Restore original window.location
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });
  });

  it('should return the canonical URL with a simple path', () => {
    router.locale = 'en';
    router.asPath = '/test-path';
    const { result } = renderHook(() => useCanonicalUrl());
    expect(result.current).toBe(`${origin}/en/test-path`);
  });

  it('should remove trailing slashes from the path', () => {
    router.locale = 'fi';
    router.asPath = '/test-path/';
    const { result } = renderHook(() => useCanonicalUrl());
    expect(result.current).toBe(`${origin}/fi/test-path`);
  });

  it('should handle the root path correctly', () => {
    router.locale = 'sv';
    router.asPath = '/';
    const { result } = renderHook(() => useCanonicalUrl());
    expect(result.current).toBe(`${origin}/sv`);
  });

  it('should strip query parameters from the path', () => {
    router.locale = 'en';
    router.asPath = '/test-path?param=value&another=1';
    const { result } = renderHook(() => useCanonicalUrl());
    expect(result.current).toBe(`${origin}/en/test-path`);
  });

  it('should handle path with trailing slash and query parameters', () => {
    router.locale = 'fi';
    router.asPath = '/test-path/?param=value';
    const { result } = renderHook(() => useCanonicalUrl());
    expect(result.current).toBe(`${origin}/fi/test-path`);
  });

  it('should handle root path with query parameters', () => {
    router.locale = 'en';
    router.asPath = '/?param=value';
    const { result } = renderHook(() => useCanonicalUrl());
    expect(result.current).toBe(`${origin}/en`);
  });
});
