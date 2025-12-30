import type { PageType } from '@city-of-helsinki/react-helsinki-headless-cms';
import {
  PageContextProvider,
  Page as RHHCPage,
  getBreadcrumbsFromPage,
} from '@city-of-helsinki/react-helsinki-headless-cms';
import type {
  PageQuery,
  PageQueryVariables,
} from '@city-of-helsinki/react-helsinki-headless-cms/apollo';
import { PageDocument } from '@city-of-helsinki/react-helsinki-headless-cms/apollo';
import type { PreviewDataObject } from '@events-helsinki/components';
import {
  NavigationContext,
  Navigation,
  FooterSection,
  getLanguageOrDefault,
  usePageScrollRestoration,
  RouteMeta,
  PageMeta,
  useResilientTranslation,
  getFilteredBreadcrumbs,
  BreadcrumbContainer,
  PreviewNotification,
} from '@events-helsinki/components';
import type { BreadcrumbListItem } from 'hds-react';
import type { GetStaticPropsContext, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useContext } from 'react';
import { ROUTES } from '../../constants';
import AppConfig from '../../domain/app/AppConfig';
import getHobbiesStaticProps from '../../domain/app/getHobbiesStaticProps';
import cmsHelper from '../../domain/app/headlessCmsHelper';
import { hobbiesApolloClient } from '../../domain/clients/hobbiesApolloClient';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import AdvancedSearch from '../../domain/search/eventSearch/advancedSearch/AdvancedSearch';

const SearchPageNoSSR = dynamic(
  () => import('../../domain/search/eventSearch/SearchPage'),
  {
    ssr: false,
  }
);

const Search: NextPage<{
  previewToken: string;
  page: PageType;
  breadcrumbs?: BreadcrumbListItem[];
}> = ({ page, breadcrumbs, previewToken }) => {
  const { resilientT } = useResilientTranslation();
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);
  usePageScrollRestoration();

  useEffect(() => {
    const listElement = listRef.current;

    if (scrollTo) {
      const listItemElement = listElement?.querySelector(
        decodeURIComponent(scrollTo.toString())
      );

      if (listItemElement) {
        listItemElement.scrollIntoView({
          block: 'center',
        });
      }
    }
  }, [scrollTo]);
  const { footerMenu } = useContext(NavigationContext);

  return (
    <RHHCPage
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <PageContextProvider page={page}>
          <PreviewNotification token={previewToken} />
          <RouteMeta origin={AppConfig.origin} />
          <PageMeta
            {...page?.seo}
            image={page?.featuredImage?.node?.mediaItemUrl || ''}
          />
          {breadcrumbs && <BreadcrumbContainer breadcrumbs={breadcrumbs} />}
          <SearchPageNoSSR SearchComponent={AdvancedSearch} />
        </PageContextProvider>
      }
      footer={
        <FooterSection
          menu={footerMenu}
          appName={resilientT('appHobbies:appName')}
          feedbackWithPadding
        />
      }
    />
  );
};

export default Search;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async () => {
    const language = getLanguageOrDefault(context.locale);

    const previewData = context.previewData as PreviewDataObject;
    const { data: pageData } = await hobbiesApolloClient.query<
      PageQuery,
      PageQueryVariables
    >({
      query: PageDocument,
      variables: {
        id: `/${language}${ROUTES.SEARCH}/`,
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

    return {
      props: {
        page,
        breadcrumbs,
        ...(await serverSideTranslationsWithCommon(language, [
          'event',
          'search',
          'home',
        ])),
        previewtoken: previewData?.token ?? '',
      },
    };
  });
}
