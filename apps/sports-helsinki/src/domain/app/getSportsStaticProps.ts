import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { isApolloError } from '@apollo/client';
import type {
  AppLanguage,
  CmsLanguage,
  Menu,
  Language,
} from 'events-helsinki-components';
import type { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import {
  LanguagesDocument,
  MenuDocument,
} from 'react-helsinki-headless-cms/apollo';
import {
  DEFAULT_FOOTER_MENU_NAME,
  DEFAULT_HEADER_MENU_NAME,
} from '../../constants';
import { staticGenerationLogger } from '../../logger';
import initializeFederationApolloClient from '../clients/eventsFederationApolloClient';
import AppConfig from './AppConfig';

type SportsContext = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

export type SportsGlobalPageProps = {
  initialApolloState: NormalizedCacheObject;
} & unknown; // FIXME: Promise<GetStaticPropsResult<P>> of getHobbiesStaticProps

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function getSportsStaticProps<P = Record<string, any>>(
  context: GetStaticPropsContext,
  tryToGetPageProps: (
    sportsContext: SportsContext
  ) => Promise<GetStaticPropsResult<P>>
) {
  const apolloClient = initializeFederationApolloClient();

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
            locale: context.locale,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // Generic error handling
    staticGenerationLogger.error('Error while generating a page:', e);
    if (isApolloError(e)) {
      return {
        props: {
          error: {
            statusCode: 400,
          },
        },
        revalidate: 10,
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
  const locale: AppLanguage = (context?.locale ?? 'fi') as AppLanguage;
  const headerNavigationMenuName = DEFAULT_HEADER_MENU_NAME[locale];
  const { data: headerMenuData } = await client.query({
    query: MenuDocument,
    variables: {
      id: headerNavigationMenuName,
      // idType: 'URI'
    },
  });
  client.writeQuery({
    query: MenuDocument,
    variables: {
      id: headerNavigationMenuName,
    },
    data: {
      ...headerMenuData,
    },
  });

  const footerNavigationMenuName = DEFAULT_FOOTER_MENU_NAME[locale];
  const { data: footerMenuData } = await client.query({
    query: MenuDocument,
    variables: {
      id: footerNavigationMenuName,
      // idType: 'URI'
    },
  });
  client.writeQuery({
    query: MenuDocument,
    variables: {
      id: footerNavigationMenuName,
    },
    data: {
      ...footerMenuData,
    },
  });

  const { data: languagesData } = await client.query({
    query: LanguagesDocument,
  });

  client.writeQuery({
    query: LanguagesDocument,
    data: { ...languagesData },
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
