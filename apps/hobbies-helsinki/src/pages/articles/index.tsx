/* eslint-disable @typescript-eslint/no-explicit-any */
import { NetworkStatus } from '@apollo/client';
import {
  getQlLanguage,
  skipFalsyType,
  useDebounce,
} from 'events-helsinki-components';
import type { GetStaticPropsContext } from 'next';
import React from 'react';
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

import Navigation from '../../common-events/components/navigation/Navigation';
import { getArticlePageCardProps } from '../../common-events/utils/headless-cms/headlessCmsUtils';
import type { HobbiesGlobalPageProps } from '../../domain/app/getHobbiesStaticProps';
import getHobbiesStaticProps from '../../domain/app/getHobbiesStaticProps';
import ArticleDetails from '../../domain/article/articleDetails/ArticleDetails';
import { useCmsApollo } from '../../domain/clients/cmsApolloClient';
import FooterSection from '../../domain/footer/Footer';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import MatomoWrapper from '../../domain/matomoWrapper/MatomoWrapper';
import { getLocaleOrError } from '../../utils/routerUtils';

const CATEGORIES_AMOUNT = 20;
const BLOCK_SIZE = 10;
const SEARCH_DEBOUNCE_TIME = 500;

export default function ArticleArchive({
  initialApolloState,
  page,
}: HobbiesGlobalPageProps & { page: PageType }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchCategories, setSearchCategories] = React.useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_TIME);
  const cmsClient = useCmsApollo(initialApolloState);
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
    client: cmsClient,
    notifyOnNetworkStatusChange: true,
    variables: {
      first: BLOCK_SIZE,
      search: debouncedSearchTerm ?? '',
      language: currentLanguageCode as unknown as LanguageCodeFilterEnum,
      categories: searchCategories,
    },
  });
  const { data: categoriesData, loading: loadingCategories } =
    useCategoriesQuery({
      client: cmsClient,
      variables: {
        first: CATEGORIES_AMOUNT,
        language: currentLanguageCode as unknown as LanguageCodeFilterEnum,
      },
    });

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
  return (
    <MatomoWrapper>
      <RHHCPage
        className="pageLayout"
        navigation={<Navigation page={page} />}
        content={
          <SearchPageContent
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
                  {...getArticlePageCardProps(
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
                    ...getArticlePageCardProps(
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
        footer={<FooterSection />}
      />
    </MatomoWrapper>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async ({ cmsClient }) => {
    const locale = getLocaleOrError(context.locale);
    const { data: pageData } = await cmsClient.query<
      PageByTemplateQuery,
      PageByTemplateQueryVariables
    >({
      query: PageByTemplateDocument,
      variables: {
        template: TemplateEnum.PostsPage,
        language: getQlLanguage(locale).toLocaleLowerCase(),
      },
    });

    const page = pageData.pageByTemplate;
    return {
      props: {
        page,
        ...(await serverSideTranslationsWithCommon(locale, [
          'common',
          'home',
          'cms',
        ])),
      },
    };
  });
}
