import fs from 'fs/promises';
import path from 'path';
import type {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client/core/index.js';
import type { NextApiResponse } from 'next';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { APP_LANGUAGES } from '../../../constants';
import type { Logger } from '../../../loggers/logger';
import {
  GET_ALL_PAGES_URI_INFO_QUERY,
  GET_ALL_POSTS_URI_INFO_QUERY,
} from '../queries';
import type { GetAllItemsUriInfoResponseType } from '../queries';
import {
  getAllCmsArticlesPageUriInfos,
  getAllCmsPagesPageUriInfos,
  NextPageRevalidateService,
  PAGES_AMOUNT_LIMIT,
  POSTS_AMOUNT_LIMIT,
  uniqBySetWithArrayFrom,
} from '../service';

vi.mock('fs/promises');

const mockLogger: Logger = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn(),
};

const mockApolloClient = {
  query: vi.fn(),
} as unknown as ApolloClient<NormalizedCacheObject>;

const mockResponse = {
  revalidate: vi.fn().mockResolvedValue(undefined),
} as unknown as NextApiResponse;

const createMockCmsResponse = (
  items: {
    uri: string | null;
    slug: string | null;
    language: { code: string };
  }[],
  hasNextPage: boolean
): ApolloQueryResult<GetAllItemsUriInfoResponseType> => ({
  data: {
    items: {
      edges: items
        .filter((node) => node.uri !== null && node.slug !== null)
        .map((node) => ({
          node: {
            ...node,
            uri: node.uri as string,
            slug: node.slug as string,
          },
        })),
      pageInfo: {
        hasNextPage,
        endCursor: hasNextPage ? 'next-cursor' : '',
        hasPreviousPage: false,
        startCursor: 'start-cursor',
      },
    },
  },
  loading: false,
  networkStatus: 7,
});

describe('headless-cms/service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('uniqBySetWithArrayFrom', () => {
    it('should remove duplicate numbers from an array', () => {
      expect(uniqBySetWithArrayFrom([1, 2, 2, 3, 1, 4])).toStrictEqual([
        1, 2, 3, 4,
      ]);
    });

    it('should remove duplicate strings from an array', () => {
      expect(uniqBySetWithArrayFrom(['a', 'b', 'a', 'c', 'c'])).toStrictEqual([
        'a',
        'b',
        'c',
      ]);
    });

    it('should handle an empty array', () => {
      expect(uniqBySetWithArrayFrom([])).toStrictEqual([]);
    });

    it('should not remove duplicate objects unless they are the same reference', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 1 };
      const obj3 = { id: 2 };
      expect(uniqBySetWithArrayFrom([obj1, obj2, obj3, obj1])).toStrictEqual([
        obj1,
        obj2,
        obj3,
      ]);
    });
  });

  describe('CMS URI Info Fetchers', () => {
    it('getAllCmsArticlesPageUriInfos should fetch a single page of articles', async () => {
      const mockArticles = [
        { uri: '/fi/article1', slug: 'article1', language: { code: 'FI' } },
      ];
      (mockApolloClient.query as any).mockResolvedValue(
        createMockCmsResponse(mockArticles, false)
      );

      const result = await getAllCmsArticlesPageUriInfos(mockApolloClient);

      expect(mockApolloClient.query).toHaveBeenCalledWith({
        query: GET_ALL_POSTS_URI_INFO_QUERY,
        variables: { first: POSTS_AMOUNT_LIMIT, after: '' },
        fetchPolicy: 'no-cache',
      });
      expect(result).toStrictEqual([
        { uri: '/fi/article1', slug: 'article1', locale: 'fi' },
      ]);
    });

    it('getAllCmsArticlesPageUriInfos should handle pagination', async () => {
      const mockArticlesPage1 = [
        { uri: '/fi/article1', slug: 'article1', language: { code: 'FI' } },
      ];
      const mockArticlesPage2 = [
        { uri: '/en/article2', slug: 'article2', language: { code: 'EN' } },
      ];

      (mockApolloClient.query as any)
        .mockResolvedValueOnce(createMockCmsResponse(mockArticlesPage1, true))
        .mockResolvedValueOnce(createMockCmsResponse(mockArticlesPage2, false));

      const result = await getAllCmsArticlesPageUriInfos(mockApolloClient);

      expect(mockApolloClient.query).toHaveBeenCalledTimes(2);
      expect(mockApolloClient.query).toHaveBeenCalledWith({
        query: GET_ALL_POSTS_URI_INFO_QUERY,
        variables: { first: POSTS_AMOUNT_LIMIT, after: 'next-cursor' },
        fetchPolicy: 'no-cache',
      });
      expect(result).toStrictEqual([
        { uri: '/fi/article1', slug: 'article1', locale: 'fi' },
        { uri: '/en/article2', slug: 'article2', locale: 'en' },
      ]);
    });

    it('getAllCmsPagesPageUriInfos should fetch pages', async () => {
      const mockPages = [
        { uri: '/fi/page1', slug: 'page1', language: { code: 'FI' } },
      ];
      (mockApolloClient.query as any).mockResolvedValue(
        createMockCmsResponse(mockPages, false)
      );

      const result = await getAllCmsPagesPageUriInfos(mockApolloClient);

      expect(mockApolloClient.query).toHaveBeenCalledWith({
        query: GET_ALL_PAGES_URI_INFO_QUERY,
        variables: { first: PAGES_AMOUNT_LIMIT, after: '' },
        fetchPolicy: 'no-cache',
      });
      expect(result).toStrictEqual([
        { uri: '/fi/page1', slug: 'page1', locale: 'fi' },
      ]);
    });
  });

  describe('NextPageRevalidateService', () => {
    let service: NextPageRevalidateService;

    beforeEach(() => {
      service = new NextPageRevalidateService({
        cmsApolloClient: mockApolloClient,
        staticGenerationLogger: mockLogger,
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    describe('revalidate', () => {
      it('should revalidate a simple path and return null on success', async () => {
        const result = await service.revalidate(mockResponse, '/about');
        expect(mockResponse.revalidate).toHaveBeenCalledWith('/about');
        expect(mockLogger.info).toHaveBeenCalledWith(
          'Revalidating page: /about'
        );
        expect(result).toBeNull();
      });

      it('should normalize path with trailing slash', async () => {
        await service.revalidate(mockResponse, '/about/');
        expect(mockResponse.revalidate).toHaveBeenCalledWith('/about');
      });

      it('should handle root path', async () => {
        await service.revalidate(mockResponse, '/');
        expect(mockResponse.revalidate).toHaveBeenCalledWith('/');
      });

      it('should handle empty string as root path', async () => {
        await service.revalidate(mockResponse, '');
        expect(mockResponse.revalidate).toHaveBeenCalledWith('/');
      });

      it('should log an error and return the path on failure', async () => {
        const error = new Error('Revalidation failed');
        (mockResponse.revalidate as any).mockRejectedValueOnce(error);

        const result = await service.revalidate(mockResponse, '/failing-path/');

        expect(mockLogger.error).toHaveBeenCalledWith(
          'Error revalidating page: /failing-path',
          error
        );
        expect(result).toBe('/failing-path');
      });
    });

    describe('revalidateAll', () => {
      it('should call revalidate for each unique page', async () => {
        const pages = ['/a', '/b', '/a', '/c'];
        const revalidateSpy = vi
          .spyOn(service, 'revalidate')
          .mockResolvedValue(null);

        await service.revalidateAll(mockResponse, pages);

        expect(revalidateSpy).toHaveBeenCalledTimes(3);
        expect(revalidateSpy).toHaveBeenCalledWith(mockResponse, '/a');
        expect(revalidateSpy).toHaveBeenCalledWith(mockResponse, '/b');
        expect(revalidateSpy).toHaveBeenCalledWith(mockResponse, '/c');
        expect(mockLogger.info).toHaveBeenCalledWith(
          'Starting batch revalidation for 4 pages.'
        );
        expect(mockLogger.info).toHaveBeenCalledWith(
          'Batch revalidation complete. Success: 3, Failures: 0.'
        );
      });

      it('should log failures correctly', async () => {
        const pages = ['/a', '/b', '/c'];
        const revalidateSpy = vi
          .spyOn(service, 'revalidate')
          .mockResolvedValueOnce(null)
          .mockResolvedValueOnce('/b') // Fails
          .mockResolvedValueOnce(null);

        await service.revalidateAll(mockResponse, pages);

        expect(revalidateSpy).toHaveBeenCalledTimes(3);
        expect(mockLogger.info).toHaveBeenCalledWith(
          'Batch revalidation complete. Success: 2, Failures: 1.'
        );
        expect(mockLogger.warn).toHaveBeenCalledWith(
          'Failed to revalidate the following URIs: /b'
        );
      });
    });

    describe('NextPageLister functionality', () => {
      const mockProjectRoot = '/test-project';

      beforeEach(() => {
        vi.spyOn(process, 'cwd').mockReturnValue(mockProjectRoot);
        // Re-instantiate service to use the mocked cwd
        service = new NextPageRevalidateService({
          cmsApolloClient: mockApolloClient,
          staticGenerationLogger: mockLogger,
        });
      });

      it('listGeneratedPages should list, deduplicate, and sort files recursively', async () => {
        (fs.access as any).mockResolvedValue(undefined);
        (fs.readdir as any).mockImplementation(async (dirPath: string) => {
          const pagesDir = path.join(
            mockProjectRoot,
            '.next',
            'server',
            'pages'
          );
          if (dirPath === path.join(pagesDir, 'fi')) {
            return [
              {
                name: 'about.html',
                isDirectory: () => false,
                isFile: () => true,
              },
              {
                name: 'about.json',
                isDirectory: () => false,
                isFile: () => true,
              },
              { name: 'courses', isDirectory: () => true, isFile: () => false },
              { name: 'api', isDirectory: () => true, isFile: () => false },
            ];
          }
          if (dirPath === path.join(pagesDir, 'fi', 'courses')) {
            return [
              {
                name: 'course1.html',
                isDirectory: () => false,
                isFile: () => true,
              },
            ];
          }
          return [];
        });

        const pages = await service.listGeneratedPages('/fi');

        expect(fs.access).toHaveBeenCalledWith(
          path.join(mockProjectRoot, '.next', 'server', 'pages', 'fi')
        );
        expect(pages).toStrictEqual(
          ['/fi/about', '/fi/courses/course1'].sort()
        );
      });

      it('listGeneratedPages should throw if directory does not exist', async () => {
        (fs.access as any).mockRejectedValue(new Error('ENOENT'));
        await expect(
          service.listGeneratedPages('/non-existent')
        ).rejects.toThrow();
      });
    });

    describe('triggerAllCmsPagesRevalidation', () => {
      it('should fetch all CMS pages and revalidate them', async () => {
        const revalidateAllSpy = vi
          .spyOn(service, 'revalidateAll')
          .mockResolvedValue();

        (mockApolloClient.query as any)
          .mockResolvedValueOnce(
            createMockCmsResponse(
              [
                {
                  uri: '/fi/article1',
                  slug: 'article1',
                  language: { code: 'FI' },
                },
                {
                  uri: '/en/article2/',
                  slug: 'article2',
                  language: { code: 'EN' },
                },
              ],
              false
            )
          )
          .mockResolvedValueOnce(
            createMockCmsResponse(
              [
                { uri: '/fi/page1', slug: 'page1', language: { code: 'FI' } },
                { uri: null, slug: 'page-no-uri', language: { code: 'FI' } },
              ],
              false
            )
          );

        await service.triggerAllCmsPagesRevalidation(mockResponse);

        const expectedPages = [
          '/fi/article1',
          '/en/article2',
          '/fi/page1',
          ...APP_LANGUAGES.map((lng) => `/${lng}`),
        ];

        expect(revalidateAllSpy).toHaveBeenCalledTimes(1);
        const calledWith = revalidateAllSpy.mock.calls[0][1];
        expect(calledWith).toHaveLength(new Set(expectedPages).size);
        expect(calledWith).toStrictEqual(
          expect.arrayContaining(Array.from(new Set(expectedPages)))
        );
      });

      it('should handle errors during fetching', async () => {
        (mockApolloClient.query as any).mockRejectedValue(
          new Error('API Error')
        );
        const revalidateAllSpy = vi.spyOn(service, 'revalidateAll');

        await service.triggerAllCmsPagesRevalidation(mockResponse);

        expect(revalidateAllSpy).not.toHaveBeenCalled();
        expect(mockLogger.error).toHaveBeenCalledWith(
          'Error during the triggerAllCmsPagesRevalidation process',
          expect.any(Error)
        );
      });
    });

    describe('triggerAllPathnamesPagesRevalidation', () => {
      it('should list pages from multiple pathnames and revalidate them', async () => {
        const listGeneratedPagesSpy = vi
          .spyOn(service, 'listGeneratedPages')
          .mockResolvedValueOnce(['/fi/courses/1', '/fi/courses/2'])
          .mockResolvedValueOnce([
            '/sv/events/a',
            '/sv/events/b',
            '/fi/courses/1',
          ]);
        const revalidateAllSpy = vi
          .spyOn(service, 'revalidateAll')
          .mockResolvedValue();

        await service.triggerAllPathnamesPagesRevalidation(mockResponse, [
          '/fi/courses',
          '/sv/events',
        ]);

        expect(listGeneratedPagesSpy).toHaveBeenCalledTimes(2);
        const expectedPages = [
          '/fi/courses/1',
          '/fi/courses/2',
          '/sv/events/a',
          '/sv/events/b',
        ];
        expect(revalidateAllSpy).toHaveBeenCalledTimes(1);
        const calledWith = revalidateAllSpy.mock.calls[0][1];
        expect(calledWith).toStrictEqual(expect.arrayContaining(expectedPages));
        expect(calledWith).toHaveLength(expectedPages.length);
      });

      it('should continue even if one pathname fails to list', async () => {
        const _listGeneratedPagesSpy = vi
          .spyOn(service, 'listGeneratedPages')
          .mockRejectedValueOnce(new Error('Listing failed'))
          .mockResolvedValueOnce(['/sv/events/a']);
        const revalidateAllSpy = vi
          .spyOn(service, 'revalidateAll')
          .mockResolvedValue();

        await service.triggerAllPathnamesPagesRevalidation(mockResponse, [
          '/fi/courses',
          '/sv/events',
        ]);

        expect(mockLogger.error).toHaveBeenCalledWith(
          'Error listing pages for pathname: /fi/courses',
          expect.any(Error)
        );
        expect(revalidateAllSpy).toHaveBeenCalledWith(mockResponse, [
          '/sv/events/a',
        ]);
      });

      it('should not revalidate if no pages are found', async () => {
        vi.spyOn(service, 'listGeneratedPages').mockResolvedValue([]);
        const revalidateAllSpy = vi.spyOn(service, 'revalidateAll');

        await service.triggerAllPathnamesPagesRevalidation(mockResponse, [
          '/empty',
        ]);

        expect(revalidateAllSpy).not.toHaveBeenCalled();
        expect(mockLogger.warn).toHaveBeenCalledWith(
          'No unique pages found for revalidation across the specified pathnames.'
        );
      });
    });
  });
});
