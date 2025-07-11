import { renderHook, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

import type { MenuItem } from 'react-helsinki-headless-cms';
import CmsHelperProvider from '../../../cmsHelperProvider/CmsHelperProvider';
import { APP_LANGUAGES } from '../../../constants';
import { HeadlessCMSHelper } from '../../../utils/headless-cms/HeadlessCMSHelper';
import { CmsRoutedAppHelper } from '../../../utils/headless-cms/HeadlessCmsRoutedAppHelper';
import useGetItemIsActive from '../useGetIsItemActive';

const i18nRoutes = {
  '/search': [
    { source: '/haku', locale: 'fi' },
    { source: '/sok', locale: 'sv' },
  ],
  '/events/:eventId': [
    { source: '/tapahtumat/:eventId', locale: 'fi' },
    { source: '/kurser/:eventId', locale: 'sv' },
  ],
  '/articles': [
    { source: '/artikkelit', locale: 'fi' },
    { source: '/artiklar', locale: 'sv' },
  ],
  '/articles/:slug*': [
    { source: '/artikkelit/:slug*', locale: 'fi' },
    { source: '/artiklar/:slug*', locale: 'sv' },
  ],
  '/pages/:slug*': [
    { source: '/sivut/:slug*', locale: 'fi' },
    { source: '/sidor/:slug*', locale: 'sv' },
  ],
};

const testCmsHelper = new HeadlessCMSHelper({
  cmsArticlesContextPath: '/articles',
  cmsPagesContextPath: '/pages',
  dateFormat: 'dd.MM.yyyy',
  ArticleDetails: vi.fn(),
});

const testRoutedAppHelper = new CmsRoutedAppHelper({
  i18nRoutes,
  locales: APP_LANGUAGES,
  URLRewriteMapping: {},
});

type MenuItemLocation = string;
type WindowLocationHref = string;
type MenuItemLocationMatcherType = [MenuItemLocation, WindowLocationHref][];

const frontPage: MenuItemLocationMatcherType = [
  ['/', '/'],
  ['/fi', '/'],
  ['/fi', '/fi'],
  ['/sv', '/sv'],
  ['/en', '/en'],
];

const searchPage: MenuItemLocationMatcherType = [
  ['/fi/search', '/fi/search'],
  ['/fi/search', '/fi/haku'],
  ['/fi/search', '/haku'],
  ['/fi/search', '/haku'],
  ['/sv/search', '/sv/search'],
  ['/sv/search', '/sv/sok'],
  ['/en/search', '/en/search'],
  ['/search', '/search'],
  ['/search', '/haku'],
  ['/fi/search', '/search'],
  ['/fi/search', '/haku'],
  ['/fi/search', '/search?searchType=Venue'],
];

const articlesPage: MenuItemLocationMatcherType = [
  ['/fi/articles', '/fi/artikkelit'],
  ['/fi/articles', '/fi/articles'],
  ['/sv/articles', '/sv/articles'],
  ['/sv/articles', '/sv/artiklar'],
  ['/en/articles', '/en/articles'],
];

// FIXME: Skipped while no way to mock the nextjs redirects and i18nroutes for router was found.
describe.skip('useGetIsItemActive hook for Navigation-component', () => {
  describe('getIsItemActive function', () => {
    it.each([...frontPage, ...searchPage, ...articlesPage])(
      'returns true for menu item with URL "%s" when current location is "%s"',
      async (itemUrl, locationUrl) => {
        mockRouter.setCurrentUrl(locationUrl);
        await waitFor(() => {
          expect(mockRouter.asPath).toStrictEqual(locationUrl);
        });
        const { result } = renderHook(() => useGetItemIsActive(), {
          wrapper: ({ children }: any) => (
            <MemoryRouterProvider>
              <CmsHelperProvider
                cmsHelper={testCmsHelper}
                routerHelper={testRoutedAppHelper}
              >
                {children}
              </CmsHelperProvider>
            </MemoryRouterProvider>
          ),
        });
        expect(result.current({ path: itemUrl } as MenuItem)).toBeTruthy();
      }
    );
  });
});
