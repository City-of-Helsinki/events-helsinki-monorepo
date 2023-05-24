/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { NormalizedCacheObject } from '@apollo/client';
import type { AppLanguage } from '@events-helsinki/components';
import {
  NavigationContext,
  getAllPages,
  MatomoWrapper,
  useAppHobbiesTranslation,
  FooterSection,
  getLanguageOrDefault,
} from '@events-helsinki/components';
import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next';
import { useContext } from 'react';
import type {
  Breadcrumb,
  CollectionType,
  PageContentProps,
  PageType,
} from 'react-helsinki-headless-cms';
import {
  getCollections,
  PageContent as HCRCPageContent,
  Page as HCRCPage,
  useConfig,
} from 'react-helsinki-headless-cms';
import type {
  PageQuery,
  PageQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import { PageDocument } from 'react-helsinki-headless-cms/apollo';
import Navigation from '../../../../../packages/components/src/components/navigation/Navigation';
import AppConfig from '../../domain/app/AppConfig';
import getHobbiesStaticProps from '../../domain/app/getHobbiesStaticProps';
import cmsHelper from '../../domain/app/headlessCmsHelper';
import { hobbiesApolloClient } from '../../domain/clients/hobbiesApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';

const NextCmsPage: NextPage<{
  page: PageType;
  collections: CollectionType[];
}> = ({ page, collections }) => {
  const {
    utils: { getRoutedInternalHref },
  } = useConfig();
  const { footerMenu } = useContext(NavigationContext);
  const { t: appTranslation } = useAppHobbiesTranslation();

  // FIXME: Return null to fix SSR rendering for notFound-page.
  // This is needed only with fallback: true, but should not be needed at all.
  if (!page) return null;

  return (
    <MatomoWrapper>
      <HCRCPage
        className="page"
        navigation={<Navigation page={page} />}
        content={
          <HCRCPageContent
            page={page as PageContentProps['page']}
            collections={
              collections
                ? cmsHelper.getDefaultCollections(page, getRoutedInternalHref)
                : []
            }
          />
        }
        footer={
          <FooterSection
            menu={footerMenu}
            appName={appTranslation('appHobbies:appName')}
          />
        }
      />
    </MatomoWrapper>
  );
};

export async function getStaticPaths() {
  // Do not prerender any static pages when in preview environment
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const pagePageInfos = await getAllPages(hobbiesApolloClient);
  const paths = pagePageInfos
    .map((pageInfo) => ({
      params: { slug: cmsHelper.getSlugFromUri(pageInfo.uri) },
      locale: pageInfo.locale,
    }))
    // Remove the pages without a slug
    .filter((entry) => entry.params.slug && entry.params.slug.length);
  return {
    paths,
    fallback: 'blocking',
  };
}

type ResultProps =
  | {
      initialApolloState: NormalizedCacheObject;
      page: PageQuery['page'];
      breadcrumbs: Breadcrumb[];
      collections: CollectionType[];
    }
  | {
      error?: {
        statusCode: number;
      };
    };

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(
    context,
    async (): Promise<GetStaticPropsResult<ResultProps>> => {
      try {
        const {
          currentPage: page,
          breadcrumbs,
          apolloClient,
        } = await getProps(context);
        if (!page) {
          // eslint-disable-next-line no-console
          console.warn(`Not found ${context.params?.slug}`);
          return {
            notFound: true,
          };
        }
        const language = getLanguageOrDefault(context.locale);
        // eslint-disable-next-line no-console
        console.debug(
          'pages/pages/[..slug].tsx',
          'getStaticProps',
          'getHobbiesStaticProps',
          `Revalidating ${page.uri}.`
        );
        return {
          props: {
            initialApolloState: apolloClient.cache.extract(),
            ...(await serverSideTranslationsWithCommon(language, ['cms'])),
            page,
            breadcrumbs,
            collections: getCollections(page.modules ?? []),
          },
          revalidate: AppConfig.defaultRevalidate,
        };
      } catch (e) {
        return {
          props: {
            error: {
              statusCode: 500,
            },
          },
          revalidate: 1,
        };
      }
    }
  );
}

const getProps = async (context: GetStaticPropsContext) => {
  const language = getLanguageOrDefault(context.locale);
  const { data: pageData } = await hobbiesApolloClient.query<
    PageQuery,
    PageQueryVariables
  >({
    query: PageDocument,
    variables: {
      id: _getURIQueryParameter(context.params?.slug as string[], language),
      // `idType: PageIdType.Uri // idType is`fixed in query, so added automatically
    },
    fetchPolicy: 'no-cache', // FIXME: network-only should work better, but for some reason it only updates once.
  });

  const currentPage = pageData.page;
  // TODO: Breadcrumbs are unstyled, so left disabled
  // const breadcrumbs = _getBreadcrumbs(
  //   apolloClient,
  //   (context.params?.slug ?? []) as string[]
  // );

  return { currentPage, breadcrumbs: [], apolloClient: hobbiesApolloClient };
};

/**
 * The Headless CMS URIs needs to have a contextpath as a part of the URI.
 * While the headless cms does not support prefixin the route,
 * a workaround is to add all the dynamic pages as subpages for a page with a slug "pages".
 * To embed this context path to the routes of Nextjs API without duplicating a path of an URI,
 * the pages context path needs to be added to the query.
 * @param slugs   a category URI splitted in slugs
 * @param locale  locale of the
 * @returns
 */
function _getURIQueryParameter(slugs: string[], locale: AppLanguage) {
  const uri = cmsHelper.getUriID(slugs, locale);
  if (uri.startsWith(AppConfig.cmsPagesContextPath)) {
    return uri;
  }
  // TODO: get rid of this context path prefix if headless cms supports it
  // The workaround for Headless CMS makes all the dynamic cms pages
  // to be subpages for a page with slug 'pages'
  return `${AppConfig.cmsPagesContextPath}${uri}`;
}

// async function _getBreadcrumbs(
//   cmsClient: ApolloClient<NormalizedCacheObject>,
//   slugs: string[]
// ) {
//   // Fetch all parent pages for navigation data.
//   // These breadcrumb uris are used to fetch all the parent pages of the current page
//   // so that all the childrens of parent page can be figured out and sub page navigations can be formed
//   // for rendering
//   const uriSegments = slugsToUriSegments(slugs);
//   const apolloPageResponses = await Promise.all(
//     uriSegments.map((uri) => {
//       return cmsClient.query<PageQuery, PageQueryVariables>({
//         query: PageDocument,
//         variables: {
//           id: uri,
//         },
//       });
//     })
//   );
//   const pages = apolloPageResponses.map((res) => res.data.page);
//   const breadcrumbs = pages.map((page) => ({
//     link: page?.link ?? '',
//     title: page?.title ?? '',
//   }));
//   return breadcrumbs;
// }

export default NextCmsPage;
