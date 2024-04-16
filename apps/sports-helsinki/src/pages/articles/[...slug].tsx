import type { NormalizedCacheObject } from '@apollo/client';
import {
  NavigationContext,
  ShareLinks,
  getAllArticles,
  Navigation,
  useCommonTranslation,
  FooterSection,
  getLanguageOrDefault,
  useResilientTranslation,
  RouteMeta,
  getLanguageCodeFilter,
  getFilteredBreadcrumbs,
  TemplateEnum,
  getQlLanguage,
  defaultArticleArchiveBreadcrumbTitle,
  PageByTemplateBreadcrumbTitleDocument,
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
import { useRouter } from 'next/router';
import { useContext } from 'react';
import type { CollectionType, ArticleType } from 'react-helsinki-headless-cms';
import {
  getCollections,
  PageContent as RHHCPageContent,
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
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import cmsHelper from '../../domain/app/headlessCmsHelper';
import { sportsApolloClient } from '../../domain/clients/sportsApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';

const CATEGORIES_AMOUNT = 20;

const NextCmsArticle: NextPage<{
  article: ArticleType;
  breadcrumbs: BreadcrumbListItem[] | null;
  collections: CollectionType[];
}> = ({ article, breadcrumbs, collections }) => {
  const router = useRouter();
  const {
    currentLanguageCode,
    utils: { getRoutedInternalHref },
  } = useConfig();

  const { t: commonTranslation } = useCommonTranslation();
  const { resilientT } = useResilientTranslation();
  const { footerMenu } = useContext(NavigationContext);

  const { data: categoriesData, loading: loadingCategories } =
    useCategoriesQuery({
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
  if (!article || loadingCategories) return null;

  return (
    <RHHCPage
      className="article-page"
      navigation={<Navigation page={article} />}
      content={
        <>
          <RouteMeta origin={AppConfig.origin} page={article} />
          <RHHCPageContent
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
          appName={resilientT('appSports:appName')}
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

  const articlePageInfos = await getAllArticles(sportsApolloClient);
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
  return getSportsStaticProps(
    context,
    async (): Promise<GetStaticPropsResult<ResultProps>> => {
      try {
        const {
          currentArticle: article,
          breadcrumbs,
          apolloClient,
        } = await getProps(context);

        if (!article) {
          logger.warn(`Not found ${context.params?.slug}`);
          return {
            notFound: true,
          };
        }
        const language = getLanguageOrDefault(context.locale);
        logger.info(
          'pages/articles/[...slug].tsx',
          'getStaticProps',
          'getSportsStaticProps',
          `Revalidating ${article.uri}.`
        );
        return {
          props: {
            initialApolloState: apolloClient.cache.extract(),
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

const getProps = async (context: GetStaticPropsContext) => {
  const language = getLanguageOrDefault(context.locale);

  const previewData = context.previewData as PreviewDataObject;
  const { data: articleData } = await sportsApolloClient.query<
    ArticleQuery,
    ArticleQueryVariables
  >({
    query: ArticleDocument,
    variables: {
      id: _getURIQueryParameter(context.params?.slug as string[], language),
      // `idType: PageIdType.Uri // idType is`fixed in query, so added automatically
    },
    fetchPolicy: 'no-cache', // FIXME: network-only should work better, but for some reason it only updates once.
  });

  const { data: articleArchiveTitleData } = await sportsApolloClient.query<
    PageByTemplateBreadcrumbTitleQuery,
    PageByTemplateBreadcrumbTitleQueryVariables
  >({
    query: PageByTemplateBreadcrumbTitleDocument,
    variables: {
      template: TemplateEnum.PostsPage,
      language: getQlLanguage(language).toLocaleLowerCase(),
    },
    ...(previewData?.token && {
      context: {
        headers: {
          authorization: previewData.token,
        },
      },
    }),
  });

  const currentArticle = articleData.post;

  const breadcrumbs = cmsHelper.withArticleArchiveBreadcrumb(
    getFilteredBreadcrumbs(getBreadcrumbsFromPage(currentArticle)),
    articleArchiveTitleData?.pageByTemplate?.title ??
      defaultArticleArchiveBreadcrumbTitle[language]
  );

  return { currentArticle, breadcrumbs, apolloClient: sportsApolloClient };
};

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
