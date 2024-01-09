import type { NormalizedCacheObject } from '@apollo/client';
import {
  NavigationContext,
  ShareLinks,
  getAllArticles,
  Navigation,
  useCommonTranslation,
  FooterSection,
  getLanguageOrDefault,
  useAppSportsTranslation,
  RouteMeta,
} from '@events-helsinki/components';
import type { AppLanguage } from '@events-helsinki/components';
import { logger } from '@events-helsinki/components/loggers/logger';
import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next';
import { useContext } from 'react';
import type {
  Breadcrumb,
  CollectionType,
  ArticleType,
} from 'react-helsinki-headless-cms';
import {
  getCollections,
  PageContent as RHHCPageContent,
  Page as RHHCPage,
  useConfig,
} from 'react-helsinki-headless-cms';
import type {
  ArticleQuery,
  ArticleQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import { ArticleDocument } from 'react-helsinki-headless-cms/apollo';
import AppConfig from '../../domain/app/AppConfig';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import cmsHelper from '../../domain/app/headlessCmsHelper';
import { sportsApolloClient } from '../../domain/clients/sportsApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';

const NextCmsArticle: NextPage<{
  article: ArticleType;
  breadcrumbs: Breadcrumb[] | null;
  collections: CollectionType[];
}> = ({ article, breadcrumbs, collections }) => {
  const {
    utils: { getRoutedInternalHref },
  } = useConfig();

  const { t: commonTranslation } = useCommonTranslation();
  const { t: appTranslation } = useAppSportsTranslation();
  const { footerMenu } = useContext(NavigationContext);

  // FIXME: Return null to fix SSR rendering for notFound-page.
  // This is needed only with fallback: true, but should not be needed at all.
  if (!article) return null;

  return (
    <RHHCPage
      className="article-page"
      navigation={<Navigation page={article} />}
      content={
        <>
          <RouteMeta origin={AppConfig.origin} page={article} />
          <RHHCPageContent
            page={article}
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
          appName={appTranslation('appSports:appName')}
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
      breadcrumbs: Breadcrumb[];
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

  const currentArticle = articleData.post;

  // TODO: Breadcrumbs are unstyled, so left disabled
  const breadcrumbs: Breadcrumb[] = []; // await _getBreadcrumbs(cmsClient, currentArticle);

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

// async function _getBreadcrumbs(
//   cmsClient: ApolloClient<NormalizedCacheObject>,
//   currentArticle: ArticleType
// ) {
//   // Fetch all parent pages for navigation data
//   const uriSegments = [ROUTES.ARTICLE_ARCHIVE];
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
//   const breadcrumbs = pages
//     .map((page) => ({
//       link: page?.link ?? '',
//       title: page?.title ?? '',
//     }))
//     .concat([
//       { link: currentArticle?.link ?? '', title: currentArticle?.title ?? '' },
//     ]);
//   return breadcrumbs;
// }

export default NextCmsArticle;
