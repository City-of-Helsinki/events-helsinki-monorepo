/* eslint-disable @typescript-eslint/no-explicit-any */
import { NetworkStatus } from '@apollo/client';
import {
  getQlLanguage,
  NavigationContext,
  skipFalsyType,
  useCmsTranslation,
  useDebounce,
  Navigation,
  useCommonTranslation,
  MatomoWrapper,
  FooterSection,
  getLanguageOrDefault,
  useErrorBoundary,
} from 'events-helsinki-components';
import type { GetStaticPropsContext } from 'next';
import React, { useContext } from 'react';
import {
  Page as RHHCPage,
  Card,
  LargeCard,
  SearchPageContent,
  useConfig,
  TemplateEnum,
} from 'react-helsinki-headless-cms';
import type {
  ArticleType,
  LanguageCodeFilterEnum,
  PageType,
} from 'react-helsinki-headless-cms';
import {
  useCategoriesQuery,
  PageByTemplateDocument,
  usePostsQuery,
} from 'react-helsinki-headless-cms/apollo';
import type {
  PageByTemplateQuery,
  PageByTemplateQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import type { SportsGlobalPageProps } from '../../domain/app/getSportsStaticProps';
import getSportsStaticProps from '../../domain/app/getSportsStaticProps';
import cmsHelper from '../../domain/app/headlessCmsHelper';
import ArticleDetails from '../../domain/article/articleDetails/ArticleDetails';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';

const CATEGORIES_AMOUNT = 20;
const BLOCK_SIZE = 10;
const SEARCH_DEBOUNCE_TIME = 500;

export default function ArticleArchive({
  page,
}: SportsGlobalPageProps & { page: PageType }) {
  const { t } = useCmsTranslation();
  const { t: commonT } = useCommonTranslation();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchCategories, setSearchCategories] = React.useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_TIME);
  const {
    currentLanguageCode,
    utils: { getRoutedInternalHref },
  } = useConfig();
  const {
    data: articlesData,
    fetchMore,
    loading: loadingArticles,
    networkStatus,
    error: articlesError,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      first: BLOCK_SIZE,
      search: debouncedSearchTerm ?? '',
      language: currentLanguageCode as unknown as LanguageCodeFilterEnum,
      categories: searchCategories,
    },
  });
  useErrorBoundary(articlesError);
  const {
    data: categoriesData,
    loading: loadingCategories,
    error: categoriesError,
  } = useCategoriesQuery({
    variables: {
      first: CATEGORIES_AMOUNT,
      language: currentLanguageCode as unknown as LanguageCodeFilterEnum,
    },
  });
  useErrorBoundary(categoriesError);
  const isLoading =
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

  // Show the first item large when the search has not yet done
  const showFirstItemLarge = searchTerm.length === 0;

  const { footerMenu } = useContext(NavigationContext);

  return (
    <MatomoWrapper>
      <RHHCPage
        className="pageLayout"
        navigation={<Navigation page={page} />}
        content={
          <SearchPageContent
            title={t('cms:archiveSearch.title')}
            description={t('cms:archiveSearch.description')}
            className="articlesArchive"
            noResults={!isLoading && articles?.length === 0}
            items={articles}
            tags={categories}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onSearch={(freeSearch, tags) => {
              // TODO: Instead of doing this through yet another state, could the query just be updated?
              setSearchTerm(freeSearch);
              // NOTE: For some reason the CMS needs database ids here instead of ids or slugs.
              setSearchCategories(
                tags
                  .filter(skipFalsyType)
                  .map((tag) => tag?.databaseId.toString())
              );
            }}
            onLoadMore={() => {
              fetchMoreArticles();
            }}
            largeFirstItem={showFirstItemLarge}
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
                          .map((category: any) => category?.node?.name || '') ||
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
                  // todo: fix any type
                  customContent={
                    <ArticleDetails
                      keywords={
                        itemCategories?.edges
                          ?.filter((category: any) => category?.node?.name)
                          .map((category: any) => category?.node?.name || '') ||
                        []
                      }
                    />
                  }
                />
              );
            }}
            hasMore={hasMoreToLoad}
            isLoading={isLoading || isLoadingMore}
          />
        }
        footer={
          <FooterSection
            menu={footerMenu}
            appName={commonT('appSports:appName')}
          />
        }
      />
    </MatomoWrapper>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSportsStaticProps(context, async ({ apolloClient }) => {
    const language = getLanguageOrDefault(context.locale);
    const { data: pageData } = await apolloClient.query<
      PageByTemplateQuery,
      PageByTemplateQueryVariables
    >({
      query: PageByTemplateDocument,
      variables: {
        template: TemplateEnum.PostsPage,
        language: getQlLanguage(language).toLocaleLowerCase(),
      },
    });
    if (!pageData) {
      return {
        notFound: true,
        revalidate: true,
      };
    }
    const page = pageData.pageByTemplate;
    return {
      props: {
        page,
        ...(await serverSideTranslationsWithCommon(language, ['home', 'cms'])),
      },
    };
  });
}
