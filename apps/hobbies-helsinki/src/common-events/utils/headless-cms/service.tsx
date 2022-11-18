import type { PageInfo } from 'events-helsinki-components';
import type { ArticleType, PageType } from 'react-helsinki-headless-cms';
import type {
  // MenuQuery,
  // MenuQueryVariables,
  // MenuDocument,
  // PageQuery,
  // PageQueryVariables,
  // PageDocument,
  PostsQuery,
  PostsQueryVariables,
  PagesQuery,
  PagesQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import {
  PostsDocument,
  PagesDocument,
} from 'react-helsinki-headless-cms/apollo';

import { createCmsApolloClient } from '../../../domain/clients/cmsApolloClient';

export const ARTICLES_AMOUNT_LIMIT = 100;
export const PAGES_AMOUNT_LIMIT = 100;

export const getAllArticles = async (): Promise<PageInfo[]> => {
  const pageInfos: PageInfo[] = [];
  const cmsClient = createCmsApolloClient();
  const { data: articlesData } = await cmsClient.query<
    PostsQuery,
    PostsQueryVariables
  >({
    query: PostsDocument,
    variables: {
      first: ARTICLES_AMOUNT_LIMIT,
    },
  });
  articlesData.posts?.edges?.forEach((edge) =>
    addArticleToPageInfosArray(edge?.node as ArticleType)
  );
  return pageInfos;

  function addArticleToPageInfosArray(node: ArticleType) {
    if (node && node.uri && node.slug && node.language?.code) {
      pageInfos.push({
        uri: node.uri,
        locale: node.language.code.toLowerCase(),
        slug: node.slug,
      });
      node.translations?.forEach((translation: PageType['translations']) => {
        if (
          translation?.uri &&
          translation.slug &&
          translation.language?.code
        ) {
          const {
            uri,
            slug,
            language: { code },
          } = translation;
          pageInfos.push({
            uri,
            slug,
            locale: code.toLocaleLowerCase(),
          });
        }
      });
    }
  }
};

export const getAllPages = async (): Promise<PageInfo[]> => {
  const pageInfos: PageInfo[] = [];
  const cmsClient = createCmsApolloClient();
  const { data: pagesData } = await cmsClient.query<
    PagesQuery,
    PagesQueryVariables
  >({
    query: PagesDocument,
    variables: {
      first: PAGES_AMOUNT_LIMIT,
    },
  });
  pagesData.pages?.edges?.forEach((edge) =>
    addPagesToPageInfosArray(edge?.node as PageType)
  );
  return pageInfos;

  // eslint-disable-next-line sonarjs/no-identical-functions
  function addPagesToPageInfosArray(node: PageType) {
    if (node && node.uri && node.slug && node.language?.code) {
      pageInfos.push({
        uri: node.uri,
        locale: node.language.code.toLowerCase(),
        slug: node.slug,
      });
      node.translations?.forEach((translation: PageType['translations']) => {
        if (
          translation?.uri &&
          translation.slug &&
          translation.language?.code
        ) {
          const {
            uri,
            slug,
            language: { code },
          } = translation;
          pageInfos.push({
            uri,
            slug,
            locale: code.toLocaleLowerCase(),
          });
        }
      });
    }
  }
};
