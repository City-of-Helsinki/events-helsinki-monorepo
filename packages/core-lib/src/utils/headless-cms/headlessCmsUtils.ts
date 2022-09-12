import format from 'date-fns/format';
import type {
  ArticleType,
  CollectionItemType,
  Config as RCHCConfig,
  PageType,
  GeneralCollectionType,
  CardProps,
} from 'react-helsinki-headless-cms';
import {
  isPageType,
  isArticleType,
  getArticlePageCardProps as getArticlePageCardPropsBase,
  ModuleItemTypeEnum,
} from 'react-helsinki-headless-cms';

import type { Language } from '../../../types';
import { DEFAULT_LANGUAGE } from '../../constants';

export const getUriID = (slugs: string[], locale: Language): string => {
  if (!slugs) return '/';
  if (locale === DEFAULT_LANGUAGE) {
    return `/${slugs.join('/')}/`;
  }
  return `/${locale}/${slugs.join('/')}/`;
};

export const getSlugFromUri = (uri?: string | null): string[] | null => {
  const uriWithoutLang = stripLocaleFromUri(uri ?? '');
  if (uriWithoutLang) {
    return uriWithoutLang.split('/').filter((i) => i);
  }
  return null;
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
  getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref'],
  dateFormat: string
): CardProps {
  return {
    ...getArticlePageCardPropsBase(item),
    subTitle: item?.date ? format(new Date(item.date), dateFormat) : '',
    url: getRoutedInternalHref(
      item?.link ?? item?.uri,
      ModuleItemTypeEnum.Article
    ),
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

export function collectGeneralCards(
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
  return collectGeneralCards(collection.items, getRoutedInternalHref);
}
