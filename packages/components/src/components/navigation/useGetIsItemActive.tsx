import { resolveHref } from 'next/dist/shared/lib/router/utils/resolve-href'; // NOTE: in Next 14 this is located in: 'next/dist/client/resolve-href' -- https://github.com/vercel/next.js/discussions/22025
import { useRouter } from 'next/router';
import type { NavigationProps } from 'react-helsinki-headless-cms';
import { useCmsRoutedAppHelper } from '../../cmsHelperProvider';
import { useLocale } from '../../hooks';

export default function useGetItemIsActive(): NonNullable<
  NavigationProps['getIsItemActive']
> {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const routerHelper = useCmsRoutedAppHelper();
  const locale = useLocale();

  return ({ path }): boolean => {
    const pathWithoutTrailingSlash = (path ?? '').replace(/\/$/, '');
    const i18nRouterPathname = routerHelper.getI18nPath(pathname, locale);
    const i18nRouterAsPath = routerHelper.getI18nPath(asPath, locale);
    const [, resolvedUrl] = resolveHref(router, { pathname, query }, true);
    const resolvedPathname = resolvedUrl?.split('?')[0];
    const parentPathnamePattern = i18nRouterPathname.split('[')[0];

    // The router.pathname needs to be checked when dealing with "statically routed page".
    const isStaticallyRoutedItem =
      pathWithoutTrailingSlash === i18nRouterPathname ||
      pathWithoutTrailingSlash === `/${locale}${i18nRouterPathname}`;

    // The pathname may or may not contain the i18n version of the menu item path
    const isI18nVersionItem =
      pathWithoutTrailingSlash === resolvedPathname ||
      pathWithoutTrailingSlash === `/${locale}${resolvedPathname}`;

    // Since the menu can contain subitems in a dropdown, the parent items needs to be checked too.
    // NOTE: We are now assuming that all the parent items are also real parent pages.
    const isParentItem = Boolean(
      path &&
        (i18nRouterAsPath.startsWith(path) ||
          parentPathnamePattern.startsWith(path) ||
          `/${locale}${parentPathnamePattern}`.startsWith(path) ||
          resolvedPathname?.startsWith(path) ||
          `/${locale}${resolvedPathname}`.startsWith(path))
    );

    return isStaticallyRoutedItem || isI18nVersionItem || isParentItem;
  };
}
