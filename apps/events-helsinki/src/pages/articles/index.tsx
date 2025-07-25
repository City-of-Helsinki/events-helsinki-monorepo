/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ParsedUrlQueryInput } from 'querystring';
import { NetworkStatus } from '@apollo/client/core/index.js';
import type { PreviewDataObject } from '@events-helsinki/components';
import {
  getQlLanguage,
  NavigationContext,
  skipFalsyType,
  Navigation,
  FooterSection,
  getLanguageOrDefault,
  RouteMeta,
  getLanguageCodeFilter,
  useResilientTranslation,
  getFilteredBreadcrumbs,
  PageMeta,
  PreviewNotification,
} from '@events-helsinki/components';
import type { BreadcrumbListItem } from 'hds-react';
import type { GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { useContext } from 'react';
import {
  Page as RHHCPage,
  Card,
  LargeCard,
  useConfig,
  TemplateEnum,
  getBreadcrumbsFromPage,
} from 'react-helsinki-headless-cms';
import type { ArticleType, PageType } from 'react-helsinki-headless-cms';
import {
  useCategoriesQuery,
  PageByTemplateDocument,
  usePostsQuery,
} from 'react-helsinki-headless-cms/apollo';
import type {
  PageByTemplateQuery,
  PageByTemplateQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import AppConfig from '../../domain/app/AppConfig';
import type { EventsGlobalPageProps } from '../../domain/app/getEventsStaticProps';
import getEventsStaticProps from '../../domain/app/getEventsStaticProps';
import cmsHelper from '../../domain/app/headlessCmsHelper';
import ArticleDetails from '../../domain/article/articleDetails/ArticleDetails';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';

const CATEGORIES_AMOUNT = 20;
const BLOCK_SIZE = 10;

interface ArticleFilters {
  text?: string | null;
  tags?: string[];
}

export default function ArticleArchive({
  previewToken,
  page,
  breadcrumbs,
}: EventsGlobalPageProps & {
  previewToken: string;
  page: PageType;
  breadcrumbs?: BreadcrumbListItem[];
}) {
  const router = useRouter();
  const { resilientT } = useResilientTranslation();

  const getArticlesSearchQuery = (
    text: string,
    tags: string
  ): ParsedUrlQueryInput => {
    const query: ParsedUrlQueryInput = {};
    if (text) {
      query.text = text;
    }
    if (tags) {
      query.tags = tags;
    }

    return query;
  };

  const searchParams = new URLSearchParams(queryString.stringify(router.query));

  const text = searchParams.get('text');
  const tags = searchParams.get('tags')?.split(',');

  const searchFilters: ArticleFilters | null = React.useMemo(() => {
    return router.isReady
      ? {
          text,
          tags,
        }
      : null;
  }, [router, text, tags]);

  const {
    currentLanguageCode,
    utils: { getRoutedInternalHref },
  } = useConfig();

  const {
    data: articlesData,
    fetchMore,
    loading: loadingArticles,
    networkStatus,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    // does not work without fetchPolicy: 'network-only',
    fetchPolicy: 'network-only',
    // not sure if nextFetchPolicy is needed
    nextFetchPolicy: 'cache-first',
    variables: {
      first: BLOCK_SIZE,
      search: searchFilters?.text ?? '',
      language: getLanguageCodeFilter(currentLanguageCode),
      categories: searchFilters?.tags ?? [],
    },
  });

  const { data: categoriesData, loading: loadingCategories } =
    useCategoriesQuery({
      variables: {
        first: CATEGORIES_AMOUNT,
        language: getLanguageCodeFilter(currentLanguageCode),
      },
    });

  const isLoading =
    !searchFilters ||
    (loadingArticles && networkStatus !== NetworkStatus.fetchMore) ||
    loadingCategories;
  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;
  const pageInfo = articlesData?.posts?.pageInfo;
  const hasMoreToLoad = pageInfo?.hasNextPage ?? false;

  const fetchMoreArticles = async () => {
    if (hasMoreToLoad) {
      await fetchMore({
        variables: {
          first: BLOCK_SIZE,
          after: pageInfo?.endCursor,
        },
      });
    }
  };

  const articles = articlesData?.posts?.edges?.map((edge) => edge?.node).flat();
  const categories = categoriesData?.categories?.nodes ?? [];
  const currentCategories = categories.filter((category) =>
    tags?.includes(category.databaseId.toString())
  );

  const { footerMenu } = useContext(NavigationContext);

  const SearchPageContentNoSSR = dynamic(
    () =>
      import('react-helsinki-headless-cms').then(
        (mod) => mod.SearchPageContent
      ),
    {
      ssr: false,
    }
  );

  return (
    <RHHCPage
      className="pageLayout"
      navigation={<Navigation page={page} />}
      content={
        <>
          <PreviewNotification token={previewToken} />
          <RouteMeta origin={AppConfig.origin} page={page} />
          <PageMeta
            {...page?.seo}
            image={page?.featuredImage?.node?.mediaItemUrl || ''}
          />
          <SearchPageContentNoSSR
            breadcrumbs={breadcrumbs}
            page={page}
            isLoading={isLoading || isLoadingMore}
            className="articlesArchive"
            noResults={!isLoading && articles?.length === 0}
            items={!isLoading ? articles : []}
            tags={categories}
            currentTags={currentCategories}
            currentText={text ?? ''}
            withQuery
            onSearch={(freeSearch, tags) => {
              const query: ParsedUrlQueryInput = getArticlesSearchQuery(
                freeSearch,
                tags
                  .filter(skipFalsyType)
                  .map((tag) => tag?.databaseId.toString())
                  .join(',')
              );
              router.replace(
                {
                  query,
                },
                undefined,
                { shallow: true }
              );
            }}
            onLoadMore={() => {
              fetchMoreArticles();
            }}
            largeFirstItem={true}
            createLargeCard={(item) => {
              const cardItem = item as ArticleType;
              const itemCategories = cardItem?.categories;
              return (
                <LargeCard
                  key={`lg-card-${item?.id}`}
                  {...cmsHelper.getArticlePageCardProps(
                    item as ArticleType,
                    getRoutedInternalHref
                  )}
                  // todo: fix any type
                  customContent={
                    <ArticleDetails
                      keywords={
                        itemCategories?.edges
                          ?.filter((category: any) => category?.node?.name)
                          .map((category: any) => category?.node?.name || '') ??
                        []
                      }
                    />
                  }
                />
              );
            }}
            createCard={(item) => {
              const cardItem = item as ArticleType;
              const itemCategories = cardItem?.categories;
              return (
                <Card
                  key={`sm-card-${item?.id}`}
                  {...{
                    ...cmsHelper.getArticlePageCardProps(
                      item as ArticleType,
                      getRoutedInternalHref
                    ),

                    text: '', // A design decision: The text is not wanted in the small cards
                  }}
                  customContent={
                    <ArticleDetails
                      keywords={
                        itemCategories?.edges
                          ?.filter((category: any) => category?.node?.name)
                          .map((category: any) => category?.node?.name || '') ??
                        []
                      }
                    />
                  }
                />
              );
            }}
            hasMore={hasMoreToLoad}
          />
        </>
      }
      footer={
        <FooterSection
          menu={footerMenu}
          appName={resilientT('appEvents:appName')}
          feedbackWithPadding
        />
      }
    />
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getEventsStaticProps(context, async ({ apolloClient }) => {
    const language = getLanguageOrDefault(context.locale);

    const previewData = context.previewData as PreviewDataObject;
    const { data: pageData } = await apolloClient.query<
      PageByTemplateQuery,
      PageByTemplateQueryVariables
    >({
      query: PageByTemplateDocument,
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
    if (!pageData) {
      return {
        notFound: true,
      };
    }
    const page = pageData.pageByTemplate;

    const pageBreadcrumbs = getBreadcrumbsFromPage(page);
    const extendedBreadcrumbs = cmsHelper.withCurrentPageBreadcrumb(
      pageBreadcrumbs,
      page,
      language,
      context.preview
    );
    const breadcrumbs = getFilteredBreadcrumbs(extendedBreadcrumbs);

    return {
      props: {
        previewToken: previewData?.token ?? '',
        page,
        breadcrumbs,
        ...(await serverSideTranslationsWithCommon(language, ['event'])),
      },
    };
  });
}
