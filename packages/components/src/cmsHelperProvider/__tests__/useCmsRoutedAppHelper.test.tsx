import type { ParsedUrlQueryInput } from 'querystring';
import { renderHook } from '@testing-library/react';
import type { NextRouter } from 'next/router';
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import type { CmsRoutedAppHelper } from '../../utils';
import CmsHelperProvider from '../CmsHelperProvider';
import useCmsRoutedAppHelper from '../useCmsRoutedAppHelper';

// Mock the CmsRoutedAppHelper for testing purposes.
// You can expand this with the actual methods and properties of the helper.
const mockCmsRoutedAppHelper: CmsRoutedAppHelper = {
  getLocalizedCmsItemUrl: vi.fn(),
  i18nRoutes: {},
  locales: [] as unknown as readonly ('en' | 'fi' | 'sv')[],
  URLRewriteMapping: {},
  transformDynamicPathIntoSegmentedDynamicPath: function (
    path: string
  ): string {
    throw new Error('Function not implemented.');
  },
  getI18nPath: function (_route: string, _locale: unknown): string {
    throw new Error('Function not implemented.');
  },
  removeQueryParamsFromRouter: function (
    _router: NextRouter,
    _removeList: string[] | undefined,
    _forwardPath: string
  ): void {
    throw new Error('Function not implemented.');
  },
  getParsedUrlQueryInput: function (_search: string): ParsedUrlQueryInput {
    throw new Error('Function not implemented.');
  },
  rewriteInternalURLs: function (
    _apolloResponseData: Record<string, unknown>
  ): typeof JSON.parse {
    throw new Error('Function not implemented.');
  },
};

describe('useCmsRoutedAppHelper', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw an error when used outside of CmsRoutedApiHelperProvider', () => {
    // Suppress console.error output from React for this expected error
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useCmsRoutedAppHelper())).toThrow(
      'CmsHelper-utility cannot be used outside the CmsHelperprovider'
    );
  });

  it('should throw an error if routerHelper is not provided in the context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CmsHelperProvider>{children}</CmsHelperProvider>
    );
    // Suppress console.error output from React for this expected error
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      renderHook(() => useCmsRoutedAppHelper(), { wrapper })
    ).toThrow(
      'The routerHelper should be defined in the CmsHelperContext, but is currently undefined.'
    );
  });

  it('should return the routerHelper when it is provided in the context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CmsHelperProvider routerHelper={mockCmsRoutedAppHelper}>
        {children}
      </CmsHelperProvider>
    );

    const { result } = renderHook(() => useCmsRoutedAppHelper(), { wrapper });

    expect(result.current).toBe(mockCmsRoutedAppHelper);
  });
});
