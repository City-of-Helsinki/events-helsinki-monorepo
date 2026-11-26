import type {
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client/core/index.js';
import { MenuDocument } from '@city-of-helsinki/react-helsinki-headless-cms/apollo';
import type { GetStaticPropsContext } from 'next';
import {
  DEFAULT_FOOTER_MENU_NAME,
  DEFAULT_HEADER_MENU_NAME,
  DEFAULT_HEADER_UNIVERSAL_BAR_MENU_NAME,
  HARDCODED_LANGUAGES,
} from '../../constants';
import type { Language, Menu } from '../../types';
import getLanguageOrDefault from '../get-language-or-default';

export type GlobalCMSData = {
  headerMenu?: Menu;
  headerUniversalBarMenu?: Menu;
  footerMenu?: Menu;
  languages?: Language[];
};

const getMenu = async (
  menuName: string,
  client: ApolloClient<NormalizedCacheObject>
): Promise<Menu | undefined> =>
  (
    await client.query({
      query: MenuDocument,
      // The client defaults to 'all', which would turn CMS errors into undefined data.
      errorPolicy: 'none',
      variables: { id: menuName, menuIdentifiersOnly: true },
      fetchPolicy: 'network-only', // Always fetch new, but update the cache.
    })
  )?.data?.menu;

/**
 * Get the CMS data that's required on every page.
 * Throws on CMS errors. Absent menus are omitted, because `undefined`
 * props can't be serialized by Next.js.
 */
export default async function getGlobalCMSData({
  client,
  context,
}: {
  client: ApolloClient<NormalizedCacheObject>;
  context: GetStaticPropsContext;
}): Promise<GlobalCMSData> {
  const language = getLanguageOrDefault(context.locale);

  const headerMenu = await getMenu(DEFAULT_HEADER_MENU_NAME[language], client);
  const headerUniversalBarMenu = await getMenu(
    DEFAULT_HEADER_UNIVERSAL_BAR_MENU_NAME[language],
    client
  );
  const footerMenu = await getMenu(DEFAULT_FOOTER_MENU_NAME[language], client);

  return {
    ...(headerMenu ? { headerMenu } : {}),
    ...(headerUniversalBarMenu ? { headerUniversalBarMenu } : {}),
    ...(footerMenu ? { footerMenu } : {}),
    languages: HARDCODED_LANGUAGES,
  };
}
