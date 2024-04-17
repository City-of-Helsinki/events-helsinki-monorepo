/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { NormalizedCacheObject } from '@apollo/client';
import type {
  AppLanguage,
  PreviewDataObject,
} from '@events-helsinki/components';
import {
  NavigationContext,
  getAllPages,
  useResilientTranslation,
  FooterSection,
  getLanguageOrDefault,
  RouteMeta,
  getFilteredBreadcrumbs,
  usePreview,
} from '@events-helsinki/components';
import { logger } from '@events-helsinki/components/loggers/logger';
import type { BreadcrumbListItem } from 'hds-react';
import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next';
import { useContext } from 'react';
import type { CollectionType, PageType } from 'react-helsinki-headless-cms';
import {
  getCollections,
  PageContent as RHHCPageContent,
  Page as RHHCPage,
  useConfig,
  getBreadcrumbsFromPage,
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
  preview: boolean;
  page: PageType;
  breadcrumbs: BreadcrumbListItem[] | null;
  collections: CollectionType[];
}> = ({ page, breadcrumbs, collections, preview }) => {
  const {
    utils: { getRoutedInternalHref },
  } = useConfig();
  const { footerMenu } = useContext(NavigationContext);
  const { resilientT } = useResilientTranslation();
  usePreview(resilientT('page:preview'), preview);

  // FIXME: Return null to fix SSR rendering for notFound-page.
  // This is needed only with fallback: true, but should not be needed at all.
  if (!page) return null;

  return (
    <RHHCPage
      className="page"
      navigation={<Navigation page={page} />}
      content={
        <>
          <RouteMeta origin={AppConfig.origin} page={page} />
          <RHHCPageContent
            page={page}
            collections={
              collections
                ? cmsHelper.getDefaultCollections(page, getRoutedInternalHref)
                : []
            }
            breadcrumbs={
              breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs : undefined
            }
          />
        </>
      }
      footer={
        <FooterSection
          menu={footerMenu}
          appName={resilientT('appHobbies:appName')}
        />
      }
    />
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
      preview: boolean;
      initialApolloState: NormalizedCacheObject;
      page: PageQuery['page'];
      breadcrumbs?: BreadcrumbListItem[];
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
        const language = getLanguageOrDefault(context.locale);
        const previewData = context.previewData as PreviewDataObject;
        const { data: pageData } = await hobbiesApolloClient.query<
          PageQuery,
          PageQueryVariables
        >({
          query: PageDocument,
          variables: {
            id: _getURIQueryParameter(
              context.params?.slug as string[],
              language
            ),
            // `idType: PageIdType.Uri // idType is`fixed in query, so added automatically
          },
          fetchPolicy: 'no-cache', // FIXME: network-only should work better, but for some reason it only updates once.
          ...(previewData?.token && {
            context: {
              headers: {
                authorization: previewData.token,
              },
            },
          }),
        });

        const page = pageData.page;

        if (!page) {
          logger.warn(`Not found ${context.params?.slug}`);
          return {
            notFound: true,
          };
        }

        const breadcrumbs = getFilteredBreadcrumbs(
          getBreadcrumbsFromPage(page)
        );

        logger.info(
          'pages/pages/[...slug].tsx',
          'getStaticProps',
          'getHobbiesStaticProps',
          `Revalidating ${page.uri}.`
        );
        return {
          props: {
            preview: Boolean(previewData?.token),
            initialApolloState: hobbiesApolloClient.cache.extract(),
            ...(await serverSideTranslationsWithCommon(language, ['event'])),
            page,
            breadcrumbs,
            collections: getCollections(page.modules ?? []),
          },
          revalidate: AppConfig.defaultRevalidate,
        };
      } catch (e) {
        return {
          props: {
            preview: false,
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

export default NextCmsPage;
