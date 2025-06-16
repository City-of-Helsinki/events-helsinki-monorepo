import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import type { NextApiResponse } from 'next';

import { APP_LANGUAGES } from '../../constants';
import type { Logger } from '../../loggers/logger';
import type { PageUriInfo } from '../../types';
import type { GetAllItemsUriInfoResponseType } from './queries';
import {
  GET_ALL_PAGES_URI_INFO_QUERY,
  GET_ALL_POSTS_URI_INFO_QUERY,
} from './queries';

export const POSTS_AMOUNT_LIMIT = 100;
export const PAGES_AMOUNT_LIMIT = 100;

/**
 * Removes duplicate items from an array.
 * @template T The type of elements in the array.
 * @param array - The input array.
 * @returns {T[]} A new array with unique elements.
 */
export function uniqBySetWithArrayFrom<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

const _getPageUriInfo = ({
  node,
}: GetAllItemsUriInfoResponseType['items']['edges'][number]): PageUriInfo => ({
  uri: node.uri,
  slug: node.slug,
  locale: node.language.code.toLowerCase(),
});

/**
 * Fetches all articles from the CMS and extracts their URI information.
 * @param apolloClient - The Apollo client instance.
 * @returns {Promise<PageUriInfo[]>} A promise that resolves to an array of page URI information for articles.
 */
export const getAllCmsArticlesPageUriInfos = async (
  apolloClient: ApolloClient<NormalizedCacheObject>
): Promise<PageUriInfo[]> => {
  let allPageUriInfos: PageUriInfo[] = [];
  let hasNextPage: GetAllItemsUriInfoResponseType['items']['pageInfo']['hasNextPage'] =
    true;
  let endCursor: GetAllItemsUriInfoResponseType['items']['pageInfo']['endCursor'] =
    '';

  while (hasNextPage) {
    const { data } = await apolloClient.query<GetAllItemsUriInfoResponseType>({
      query: GET_ALL_POSTS_URI_INFO_QUERY,
      variables: {
        first: POSTS_AMOUNT_LIMIT,
        after: endCursor, // Pass the endCursor from the previous request
      },
      fetchPolicy: 'no-cache', // Always go to the network, never use cache for this query
    });

    // Add the fetched items to our accumulated list
    allPageUriInfos = allPageUriInfos.concat(
      data.items.edges.map(_getPageUriInfo)
    );

    // Update pagination variables for the next iteration
    hasNextPage = data.items.pageInfo.hasNextPage;
    endCursor = data.items.pageInfo.endCursor;

    // If there's no more pages, break the loop (redundant with while condition, but can be explicit)
    if (!hasNextPage) {
      break;
    }
  }

  return allPageUriInfos;
};
/**
 * Fetches all pages from the CMS and extracts their URI information.
 * @param apolloClient - The Apollo client instance.
 * @returns {Promise<PageUriInfo[]>} A promise that resolves to an array of page URI information for pages.
 */
export const getAllCmsPagesPageUriInfos = async (
  apolloClient: ApolloClient<NormalizedCacheObject>
): Promise<PageUriInfo[]> => {
  let allPageUriInfos: PageUriInfo[] = [];
  let hasNextPage: GetAllItemsUriInfoResponseType['items']['pageInfo']['hasNextPage'] =
    true;
  let endCursor: GetAllItemsUriInfoResponseType['items']['pageInfo']['endCursor'] =
    '';

  while (hasNextPage) {
    const { data } = await apolloClient.query<GetAllItemsUriInfoResponseType>({
      query: GET_ALL_PAGES_URI_INFO_QUERY,
      variables: {
        first: PAGES_AMOUNT_LIMIT,
        after: endCursor, // Pass the endCursor from the previous request
      },
      fetchPolicy: 'no-cache', // Always go to the network, never use cache for this query
    });

    // Add the fetched items to our accumulated list
    allPageUriInfos = allPageUriInfos.concat(
      data.items.edges.map(_getPageUriInfo)
    );

    // Update pagination variables for the next iteration
    hasNextPage = data.items.pageInfo.hasNextPage;
    endCursor = data.items.pageInfo.endCursor;

    // If there's no more pages, break the loop (redundant with while condition, but can be explicit)
    if (!hasNextPage) {
      break;
    }
  }

  return allPageUriInfos;
};

interface NextPageRevalidateServiceInterface {
  cmsApolloClient: ApolloClient<NormalizedCacheObject>;
  staticGenerationLogger: Logger;
}

/**
 * Service class responsible for handling the revalidation logic for Next.js static pages.
 * It interacts with the CMS via an Apollo client and uses a logger for recording events.
 */
export class NextPageRevalidateService {
  staticGenerationLogger: NextPageRevalidateServiceInterface['staticGenerationLogger'];
  cmsApolloClient: NextPageRevalidateServiceInterface['cmsApolloClient'];

  /**
   * Constructs an instance of NextPageRevalidateService.
   * @param params - The parameters for the constructor.
   */
  constructor({
    cmsApolloClient,
    staticGenerationLogger,
  }: NextPageRevalidateServiceInterface) {
    this.cmsApolloClient = cmsApolloClient;
    this.staticGenerationLogger = staticGenerationLogger;
  }
  /**
   * @returns {Logger} The logger instance used by this service.
   */
  getLogger() {
    return this.staticGenerationLogger;
  }

  /**
   * Revalidates a list of page URIs one by one.
   * Logs the outcome of the batch revalidation.
   * @param res - The NextApiResponse object.
   * @param pages - An array of page URIs to revalidate.
   */
  async revalidateAll(res: NextApiResponse, pages: string[]) {
    let successCount = 0;
    let failureCount = 0;
    const failedUris: string[] = [];

    this.staticGenerationLogger.info(
      `Starting batch revalidation for ${pages.length} pages.`
    );
    for (const page of uniqBySetWithArrayFrom(pages)) {
      const failedUri = await this.revalidate(res, page);
      if (failedUri) {
        failureCount++;
        failedUris.push(failedUri);
      } else {
        successCount++;
      }
    }
    this.staticGenerationLogger.info(
      `Batch revalidation complete. Success: ${successCount}, Failures: ${failureCount}.`
    );
    if (failureCount > 0) {
      this.staticGenerationLogger.warn(
        `Failed to revalidate the following URIs: ${failedUris.join(', ')}`
      );
    }
  }

  /**
   * Revalidates a single page URI.
   * Normalizes the URI (e.g., handles root paths, removes trailing slashes).
   * @param res - The NextApiResponse object.
   * @param uri - The URI of the page to revalidate.
   * @returns Promise resolving to the URI if revalidation failed, otherwise null.
   */
  async revalidate(res: NextApiResponse, uri: string): Promise<string | null> {
    try {
      let pathToRevalidate = uri.replace(/\/$/, '');
      if (pathToRevalidate === '') {
        pathToRevalidate = '/'; // Treat empty string (from original '/') as root path
      }

      this.staticGenerationLogger.info(
        `Revalidating page: ${pathToRevalidate}`
      );
      await res.revalidate(pathToRevalidate);
      return null; // Success
    } catch (err) {
      const pathToRevalidateOnError =
        uri.replace(/\/$/, '') === '' ? '/' : uri.replace(/\/$/, '');
      this.staticGenerationLogger.error(
        `Error revalidating page: ${pathToRevalidateOnError}`,
        err
      );
      return pathToRevalidateOnError; // Failure, return the URI that failed
    }
  }

  /**
   * Triggers the revalidation process for all known pages.
   * Fetches all articles and pages, then calls `this.revalidateAll` to process them.
   * This function is intended to be called without `await` to run in the background.
   *
   * NOTE: While the NextJS's page-router is used, there is no way to get list of
   * statically generated pages, which means that revalidation cannot be triggered
   * for venues, events, courses, etc. This is available when the app-router is in use
   * by using `revalidatePath`.
   * See more: https://nextjs.org/docs/13/app/api-reference/functions/revalidatePath.
   * @param res - The NextApiResponse object.
   */
  async triggerAllCmsPagesRevalidation(res: NextApiResponse) {
    try {
      this.staticGenerationLogger.info(
        'Fetching all articles and pages for revalidation...'
      );

      // NOTE: Only actual absolute pathnames are valid when using the
      // pages-router. Since we can get only a list of CMS articles
      // and pages, but not events, course, venues, etc. we can only
      // regenerate CMS related pages.
      const pagesToRevalidate = [
        ...(await getAllCmsArticlesPageUriInfos(this.cmsApolloClient)),
        ...(await getAllCmsPagesPageUriInfos(this.cmsApolloClient)),
      ]
        .filter((pageInfo) => pageInfo.uri)
        .map((pageInfo) => pageInfo.uri.replace(/\/$/, ''));

      for (const lng of APP_LANGUAGES) {
        pagesToRevalidate.push(`/${lng}`);
      }

      const uniquePages = uniqBySetWithArrayFrom(pagesToRevalidate);
      this.staticGenerationLogger.info(
        `Found ${uniquePages.length} unique pages to revalidate.`
      );

      await this.revalidateAll(res, uniquePages);
      this.staticGenerationLogger.info(
        'Background revalidation of all pages process completed.'
      );
    } catch (err) {
      this.staticGenerationLogger.error(
        'Error during the triggerAllCmsPagesRevalidation process',
        err
      );
    }
  }
}
