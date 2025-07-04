import type { NormalizedCacheObject } from '@apollo/client';
import type {
  AppLanguage,
  PreviewDataObject,
} from '@events-helsinki/components';
import {
  NavigationContext,
  Navigation,
  useResilientTranslation,
  FooterSection,
  getLanguageOrDefault,
  RouteMeta,
  getFilteredBreadcrumbs,
  PageMeta,
  PreviewNotification,
  getAllCmsPagesPageUriInfos,
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
  Page as RHHCPage,
  useConfig,
  getBreadcrumbsFromPage,
} from 'react-helsinki-headless-cms';
import type {
  PageQuery,
  PageQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import { PageDocument } from 'react-helsinki-headless-cms/apollo';
import AppConfig from '../../domain/app/AppConfig';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import cmsHelper from '../../domain/app/headlessCmsHelper';
import { sportsApolloClient } from '../../domain/clients/sportsApolloClient';
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

  // FIXME: Return null to fix SSR rendering for notFound-page.
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
          appName={resilientT('appSports:appName')}
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

  const pagePageInfos = await getAllCmsPagesPageUriInfos(sportsApolloClient);
  const paths = pagePageInfos.reduce(
    (acc: { params: { slug: string[] }; locale: AppLanguage }[], pageInfo) => {
      const slug = cmsHelper.getSlugFromUri(pageInfo.uri);
      // Add to paths only if slug exists and is not empty
      if (slug && slug.length > 0) {
        acc.push({
          params: { slug },
          locale: pageInfo.locale as AppLanguage,
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
      initialApolloState: NormalizedCacheObject;
      page: PageQuery['page'];
      breadcrumbs?: BreadcrumbListItem[];
      collections: CollectionType[];
      previewToken: string;
    }
  | {
      error?: {
        statusCode: number;
      };
    };

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(
    context,
    async (): Promise<GetStaticPropsResult<ResultProps>> => {
      try {
        const previewData = context.previewData as PreviewDataObject;
        const language = getLanguageOrDefault(context.locale);
        const id = _getURIQueryParameter(
          context.params?.slug as string[],
          language
        );
        const { data: pageData } = await sportsApolloClient.query<
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
          'getSportsStaticProps',
          `Revalidating ${page.uri}.`
        );
        return {
          props: {
            previewToken: previewData?.token ?? '',
            initialApolloState: sportsApolloClient.cache.extract(),
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
