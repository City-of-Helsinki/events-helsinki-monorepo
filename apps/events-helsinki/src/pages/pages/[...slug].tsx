import type { NormalizedCacheObject } from '@apollo/client/core/index.js';
import type {
  AppLanguage,
  PreviewDataObject,
} from '@events-helsinki/components';
import {
  useResilientTranslation,
  Navigation,
  NavigationContext,
  getAllCmsPagesPageUriInfos,
  getLanguageOrDefault,
  FooterSection,
  RouteMeta,
  getFilteredBreadcrumbs,
  PageMeta,
  PreviewNotification,
} from '@events-helsinki/components';
import { logger } from '@events-helsinki/components/loggers/logger';
import type { BreadcrumbListItem } from 'hds-react';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import type { CollectionType, PageType } from 'react-helsinki-headless-cms';
import {
  getCollections,
  getBreadcrumbsFromPage,
  Page as RHHCPage,
  useConfig,
} from 'react-helsinki-headless-cms';
import type {
  PageQuery,
  PageQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import { PageDocument } from 'react-helsinki-headless-cms/apollo';
import AppConfig from '../../domain/app/AppConfig';
import getEventsStaticProps from '../../domain/app/getEventsStaticProps';
import cmsHelper from '../../domain/app/headlessCmsHelper';
import { eventsApolloClient } from '../../domain/clients/eventsApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';

const NextCmsPage: NextPage<{
  previewToken: string;
  page: PageType;
  breadcrumbs: BreadcrumbListItem[] | null;
  collections: CollectionType[];
}> = ({ page, breadcrumbs, collections, previewToken }) => {
  const {
    utils: { getRoutedInternalHref },
  } = useConfig();
  const { footerMenu } = useContext(NavigationContext);
  const { resilientT } = useResilientTranslation();

  // NOTE: Return null to fix SSR rendering for notFound-page.
  // This is needed only with fallback: true, but should not be needed at all.
  if (!page) return null;

  const RHHCPageContentNoSSR = dynamic(
    () => import('react-helsinki-headless-cms').then((mod) => mod.PageContent),
    {
      ssr: false,
    }
  );

  return (
    <RHHCPage
      className="page"
      navigation={<Navigation page={page} />}
      content={
        <>
          <PreviewNotification token={previewToken} />
          <RouteMeta origin={AppConfig.origin} page={page} />
          <PageMeta
            {...page?.seo}
            image={page?.featuredImage?.node?.mediaItemUrl || ''}
          />
          <RHHCPageContentNoSSR
            page={page}
            breadcrumbs={
              breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs : undefined
            }
            collections={
              collections
                ? cmsHelper.getDefaultCollections(page, getRoutedInternalHref)
                : []
            }
          />
        </>
      }
      footer={
        <FooterSection
          menu={footerMenu}
          appName={resilientT('appEvents:appName')}
        />
      }
    />
  );
};

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<{ slug: string[] }>
> {
  // Do not prerender any static pages when in preview environment
  // (faster builds, but slower initial page load)
  if (AppConfig.skipBuildStaticGeneration) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const pagePageInfos = await getAllCmsPagesPageUriInfos(eventsApolloClient);
  const paths = pagePageInfos.reduce(
    (acc: { params: { slug: string[] }; locale: AppLanguage }[], pageInfo) => {
      const slug = cmsHelper.getSlugFromUri(pageInfo.uri);
      // Add to paths only if slug exists and is not empty
      if (slug && slug.length > 0) {
        acc.push({
          params: { slug },
          locale: pageInfo.locale,
        });
      }
      return acc;
    },
    []
  );
  return {
    paths,
    fallback: 'blocking',
  };
}

type ResultProps =
  | {
      previewToken: string;
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
  return getEventsStaticProps(
    context,
    async (): Promise<GetStaticPropsResult<ResultProps>> => {
      try {
        const language = getLanguageOrDefault(context.locale);
        const previewData = context.previewData as PreviewDataObject;
        const id = _getURIQueryParameter(
          context.params?.slug as string[],
          language
        );
        const { data: pageData } = await eventsApolloClient.query<
          PageQuery,
          PageQueryVariables
        >({
          query: PageDocument,
          variables: {
            id,
            // `idType: PageIdType.Uri // idType is`fixed in query, so added automatically
          },
          fetchPolicy: 'no-cache',
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
          logger.warn(`Not found ${context.params?.slug}, (id: ${id})`);
          return {
            notFound: true,
          };
        }

        const pageBreadcrumbs = getBreadcrumbsFromPage(page);
        const extendedBreadcrumbs = cmsHelper.withCurrentPageBreadcrumb(
          pageBreadcrumbs,
          page,
          language,
          context.preview
        );
        const breadcrumbs = getFilteredBreadcrumbs(extendedBreadcrumbs);

        logger.info(
          'pages/pages/[...slug].tsx',
          'getStaticProps',
          'getEventsStaticProps',
          `Revalidating ${page.uri}.`
        );
        return {
          props: {
            previewToken: previewData?.token ?? '',
            initialApolloState: eventsApolloClient.cache.extract(),
            ...(await serverSideTranslationsWithCommon(language, ['event'])),
            page,
            breadcrumbs,
            collections: getCollections(page.modules ?? []),
          },
          revalidate: AppConfig.defaultRevalidate,
        };
      } catch (e) {
        logger.error('Error while generating content page', e);
        return {
          props: {
            error: {
              statusCode: 400,
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
