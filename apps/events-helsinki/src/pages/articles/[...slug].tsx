import type { NormalizedCacheObject } from '@apollo/client';
import {
  NavigationContext,
  ShareLinks,
  getAllArticles,
  Navigation,
  useCommonTranslation,
  FooterSection,
  getLanguageOrDefault,
  RouteMeta,
  getLanguageCodeFilter,
  useResilientTranslation,
  getFilteredBreadcrumbs,
  TemplateEnum,
  getQlLanguage,
  defaultArticleArchiveBreadcrumbTitle,
  PageByTemplateBreadcrumbTitleDocument,
  PageMeta,
  PreviewNotification,
} from '@events-helsinki/components';
import type {
  AppLanguage,
  PageByTemplateBreadcrumbTitleQuery,
  PageByTemplateBreadcrumbTitleQueryVariables,
  PreviewDataObject,
} from '@events-helsinki/components';
import { logger } from '@events-helsinki/components/loggers/logger';
import type { BreadcrumbListItem } from 'hds-react';
import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import type { CollectionType, ArticleType } from 'react-helsinki-headless-cms';
import {
  getCollections,
  Page as RHHCPage,
  useConfig,
  getBreadcrumbsFromPage,
} from 'react-helsinki-headless-cms';
import type {
  ArticleQuery,
  ArticleQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import {
  ArticleDocument,
  useCategoriesQuery,
} from 'react-helsinki-headless-cms/apollo';
import { ROUTES } from '../../constants';
import AppConfig from '../../domain/app/AppConfig';
import getEventsStaticProps from '../../domain/app/getEventsStaticProps';
import cmsHelper from '../../domain/app/headlessCmsHelper';
import { eventsApolloClient } from '../../domain/clients/eventsApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';

const CATEGORIES_AMOUNT = 20;

const NextCmsArticle: NextPage<{
  previewToken: string;
  article: ArticleType;
  breadcrumbs: BreadcrumbListItem[] | null;
  collections: CollectionType[];
}> = ({ article, breadcrumbs, collections, previewToken }) => {
  const router = useRouter();
  const {
    currentLanguageCode,
    utils: { getRoutedInternalHref },
  } = useConfig();

  const { t: commonTranslation } = useCommonTranslation();
  const { resilientT } = useResilientTranslation();

  const { footerMenu } = useContext(NavigationContext);

  const { data: categoriesData } = useCategoriesQuery({
    variables: {
      first: CATEGORIES_AMOUNT,
      language: getLanguageCodeFilter(currentLanguageCode),
    },
  });

  const categories = categoriesData?.categories?.nodes ?? [];

  const handleArticlesSearch = (tag: string) => {
    const categoryId = categories?.find(
      (category) => category?.id.toString() === tag
    )?.databaseId;
    if (categoryId) {
      router.push(
        `/${(currentLanguageCode as string).toLowerCase()}${
          ROUTES.ARTICLE_ARCHIVE
        }?tags=${categoryId}`
      );
    }
  };

  // FIXME: Return null to fix SSR rendering for notFound-page.
  // This is needed only with fallback: true, but should not be needed at all.
  if (!article) return null;

  const RHHCPageContentNoSSR = dynamic(
    () => import('react-helsinki-headless-cms').then((mod) => mod.PageContent),
    {
      ssr: false,
    }
  );

  return (
    <RHHCPage
      className="article-page"
      navigation={<Navigation page={article} />}
      content={
        <>
          <PreviewNotification token={previewToken} />
          <RouteMeta origin={AppConfig.origin} page={article} />
          <PageMeta
            {...article?.seo}
            image={article?.featuredImage?.node?.mediaItemUrl || ''}
          />
          <RHHCPageContentNoSSR
            page={article}
            onArticlesSearch={handleArticlesSearch}
            breadcrumbs={
              breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs : undefined
            }
            shareLinks={
              <ShareLinks title={commonTranslation('common:share.article')} />
            }
            collections={
              collections
                ? cmsHelper.getDefaultCollections(
                    article,
                    getRoutedInternalHref
                  )
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

export async function getStaticPaths() {
  // Do not prerender any static pages when in preview environment
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const articlePageInfos = await getAllArticles(eventsApolloClient);
  const paths = articlePageInfos.map((pageInfo) => ({
    params: { slug: cmsHelper.getSlugFromUri(pageInfo.uri) },
    locale: pageInfo.locale,
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}

type ResultProps =
  | {
      previewToken: string;
      initialApolloState: NormalizedCacheObject;
      article: ArticleQuery['post'];
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
        const { data: articleData } = await eventsApolloClient.query<
          ArticleQuery,
          ArticleQueryVariables
        >({
          query: ArticleDocument,
          variables: {
            id: _getURIQueryParameter(
              context.params?.slug as string[],
              getLanguageOrDefault(context.locale)
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

        const { data: articleArchiveTitleData } =
          await eventsApolloClient.query<
            PageByTemplateBreadcrumbTitleQuery,
            PageByTemplateBreadcrumbTitleQueryVariables
          >({
            query: PageByTemplateBreadcrumbTitleDocument,
            variables: {
              template: TemplateEnum.PostsPage,
              language: getQlLanguage(language).toLocaleLowerCase(),
            },
          });

        const article = articleData.post;

        if (!article) {
          logger.warn(`Not found ${context.params?.slug}`);
          return {
            notFound: true,
          };
        }

        const pageBreadcrumbs = getBreadcrumbsFromPage(article);
        const extendedBreadcrumbs = cmsHelper.withCurrentPageBreadcrumb(
          pageBreadcrumbs,
          article,
          language,
          context.preview
        );

        const breadcrumbs = cmsHelper.withArticleArchiveBreadcrumb(
          getFilteredBreadcrumbs(extendedBreadcrumbs),
          articleArchiveTitleData?.pageByTemplate?.title ??
            defaultArticleArchiveBreadcrumbTitle[language],
          language
        );

        logger.info(
          'pages/articles/[...slug].tsx',
          'getStaticProps',
          'getEventsStaticProps',
          `Revalidating ${article.uri}.`
        );
        return {
          props: {
            previewToken: previewData?.token ?? '',
            initialApolloState: eventsApolloClient.cache.extract(),
            ...(await serverSideTranslationsWithCommon(language, ['event'])),
            article,
            breadcrumbs,
            collections: getCollections(article.modules ?? []),
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
 * The Headless CMS needs the contextpath as a part of the URI
 * when it's included in the path that is set in article URL settings.
 * @param slugs   a category URI splitted in slugs
 * @param locale  locale of the
 * @returns
 */
function _getURIQueryParameter(slugs: string[], locale: AppLanguage) {
  const uri = cmsHelper.getUriID(slugs, locale);
  if (uri.startsWith(AppConfig.cmsArticlesContextPath)) {
    return uri;
  }
  // TODO: get rid of this context path prefix if headless cms supports it
  // The Headless CMS needs the contextpath as a part of the URI
  // when it's included in the article URL settings
  return `${AppConfig.cmsArticlesContextPath}${uri}`;
}

export default NextCmsArticle;
