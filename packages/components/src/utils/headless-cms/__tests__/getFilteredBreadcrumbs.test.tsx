import type { BreadcrumbListItem } from 'hds-react';
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
    it.each<[BreadcrumbListItem[], BreadcrumbListItem[]]>([
      [
        [
          { title: 'Etusivu', path: '/fi/' },
          { title: 'Pages', path: '/fi/pages/' },
        ],
        [{ title: 'Etusivu', path: '/fi/' }],
      ],
      [
        [
          { title: 'Etusivu', path: '/' },
          { title: 'Pages', path: '/pages/' },
        ],
        [{ title: 'Etusivu', path: '/' }],
      ],
      [
        [
          { title: '/pages', path: '/pages' },
          { title: '/fi/pages', path: '/fi/pages' },
          { title: '/fi/pages/', path: '/fi/pages/' },
          { title: '/sv/pages', path: '/sv/pages' },
          { title: '/sv/pages/', path: '/sv/pages/' },
          { title: '/en/pages', path: '/en/pages' },
          { title: '/en/pages/', path: '/en/pages/' },
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
