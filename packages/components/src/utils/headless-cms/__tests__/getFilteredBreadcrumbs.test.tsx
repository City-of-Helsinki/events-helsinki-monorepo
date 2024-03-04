import type { Breadcrumb } from 'react-helsinki-headless-cms';
import getFilteredBreadcrumbs, {
  defaultExcludedBreadcrumbPaths,
} from '../getFilteredBreadcrumbs';

describe('defaultExcludedBreadcrumbPaths', () => {
  it.each(['/pages', '/fi/pages', '/sv/pages', '/en/pages'])(
    'contains %s',
    (pathname) => {
      expect(defaultExcludedBreadcrumbPaths).toContain(pathname);
    }
  );
});

describe('getFilteredBreadcrumbs', () => {
  describe('uses defaultExcludedBreadcrumbPaths as default list of excluded paths', () => {
    it.each<[Breadcrumb[], Breadcrumb[]]>([
      [
        [
          { title: 'Etusivu', link: '/fi/' },
          { title: 'Pages', link: '/fi/pages/' },
        ],
        [{ title: 'Etusivu', link: '/fi/' }],
      ],
      [
        [
          { title: 'Etusivu', link: '/' },
          { title: 'Pages', link: '/pages/' },
        ],
        [{ title: 'Etusivu', link: '/' }],
      ],
      [
        [
          { title: '/pages', link: '/pages' },
          { title: '/fi/pages', link: '/fi/pages' },
          { title: '/fi/pages/', link: '/fi/pages/' },
          { title: '/sv/pages', link: '/sv/pages' },
          { title: '/sv/pages/', link: '/sv/pages/' },
          { title: '/en/pages', link: '/en/pages' },
          { title: '/en/pages/', link: '/en/pages/' },
        ],
        [],
      ],
    ])(
      'removes the defaultExcludedBreadcrumbPaths from the given breadcrumbs - %#',
      (breadcrumbs, result) => {
        expect(getFilteredBreadcrumbs(breadcrumbs)).toStrictEqual(result);
      }
    );
  });
});
