import format from 'date-fns/format';
import type { AppLanguage } from 'events-helsinki-components';
import type {
  ArticleType,
  Category,
  Categories,
  CollectionItemType,
  Config as RCHCConfig,
  PageType,
  GeneralCollectionType,
  CardProps,
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
} from 'react-helsinki-headless-cms';

import AppConfig from '../../../domain/app/AppConfig';
import ArticleDetails from '../../../domain/article/articleDetails/ArticleDetails';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getUriID = (slugs: string[], locale: AppLanguage): string => {
  if (!slugs) return '/';
  return `/${slugs.join('/')}/`;
};

export const getSlugFromUri = (uri?: string | null): string[] | null => {
  const uriWithoutLang = stripLocaleFromUri(uri ?? '');
  if (uriWithoutLang) {
    return uriWithoutLang.split('/').filter((i) => i);
  }
  return null;
};

export const removeContextPathFromUri = (uri?: string | null) => {
  return uri
    ?.replace(AppConfig.cmsArticlesContextPath, '')
    .replace(AppConfig.cmsPagesContextPath, '');
};

export const stripLocaleFromUri = (uri: string): string => {
  return uri.replace(/^\/(?:en|sv|fi)(?![a-z\d])/i, '');
};

export const removeTrailingSlash = (uri: string): string => {
  return uri.replace(/\/$/, '');
};

// '/segment1/segment2/' -> ['/segment1/', '/segment1/segment2/']
// current implementation required both leading and trailing slashes
// to include all breadcrumbs
export const uriToBreadcrumbs = (uri: string): string[] => {
  return slugsToUriSegments(
    stripLocaleFromUri(uri)
      .split('/')
      // Filter out empty strings
      .filter((i) => i)
  );
};

export const slugsToUriSegments = (slugs: string[]): string[] => {
  return slugs.map((slug, index) => {
    return `/${slugs.slice(0, index + 1).join('/')}/`;
  });
};

export function getArticlePageCardProps(
  item: ArticleType,
  getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref']
): CardProps {
  return {
    ...getArticlePageCardPropsBase(item),
    subTitle: item?.date
      ? format(new Date(item.date), AppConfig.dateFormat)
      : '',
    url: getRoutedInternalHref(
      item?.link ?? item?.uri,
      ModuleItemTypeEnum.Article
    ),
    withBorder: true,
    withShadow: false,
  };
}

export function getCmsPageCardProps(
  item: PageType,
  getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref']
): CardProps {
  return {
    ...getArticlePageCardPropsBase(item),
    url: getRoutedInternalHref(
      item?.link ?? item?.uri,
      ModuleItemTypeEnum.Page
    ),
  };
}

export function _collectGeneralCards(
  items: CollectionItemType[],
  getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref']
): CardProps[] {
  return items.reduce((result: CardProps[], item) => {
    if (isArticleType(item)) {
      result.push(getArticlePageCardProps(item, getRoutedInternalHref));
    } else if (isPageType(item)) {
      result.push(getCmsPageCardProps(item, getRoutedInternalHref));
    }
    // NOTE: Event type is not a general type
    // else if (isEventType(item)) {
    //   result.push({
    //     ...getEventCardProps(item, locale),
    //     url: getRoutedInternalHref(item, ModuleItemTypeEnum.Event),
    //   });
    // }
    return result;
  }, []);
}

export function getGeneralCollectionCards(
  collection: GeneralCollectionType,
  getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  locale = 'fi'
): CardProps[] {
  return _collectGeneralCards(collection.items, getRoutedInternalHref);
}

export const getDefaultCollections = (
  page: PageType | ArticleType,
  getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref'],
  currentLanguageCode: RCHCConfig['currentLanguageCode']
) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCollections(page?.modules?.filter((m: any) => !!m) ?? [], true)?.reduce(
    (collectionElements: JSX.Element[], collection) => {
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
          />
        );
      } else if (isEventSelectionCollection(collection)) {
        collectionElements.push(
          <EventSelectionCollection
            {...commonCollectionProps}
            collection={collection}
          />
        );
      } else {
        const items = { ...collection.items };
        const cards = getGeneralCollectionCards(
          collection,
          getRoutedInternalHref,
          currentLanguageCode
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
                <ArticleDetails
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
    },
    []
  );
