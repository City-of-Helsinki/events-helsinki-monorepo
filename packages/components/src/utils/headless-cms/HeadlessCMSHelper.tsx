import { format } from 'date-fns';
import type { BreadcrumbListItem } from 'hds-react';
import parse from 'html-react-parser';
import React from 'react';
import type {
  ArticleType,
  Category,
  Categories,
  Config as RCHCConfig,
  PageType,
  GeneralCollectionType,
  CardProps,
  LanguageCodeEnum,
} from 'react-helsinki-headless-cms';
import {
  Card,
  getCollections,
  Collection,
  EventSearchCollection,
  EventSelectionCollection,
  getCollectionUIType,
  isEventSearchCollection,
  isEventSelectionCollection,
  isPageType,
  isArticleType,
  getArticlePageCardProps as getArticlePageCardPropsBase,
  ModuleItemTypeEnum,
  isLocationsSelectionCollection,
  LocationsSelectionCollection,
} from 'react-helsinki-headless-cms';
import type { AppLanguage } from '../../types';

/**
 * A braedcrumb title of article archive in every language.
 * @deprecated Needed only while the CMS does not offer the article archive in the breadcrumb module.
 * */
export const defaultArticleArchiveBreadcrumbTitle: Record<AppLanguage, string> =
  {
    fi: 'Artikkelit',
    sv: 'Artiklar',
    en: 'Articles',
  };

export interface HeadlessCMSApp {
  cmsArticlesContextPath: string;
  cmsPagesContextPath: string;
  dateFormat: string;
  ArticleDetails: React.FC<{ keywords?: string[] }>;
}

export class HeadlessCMSHelper {
  cmsArticlesContextPath: string;
  cmsPagesContextPath: string;
  dateFormat: string;
  ArticleDetails: React.FC<{ keywords?: string[] }>;

  constructor({
    cmsArticlesContextPath,
    cmsPagesContextPath,
    dateFormat,
    ArticleDetails,
  }: HeadlessCMSApp) {
    this.cmsArticlesContextPath = cmsArticlesContextPath;
    this.cmsPagesContextPath = cmsPagesContextPath;
    this.dateFormat = dateFormat;
    this.ArticleDetails = ArticleDetails;
  }

  // NOTE: Referenced 2 times in next-pages
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUriID(slugs: string[], locale: AppLanguage): string {
    if (!slugs) return '/';
    return `/${slugs.join('/')}/`;
  }

  removeInternalDoublePrefix(slugs: string[]) {
    [
      this.cmsArticlesContextPath.replace('/', ''),
      this.cmsPagesContextPath.replace('/', ''),
    ].forEach((internalUriSegment) => {
      if (slugs[0] === internalUriSegment) {
        slugs.shift();
      }
    });
    return slugs;
  }

  // NOTE: referenced 2 times in next-pages and once in Navigation
  getSlugFromUri(uri?: string | null): string[] | null {
    const uriWithoutLang = this.stripLocaleFromUri(uri ?? '');
    if (uriWithoutLang) {
      return this.removeInternalDoublePrefix(
        uriWithoutLang.split('/').filter((i) => i)
      );
    }
    return null;
  }

  // NOTE: Referenced once in Navigation
  removeContextPathFromUri(uri?: string | null) {
    return uri
      ?.replace(this.cmsArticlesContextPath, '')
      .replace(this.cmsPagesContextPath, '');
  }

  stripLocaleFromUri(uri: string): string {
    return uri.replace(/^\/(?:en|sv|fi)(?![a-z\d])/i, '');
  }
  // '/segment1/segment2/' -> ['/segment1/', '/segment1/segment2/']
  // current implementation required both leading and trailing slashes
  // to include all breadcrumbs
  uriToBreadcrumbs(uri: string): string[] {
    return this.slugsToUriSegments(
      this.stripLocaleFromUri(uri)
        .split('/')
        // Filter out empty strings
        .filter((i) => i)
    );
  }

  slugsToUriSegments(slugs: string[]): string[] {
    return slugs.map((_, index) => {
      return `/${slugs.slice(0, index + 1).join('/')}/`;
    });
  }

  // NOTE: Referenced once in next-pages
  getArticlePageCardProps(
    item: ArticleType,
    getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref']
  ): CardProps {
    return {
      ...getArticlePageCardPropsBase(item),
      subTitle: item?.date
        ? this.removeLeadingZeros(format(new Date(item.date), this.dateFormat))
        : '',
      url: getRoutedInternalHref(
        item?.link ?? item?.uri,
        ModuleItemTypeEnum.Article
      ),
      withBorder: true,
      withShadow: false,
    };
  }

  removeLeadingZeros = (dateStr: string): string => {
    return dateStr
      .split('.')
      .map((n) => n.replace(/(^|-)0+/g, '$1'))
      .join('.');
  };

  getCmsPageCardProps(
    item: PageType,
    getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref']
  ): CardProps {
    return {
      ...getArticlePageCardPropsBase(item),
      withBorder: true,
      withShadow: false,
      url: getRoutedInternalHref(
        item?.link ?? item?.uri,
        ModuleItemTypeEnum.Page
      ),
    };
  }

  getGeneralCollectionCards(
    collection: GeneralCollectionType,
    getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref']
  ): CardProps[] {
    return collection.items.reduce((result: CardProps[], item) => {
      if (isArticleType(item)) {
        result.push(this.getArticlePageCardProps(item, getRoutedInternalHref));
      } else if (isPageType(item)) {
        result.push(this.getCmsPageCardProps(item, getRoutedInternalHref));
      }
      return result;
    }, []);
  }

  // NOTE: Referenced 3 times in next-pages
  getDefaultCollections(
    page: PageType | ArticleType,
    getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref']
  ) {
    return getCollections(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      page?.modules?.filter((m: any) => !!m) ?? [],
      true
    )?.reduce((collectionElements: React.JSX.Element[], collection) => {
      const commonCollectionProps = {
        key: `collection-${Math.random()}`,
        title: collection.title,
        description: collection.description,
        type: getCollectionUIType(collection),
        collectionContainerProps: { withDots: true },
      };

      if (isEventSearchCollection(collection)) {
        collectionElements.push(
          <EventSearchCollection
            {...commonCollectionProps}
            collection={collection}
            showAllUrl={parse(collection.showAllUrl || '').toString()}
          />
        );
      } else if (isEventSelectionCollection(collection)) {
        collectionElements.push(
          <EventSelectionCollection
            {...commonCollectionProps}
            collection={collection}
          />
        );
      } else if (isLocationsSelectionCollection(collection)) {
        collectionElements.push(
          <LocationsSelectionCollection
            {...commonCollectionProps}
            collection={collection}
            locale={page?.language?.locale as LanguageCodeEnum}
          />
        );
      } else {
        const items = { ...collection.items };
        const cards = this.getGeneralCollectionCards(
          collection,
          getRoutedInternalHref
        ).map((cardProps, i) => {
          const item = items[i] as ArticleType;
          const categories = item?.categories as Categories;
          // item should be of type ArticleType but categories then has edges instead of nodes
          // item?.categories?.edges?.map((category) => category?.node?.name)

          return (
            <Card
              key={Math.random()}
              {...cardProps}
              direction="fixed-vertical"
              customContent={
                <this.ArticleDetails
                  keywords={
                    categories?.nodes?.map(
                      (category: Category) => category?.name || ''
                    ) || []
                  }
                />
              }
              text=""
            />
          );
        });
        collectionElements.push(
          <Collection
            {...commonCollectionProps}
            showAllUrl={collection.showAllUrl}
            cards={cards}
          />
        );
      }
      return collectionElements;
    }, []);
  }

  /**
   * The article archive should always be the second item in the breadcrumbs list.
   * If the article archive is missing from the breadcrumbs, but is wanted to be included,
   * the withArticleArchiveBreadcrumb forces the article archive breadcrumb.
   * @deprecated The breadcrumbs should be handled from the CMS-site and the HCRC-lib takes care of it.
   * While the article archive is never included in the breadcrumbs that the CMS serves,
   * this method fullfills the need.
   * */
  withArticleArchiveBreadcrumb(
    breadcrumbs: BreadcrumbListItem[],
    articlesTitle: string,
    locale: AppLanguage
  ) {
    if (breadcrumbs[1].path !== this.cmsArticlesContextPath) {
      const [firstItem, ...rest] = breadcrumbs;
      const articleArchive: BreadcrumbListItem = {
        title: articlesTitle,
        path: `/${locale}${this.cmsArticlesContextPath}`,
      };
      return [firstItem, articleArchive, ...rest];
    }
    return breadcrumbs;
  }

  withCurrentPageBreadcrumb(
    breadcrumbs: BreadcrumbListItem[],
    page: PageType | ArticleType,
    language: AppLanguage,
    isPreview?: boolean
  ) {
    const bc = [...breadcrumbs];
    // when page/article is in draft mode, it wont exist anymore in breadcrumbs items, which will break the logic
    // of breadcrums we need to temporaly propagate current page to breadcrumb as last element for preview mode
    if (
      page &&
      isPreview &&
      bc.filter((item) => item.path === page.uri).length === 0 &&
      page.title &&
      page.uri
    ) {
      bc.push({
        title: page.title,
        path: `/${language}${page.slug}`,
      });
    }
    return bc;
  }
}
