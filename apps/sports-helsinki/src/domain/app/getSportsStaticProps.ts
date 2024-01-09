import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import type { Menu, Language } from '@events-helsinki/components';
import {
  DEFAULT_FOOTER_MENU_NAME,
  DEFAULT_HEADER_MENU_NAME,
  HARDCODED_LANGUAGES,
  getLanguageOrDefault,
  DEFAULT_HEADER_UNIVERSAL_BAR_MENU_NAME,
} from '@events-helsinki/components';
import type { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { MenuDocument } from 'react-helsinki-headless-cms/apollo';
import { staticGenerationLogger } from '../../logger';
import initializeSportsApolloClient from '../clients/sportsApolloClient';
import AppConfig from './AppConfig';

type SportsContext = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

export type SportsGlobalPageProps<P = Record<string, unknown>> = {
  initialApolloState: NormalizedCacheObject;
} & Promise<GetStaticPropsResult<P>>;

export default async function getSportsStaticProps<P = Record<string, unknown>>(
  context: GetStaticPropsContext,
  tryToGetPageProps: (
    sportsContext: SportsContext
  ) => Promise<GetStaticPropsResult<P>>
) {
  const language = getLanguageOrDefault(context.locale);
  const apolloClient = initializeSportsApolloClient();

  try {
    const globalCmsData = await getGlobalCMSData({
      client: apolloClient,
      context,
    });
    const result = await tryToGetPageProps({ apolloClient });
    const props =
      'props' in result
        ? {
            initialApolloState: apolloClient.cache.extract(),
            locale: language,
            ...globalCmsData,
            ...result.props,
          }
        : undefined;

    return {
      // Apply revalidate, allow it to be overwritten
      revalidate: AppConfig.defaultRevalidate,
      ...result,
      props,
    };
  } catch (e: unknown) {
    // Generic error handling
    staticGenerationLogger.error(
      `Error while generating a page (with locale "${context.locale}"):`,
      e
    );
    // Throw an error, because otherwise the NextJS generates a page that is always somehow broken:
    // The biggest issue here is with the translations: https://github.com/i18next/next-i18next/issues/1020.
    // The i18next instance is not ready to process translations when nextjs tries to render the error page.
    // When an error is thrown, the page regeneration is abandoned on errors,
    // so the last successful generation will stay in use in action!
    throw e;
  }
}

type GetGlobalCMSDataParams = {
  client: ApolloClient<NormalizedCacheObject>;
  context: GetStaticPropsContext;
};

type ReturnedGlobalCMSData = {
  headerMenu?: Menu;
  headerUniversalBarMenu?: Menu;
  footerMenu?: Menu;
  languages?: Language[];
};

const getMenu = async (
  menuName: string,
  client: GetGlobalCMSDataParams['client']
): Promise<Menu | undefined> =>
  (
    await client.query({
      query: MenuDocument,
      variables: { id: menuName, menuIdentifiersOnly: true },
      fetchPolicy: 'network-only', // Always fetch new, but update the cache.
    })
  )?.data?.menu;

// Get CMS data that's required on every page
async function getGlobalCMSData({
  client,
  context,
}: GetGlobalCMSDataParams): Promise<ReturnedGlobalCMSData> {
  const language = getLanguageOrDefault(context.locale);
  const headerMenuName = DEFAULT_HEADER_MENU_NAME[language];
  const headerUniversalBarMenuName =
    DEFAULT_HEADER_UNIVERSAL_BAR_MENU_NAME[language];
  const footerMenuName = DEFAULT_FOOTER_MENU_NAME[language];

  return {
    headerMenu: await getMenu(headerMenuName, client),
    headerUniversalBarMenu: await getMenu(headerUniversalBarMenuName, client),
    footerMenu: await getMenu(footerMenuName, client),
    languages: HARDCODED_LANGUAGES,
  };
}
