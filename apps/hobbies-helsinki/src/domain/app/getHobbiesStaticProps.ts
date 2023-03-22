import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { isApolloError } from '@apollo/client';
import type { CmsLanguage, Menu, Language } from 'events-helsinki-components';
import {
  DEFAULT_FOOTER_MENU_NAME,
  DEFAULT_HEADER_MENU_NAME,
  getLanguageOrDefault,
} from 'events-helsinki-components';
import type { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import {
  LanguagesDocument,
  MenuDocument,
} from 'react-helsinki-headless-cms/apollo';
import { staticGenerationLogger } from '../../logger';
import initializeHobbiesApolloClient from '../clients/hobbiesApolloClient';
import AppConfig from './AppConfig';

type HobbiesContext = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

export type HobbiesGlobalPageProps<P = Record<string, unknown>> = {
  initialApolloState: NormalizedCacheObject;
} & Promise<GetStaticPropsResult<P>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function getHobbiesStaticProps<P = Record<string, any>>(
  context: GetStaticPropsContext,
  tryToGetPageProps: (
    hobbiesContext: HobbiesContext
  ) => Promise<GetStaticPropsResult<P>>
) {
  try {
    const language = getLanguageOrDefault(context.locale);
    const apolloClient = initializeHobbiesApolloClient();
    const globalCmsData = await getGlobalCMSData({
      client: apolloClient,
      context,
    });
    const result = await tryToGetPageProps({
      apolloClient: apolloClient,
    });
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
    staticGenerationLogger.error(`Error while generating a page: ${e}`, e);
    if (isApolloError(e as Error)) {
      return {
        revalidate: 1,
        props: {
          error: {
            statusCode: 500,
          },
        },
      };
    }
    throw e;
  }
}

type GetGlobalCMSDataParams = {
  client: ApolloClient<NormalizedCacheObject>;
  context: GetStaticPropsContext;
};

type ReturnedGlobalCMSData = {
  headerMenu?: Menu;
  footerMenu?: Menu;
  languages?: Language[];
};

// Get CMS data that's required on every page
async function getGlobalCMSData({
  client,
  context,
}: GetGlobalCMSDataParams): Promise<ReturnedGlobalCMSData> {
  const language = getLanguageOrDefault(context.locale);
  const headerNavigationMenuName = DEFAULT_HEADER_MENU_NAME[language];
  const fetchPolicy = 'network-only'; // Always fetch new, but update the cache.
  const { data: headerMenuData } = await client.query({
    query: MenuDocument,
    variables: {
      id: headerNavigationMenuName,
      // idType: 'URI'
    },
    fetchPolicy,
  });
  const footerNavigationMenuName = DEFAULT_FOOTER_MENU_NAME[language];
  const { data: footerMenuData } = await client.query({
    query: MenuDocument,
    variables: {
      id: footerNavigationMenuName,
      // idType: 'URI'
    },
    fetchPolicy,
  });
  const { data: languagesData } = await client.query({
    query: LanguagesDocument,
    fetchPolicy,
  });
  const languages = getSupportedLanguages(languagesData?.languages, context);

  return {
    headerMenu: headerMenuData?.menu,
    footerMenu: footerMenuData?.menu,
    languages,
  };
}

function getSupportedLanguages(
  languages: CmsLanguage[],
  context: GetStaticPropsContext
): Language[] {
  // NextJS uses locales as is in the slug. The headless CMS has a locale and
  // a slug field. The slug field is meant to be used in urls. To be able to do
  // so, we have to provide the slug field value for NextJS when configuring its
  // i18n module. That's why we are trying to find the slug field from NextJS
  // locales.
  return languages.filter(({ slug }) =>
    context.locales?.includes(slug)
  ) as Language[];
}
