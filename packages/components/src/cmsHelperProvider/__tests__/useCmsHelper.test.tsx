import { renderHook } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import type { HeadlessCMSHelper } from '../../utils';
import CmsHelperProvider from '../CmsHelperProvider';
import useCmsHelper from '../useCmsHelper';

// Mock the HeadlessCMSHelper for testing purposes.
const mockCmsHelper: HeadlessCMSHelper = {
  getArticlePageCardProps: vi.fn(),
  getCmsPageCardProps: vi.fn(),
  getGeneralCollectionCards: vi.fn(),
  getUriID: vi.fn(),
  removeInternalDoublePrefix: vi.fn(),
  removeContextPathFromUri: vi.fn(),
  stripLocaleFromUri: vi.fn(),
  getDefaultCollections: vi.fn(),
  getSlugFromUri: vi.fn(),
  withArticleArchiveBreadcrumb: vi.fn(),
  withCurrentPageBreadcrumb: vi.fn(),
  removeLeadingZeros: vi.fn(),
  uriToBreadcrumbs: vi.fn(),
  cmsArticlesContextPath: '',
  cmsPagesContextPath: '',
  dateFormat: '',
  ArticleDetails: () => null,
  slugsToUriSegments: function (_slugs: string[]): string[] {
    throw new Error('Function not implemented.');
  },
};

describe('useCmsHelper', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw an error when used outside of CmsHelperProvider', () => {
    // Suppress console.error output from React for this expected error
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useCmsHelper())).toThrow(
      'CmsHelper-utility cannot be used outside the CmsHelperprovider'
    );
  });

  it('should throw an error if cmsHelper is not provided in the context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CmsHelperProvider>{children}</CmsHelperProvider>
    );
    // Suppress console.error output from React for this expected error
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useCmsHelper(), { wrapper })).toThrow(
      'The cmsHelper should be defined in the CmsHelperContext, but is currently undefined.'
    );
  });

  it('should return the cmsHelper when it is provided in the context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CmsHelperProvider cmsHelper={mockCmsHelper}>
        {children}
      </CmsHelperProvider>
    );

    const { result } = renderHook(() => useCmsHelper(), { wrapper });

    expect(result.current).toBe(mockCmsHelper);
  });
});
