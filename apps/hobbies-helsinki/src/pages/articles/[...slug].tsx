import type { NormalizedCacheObject } from '@apollo/client';
import {
  KorosWrapper,
  NavigationContext,
  ShareLinks,
  getAllArticles,
  Navigation,
  useCommonTranslation,
  MatomoWrapper,
} from 'events-helsinki-components';
import type { AppLanguage } from 'events-helsinki-components';
import FooterSection from 'events-helsinki-components/components/footer/Footer';
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
import getHobbiesStaticProps from '../../domain/app/getHobbiesStaticProps';
import cmsHelper from '../../domain/app/headlessCmsHelper';
import routerHelper from '../../domain/app/routerHelper';
import { apolloClient } from '../../domain/clients/eventsFederationApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';

const NextCmsArticle: NextPage<{
  article: ArticleType;
  breadcrumbs: Breadcrumb[] | null;
  collections: CollectionType[];
}> = ({ article, breadcrumbs, collections }) => {
  const {
    utils: { getRoutedInternalHref },
  } = useConfig();

  const { t } = useCommonTranslation();
  const { footerMenu } = useContext(NavigationContext);

  return (
    <MatomoWrapper>
      <RHHCPage
        navigation={<Navigation page={article} />}
        content={
          <RHHCPageContent
            page={article as PageContentProps['page']}
            heroContainer={<KorosWrapper />}
            breadcrumbs={
              breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs : undefined
            }
            shareLinks={<ShareLinks title={t('common:share.article')} />}
            collections={
              collections
                ? cmsHelper.getDefaultCollections(
                    article,
                    getRoutedInternalHref
                  )
                : []
            }
          />
        }
        footer={
          <FooterSection menu={footerMenu} appName={t('appHobbies:appName')} />
        }
      />
    </MatomoWrapper>
  );
};

export async function getStaticPaths() {
  // NOTE: It might not be a good thing to use ApolloClient here,
  // since then the build process depends on external service.
  const articlePageInfos = await getAllArticles(apolloClient);
  const paths = articlePageInfos.map((pageInfo) => ({
    params: { slug: cmsHelper.getSlugFromUri(pageInfo.uri) },
    locale: pageInfo.locale,
  }));
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
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
  return getHobbiesStaticProps(
    context,
    async (): Promise<GetStaticPropsResult<ResultProps>> => {
      try {
        const {
          currentArticle: article,
          breadcrumbs,
          apolloClient,
        } = await getProps(context);

        if (!article) {
          return {
            notFound: true,
            revalidate: true,
          };
        }
        const locale = routerHelper.getLocaleOrError(context.locale);

        return {
          props: {
            initialApolloState: apolloClient.cache.extract(),
            ...(await serverSideTranslationsWithCommon(locale, [
              'cms',
              'event',
            ])),
            article,
            breadcrumbs,
            collections: getCollections(article.modules ?? []),
          },
          revalidate: 60,
        };
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error while generating content page', e);
        return {
          props: {
            error: {
              statusCode: 400,
            },
          },
          revalidate: 10,
        };
      }
    }
  );
}

const getProps = async (context: GetStaticPropsContext) => {
  const { data: articleData } = await apolloClient.query<
    ArticleQuery,
    ArticleQueryVariables
  >({
    query: ArticleDocument,
    variables: {
      id: _getURIQueryParameter(
        context.params?.slug as string[],
        context.locale as AppLanguage
      ),
      // `idType: PageIdType.Uri // idType is`fixed in query, so added automatically
    },
  });

  const currentArticle = articleData.post;

  // TODO: Breadcrumbs are unstyled, so left disabled
  const breadcrumbs: Breadcrumb[] = []; // await _getBreadcrumbs(cmsClient, currentArticle);

  return { currentArticle, breadcrumbs, apolloClient };
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
