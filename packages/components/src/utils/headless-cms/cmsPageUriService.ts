import type {
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client/core/index.js';

import { DEFAULT_LANGUAGE } from '../../constants';
import isAppLanguage from '../../type-guards/is-app-language';
import type { AppLanguage, PageUriInfo } from '../../types';
import type { GetAllItemsUriInfoResponseType } from './queries';
import {
  GET_ALL_PAGES_URI_INFO_QUERY,
  GET_ALL_POSTS_URI_INFO_QUERY,
} from './queries';

/**
 * The maximum number of posts to fetch in a single CMS query.
 */
export const POSTS_AMOUNT_LIMIT = 100;
/**
 * The maximum number of pages to fetch in a single CMS query.
 */
export const PAGES_AMOUNT_LIMIT = 100;

/**
 * Removes duplicate items from an array using a Set for efficient uniqueness checking.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The input array from which to remove duplicates.
 * @returns {T[]} A new array containing only the unique elements from the input array.
 */
export function uniqBySetWithArrayFrom<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Extracts URI information (URI, slug, and locale) from a CMS item node.
 * This is an internal helper function.
 *
 * @private
 * @param {GetAllItemsUriInfoResponseType['items']['edges'][number]} { node } -
 *  An object containing the 'node' of a CMS item edge.
 * @returns {PageUriInfo} An object containing the URI, slug, and locale of the page.
 */
const _getPageUriInfo = ({
  node,
}: GetAllItemsUriInfoResponseType['items']['edges'][number]): PageUriInfo => {
  const locale = node.language.code.toLowerCase();
  const appLanguage: AppLanguage = isAppLanguage(locale)
    ? locale
    : DEFAULT_LANGUAGE;

  return {
    uri: node.uri,
    slug: node.slug,
    locale: appLanguage,
  };
};

/**
 * Fetches all article (post) URI information from the CMS.
 * This function handles pagination to retrieve all available articles.
 *
 * @param {ApolloClient<NormalizedCacheObject>} apolloClient - The Apollo client instance configured for CMS queries.
 * @returns {Promise<PageUriInfo[]>} A promise that resolves to an array of `PageUriInfo` objects for all articles.
 *
 * @remarks
 * Uses `fetchPolicy: 'no-cache'` to ensure the latest data is always fetched directly from the network.
 */
export const getAllCmsArticlesPageUriInfos = async (
  apolloClient: ApolloClient<NormalizedCacheObject>
): Promise<PageUriInfo[]> => {
  let allPageUriInfos: PageUriInfo[] = [];
  let hasNextPage: GetAllItemsUriInfoResponseType['items']['pageInfo']['hasNextPage'] = true;
  let endCursor: GetAllItemsUriInfoResponseType['items']['pageInfo']['endCursor'] =
    '';

  while (hasNextPage) {
    const { data } = await apolloClient.query<GetAllItemsUriInfoResponseType>({
      query: GET_ALL_POSTS_URI_INFO_QUERY,
      variables: {
        first: POSTS_AMOUNT_LIMIT,
        after: endCursor,
      },
      fetchPolicy: 'no-cache',
    });

    // Add the fetched items to our accumulated list
    allPageUriInfos = allPageUriInfos.concat(
      data.items.edges.map(_getPageUriInfo)
    );
    // Update pagination variables for the next request
    hasNextPage = data.items.pageInfo.hasNextPage;
    endCursor = data.items.pageInfo.endCursor;
    // Explicit break, though redundant with the while condition, clarifies intent.
    if (!hasNextPage) {
      break;
    }
  }

  return allPageUriInfos;
};

/**
 * Fetches all generic page URI information from the CMS.
 * This function handles pagination to retrieve all available pages.
 *
 * @param {ApolloClient<NormalizedCacheObject>} apolloClient - The Apollo client instance configured for CMS queries.
 * @returns {Promise<PageUriInfo[]>} A promise that resolves to an array of `PageUriInfo` objects for all generic pages.
 *
 * @remarks
 * Uses `fetchPolicy: 'no-cache'` to ensure the latest data is always fetched directly from the network.
 */
export const getAllCmsPagesPageUriInfos = async (
  apolloClient: ApolloClient<NormalizedCacheObject>
): Promise<PageUriInfo[]> => {
  let allPageUriInfos: PageUriInfo[] = [];
  let hasNextPage: GetAllItemsUriInfoResponseType['items']['pageInfo']['hasNextPage'] = true;
  let endCursor: GetAllItemsUriInfoResponseType['items']['pageInfo']['endCursor'] =
    '';

  while (hasNextPage) {
    const { data } = await apolloClient.query<GetAllItemsUriInfoResponseType>({
      query: GET_ALL_PAGES_URI_INFO_QUERY,
      variables: {
        first: PAGES_AMOUNT_LIMIT,
        after: endCursor,
      },
      fetchPolicy: 'no-cache',
    });

    // Add the fetched items to our accumulated list
    allPageUriInfos = allPageUriInfos.concat(
      data.items.edges.map(_getPageUriInfo)
    );
    // Update pagination variables for the next request
    hasNextPage = data.items.pageInfo.hasNextPage;
    endCursor = data.items.pageInfo.endCursor;
    // Explicit break, though redundant with the while condition, clarifies intent.
    if (!hasNextPage) {
      break;
    }
  }

  return allPageUriInfos;
};
