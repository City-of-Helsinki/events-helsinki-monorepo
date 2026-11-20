import fs from 'fs/promises';
import path from 'path';
import type {
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client/core/index.js';
import type { NextApiResponse } from 'next';

import { APP_LANGUAGES } from '../../constants';
import type { Logger } from '../../loggers/logger';
import {
  getAllCmsArticlesPageUriInfos,
  getAllCmsPagesPageUriInfos,
  uniqBySetWithArrayFrom,
} from './cmsPageUriService';

/**
 * Defines the structure for files found within the Next.js build output.
 * @typedef {object} NextPageListerFileResults
 * @property {string[]} htmlFiles - An array of relative paths for .html files.
 * @property {string[]} jsonFiles - An array of relative paths for .json files.
 */
interface NextPageListerFileResults {
  htmlFiles: string[];
  jsonFiles: string[];
}

/**
 * Manages listing of statically generated pages within the Next.js `.next/server/pages` directory.
 * This class helps in identifying HTML and JSON files corresponding to static pages.
 */
class NextPageLister {
  /**
   * The absolute path to the Next.js server-side pages directory (`.next/server/pages`).
   * @private
   */
  private readonly pagesServerDir: string;
  /**
   * The logger instance used for static generation related messages.
   * @private
   */
  protected readonly staticGenerationLogger: Logger;

  /**
   * Constructs an instance of `NextPageLister`.
   *
   * @param {Logger} [staticGenerationLogger=console] - The logger instance to use. Defaults to `console`.
   */
  constructor(staticGenerationLogger: Logger = console) {
    const projectRoot = process.cwd(); // Get the current working directory of the project
    this.pagesServerDir = path.join(projectRoot, '.next', 'server', 'pages');
    this.staticGenerationLogger = staticGenerationLogger;
  }

  /**
   * Recursively reads a directory and collects relative paths of `.html` and `.json` files.
   * Skips 'api' directories.
   *
   * @private
   * @param {string} currentPath - The current directory path to read.
   * @returns {Promise<NextPageListerFileResults>} A promise that resolves to an object containing arrays
   *  of relative paths for html and json files.
   */
  private async readDirRecursive(
    currentPath: string
  ): Promise<NextPageListerFileResults> {
    let htmlFiles: string[] = [];
    let jsonFiles: string[] = [];
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'api') {
          // Skip API routes within the Next.js pages directory
          const result = await this.readDirRecursive(fullPath);
          htmlFiles = htmlFiles.concat(result.htmlFiles);
          jsonFiles = jsonFiles.concat(result.jsonFiles);
        }
      } else if (entry.isFile()) {
        const relativePath = path.relative(this.pagesServerDir, fullPath);
        if (entry.name.endsWith('.html')) {
          htmlFiles.push(relativePath.replace(/\.html$/, ''));
        } else if (entry.name.endsWith('.json')) {
          jsonFiles.push(relativePath.replace(/\.json$/, ''));
        }
      }
    }

    return {
      htmlFiles,
      jsonFiles,
    };
  }

  /**
   * Lists all statically generated pages (HTML and JSON files) within a specified pathname.
   *
   * @param {string} pathname - The relative pathname within the `pagesServerDir` to search.
   * @returns {Promise<string[]>} A promise that resolves to a sorted array of unique relative page
   *  paths (without file extensions) that use '/' (i.e. forward slash) as a path separator.
   * @throws {Error} If the specified `pathname` does not exist within the `pagesServerDir`.
   */
  public async listGeneratedPages(pathname: string): Promise<string[]> {
    const workingDir = path.join(this.pagesServerDir, pathname);
    await fs.access(workingDir); // Check if the directory exists
    const { htmlFiles, jsonFiles } = await this.readDirRecursive(workingDir);
    // Combine and deduplicate the lists of files, then sort them.
    return (
      uniqBySetWithArrayFrom([...htmlFiles, ...jsonFiles])
        // Make sure paths use '/' as separator on Windows too
        .map((path) => `/${path}`.replaceAll('\\', '/'))
        .sort((a, b) => a.localeCompare(b))
    );
  }
}

/**
 * Interface defining the dependencies for `NextPageRevalidateService`.
 * @typedef {object} NextPageRevalidateServiceInterface
 * @property {ApolloClient<NormalizedCacheObject>} cmsApolloClient - The Apollo client instance for CMS interactions.
 * @property {Logger} staticGenerationLogger - The logger instance for static generation events.
 */
interface NextPageRevalidateServiceInterface {
  cmsApolloClient: ApolloClient<NormalizedCacheObject>;
  staticGenerationLogger: Logger;
}

/**
 * Service class responsible for handling the revalidation logic for Next.js static pages.
 * It interacts with the CMS via an Apollo client and uses a logger for recording events.
 * Extends `NextPageLister` to leverage its page listing capabilities.
 */
export class NextPageRevalidateService extends NextPageLister {
  /**
   * The Apollo client instance for interacting with the CMS.
   */
  cmsApolloClient: NextPageRevalidateServiceInterface['cmsApolloClient'];

  /**
   * Constructs an instance of `NextPageRevalidateService`.
   *
   * @param {NextPageRevalidateServiceInterface} params - The parameters for constructing the service.
   * @param {ApolloClient<NormalizedCacheObject>} params.cmsApolloClient - The Apollo client instance for
   *  CMS interactions.
   * @param {Logger} params.staticGenerationLogger - The logger instance for static generation events.
   */
  constructor({
    cmsApolloClient,
    staticGenerationLogger,
  }: NextPageRevalidateServiceInterface) {
    super(staticGenerationLogger);
    this.cmsApolloClient = cmsApolloClient;
  }

  /**
   * Retrieves the logger instance used by this service.
   *
   * @returns {Logger} The logger instance.
   */
  getLogger(): Logger {
    return this.staticGenerationLogger;
  }

  /**
   * Revalidates a list of page URIs one by one.
   * Logs the overall outcome of the batch revalidation, including successes and failures.
   *
   * @param {NextApiResponse} res - The Next.js API response object, used to trigger revalidation.
   * @param {string[]} pages - An array of page URIs (e.g., '/en/about', '/fi/contact') to revalidate.
   * @returns {Promise<void>} A promise that resolves when all pages in the batch have been processed.
   */
  async revalidateAll(res: NextApiResponse, pages: string[]): Promise<void> {
    let successCount = 0;
    let failureCount = 0;
    const failedUris: string[] = [];

    this.staticGenerationLogger.info(
      `Starting batch revalidation for ${pages.length} pages.`
    );

    // Ensure uniqueness before revalidating to avoid unnecessary calls
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
   * It normalizes the URI to ensure correct revalidation (e.g., converts empty string to '/',
   * removes trailing slashes).
   *
   * @param {NextApiResponse} res - The Next.js API response object, used to trigger revalidation.
   * @param {string} uri - The URI of the page to revalidate (e.g., '/en/about', '/').
   * @returns {Promise<string | null>} A promise that resolves to the `uri` if revalidation failed,
   *  otherwise `null` on success.
   */
  async revalidate(res: NextApiResponse, uri: string): Promise<string | null> {
    try {
      // Normalize URI: remove trailing slash and handle root path
      let pathToRevalidate = uri.replace(/\/$/, '');
      if (pathToRevalidate === '') {
        pathToRevalidate = '/'; // Treat empty string (from original '/') as root path
      }

      this.staticGenerationLogger.info(
        `Revalidating page: ${pathToRevalidate}`
      );
      await res.revalidate(pathToRevalidate);
      return null; // Indicates successful revalidation
    } catch (err) {
      // Determine the path that failed for logging purposes
      const pathToRevalidateOnError =
        uri.replace(/\/$/, '') === '' ? '/' : uri.replace(/\/$/, '');
      this.staticGenerationLogger.error(
        `Error revalidating page: ${pathToRevalidateOnError}`,
        err
      );
      return pathToRevalidateOnError; // Indicates failure and returns the problematic URI
    }
  }

  /**
   * Triggers the revalidation process for all known CMS-managed pages (articles and generic pages).
   * It fetches all URIs from the CMS, adds root paths for supported languages, and then calls
   * `revalidateAll` to process them.
   *
   * @param {NextApiResponse} res - The Next.js API response object, used to trigger revalidation.
   * @returns {Promise<void>} A promise that resolves when the background revalidation process has completed.
   *
   * @remarks
   * This function is intended to be called without `await` to run in the background if the caller doesn't
   * need to wait for its completion.
   *
   * **Important Note:** Due to limitations with the Next.js Page Router, there is no simple built-in way
   * to get a comprehensive list of *all* statically generated pages (e.g., for courses, events, venues).
   * This function currently only revalidates pages derived directly from the CMS (articles and generic
   * pages). Improvements for revalidating arbitrary paths are available when migrating to the Next.js
   * App Router and using `revalidatePath`.
   *
   * See more:
   * {@link https://nextjs.org/docs/13/app/api-reference/functions/revalidatePath Next.js `revalidatePath`}.
   *
   * The `NextPageLister` class (which this service extends) can be used to list statically generated files.
   *  For revalidating specific sections like courses, events, or venues, consider using
   * `triggerAllPagesRevalidationInPathname`.
   */
  async triggerAllCmsPagesRevalidation(res: NextApiResponse): Promise<void> {
    try {
      this.staticGenerationLogger.info(
        'Fetching all articles and pages from CMS for revalidation...'
      );

      // Collect all CMS-managed article and generic page URIs.
      // Filter out any entries without a URI and normalize paths (remove trailing slashes).
      const pagesToRevalidate = [
        ...(await getAllCmsArticlesPageUriInfos(this.cmsApolloClient)),
        ...(await getAllCmsPagesPageUriInfos(this.cmsApolloClient)),
      ]
        .filter((pageInfo) => pageInfo.uri)
        .map((pageInfo) => pageInfo.uri.replace(/\/$/, ''));

      // Add root paths for all supported application languages (e.g., '/', '/en', '/fi').
      for (const lng of APP_LANGUAGES) {
        pagesToRevalidate.push(`/${lng}`);
      }

      // Get unique pages to avoid redundant revalidation calls
      const uniquePages = uniqBySetWithArrayFrom(pagesToRevalidate);
      this.staticGenerationLogger.info(
        `Found ${uniquePages.length} unique CMS-related pages to revalidate.`
      );

      await this.revalidateAll(res, uniquePages);
      this.staticGenerationLogger.info(
        'Background revalidation of all CMS-related pages process completed.'
      );
    } catch (err) {
      this.staticGenerationLogger.error(
        'Error during the triggerAllCmsPagesRevalidation process',
        err
      );
    }
  }
  /**
   * Triggers the revalidation for all statically generated pages found within one or
   * more specific pathnames relative to the Next.js `.next/server/pages` directory.
   * This is useful for revalidating specific sections of the application like
   * `/courses`, `/events`, etc.
   *
   * @param {NextApiResponse} res - The Next.js API response object, used to trigger
   *  revalidation.
   * @param {string[]} pathnames - An array of relative directory paths (e.g.,
   *  ['/fi/courses', '/sv/events'])
   *  within `.next/server/pages` to list and revalidate.
   * @returns {Promise<void>} A promise that resolves when all pages in the specified
   *  pathnames have been revalidated.
   */
  async triggerAllPathnamesPagesRevalidation(
    res: NextApiResponse,
    pathnames: string[]
  ): Promise<void> {
    let allPagesToRevalidate: string[] = [];

    for (const pathname of pathnames) {
      try {
        // List all generated pages within the current directory
        const pagesInPathname = await this.listGeneratedPages(pathname);
        allPagesToRevalidate = allPagesToRevalidate.concat(pagesInPathname);
        this.staticGenerationLogger.info(
          `Found ${pagesInPathname.length} pages in pathname: ${pathname}`
        );
      } catch (error) {
        this.staticGenerationLogger.error(
          `Error listing pages for pathname: ${pathname}`,
          error
        );
        // Continue to the next pathname even if one fails
      }
    }

    // Remove duplicates and then revalidate all collected pages
    const uniquePagesToRevalidate =
      uniqBySetWithArrayFrom(allPagesToRevalidate);
    if (uniquePagesToRevalidate.length > 0) {
      this.staticGenerationLogger.info(
        `Starting revalidation for ${uniquePagesToRevalidate.length} unique pages across specified pathnames.`
      );
      await this.revalidateAll(res, uniquePagesToRevalidate);
      this.staticGenerationLogger.info(
        'Completed revalidation for specified pathnames.'
      );
    } else {
      this.staticGenerationLogger.warn(
        'No unique pages found for revalidation across the specified pathnames.'
      );
    }
  }
}
