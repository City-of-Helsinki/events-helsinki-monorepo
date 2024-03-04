import type { BreadcrumbListItem } from 'hds-react';
import { APP_LANGUAGES } from '../../constants';

const defaultExcludedBreadcrumbBasePaths = ['/pages'];

export const defaultExcludedBreadcrumbPaths = [
  ...defaultExcludedBreadcrumbBasePaths,
  ...defaultExcludedBreadcrumbBasePaths
    .map((pathname) => APP_LANGUAGES.map((lang) => `/${lang}${pathname}`))
    .flat(),
];

/**
 *
 * @param breadcrumbs
 * @param excludedPaths paths to be excluded from the list of breadcrumbs. Defaults to `defaultExcludedBreadcrumbPaths`.
 * @returns a filtered list of breadcrumb objects
 */
export default function getFilteredBreadcrumbs(
  breadcrumbs: BreadcrumbListItem[],
  excludedPaths = defaultExcludedBreadcrumbPaths
) {
  // new RegExp(`${breadcrumb.path}((/w+)+|/?)$`, 'g');
  return breadcrumbs.filter(
    (breadcrumb) =>
      !breadcrumb.path ||
      (!excludedPaths.includes(breadcrumb.path) &&
        !excludedPaths.includes(breadcrumb.path.replace(/\/$/, '')))
  );
}
