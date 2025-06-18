import type { NextApiRequest, NextApiResponse } from 'next';
import type { Logger } from '../../loggers/logger';
import type { NextPageRevalidateService } from './service';

export interface NextPageRevalidateApiInterface {
  revalidateService: NextPageRevalidateService;
}

/**
 * Handles the API logic for revalidating Next.js static pages.
 * It uses a `NextPageRevalidateService` to perform the actual revalidation.
 */
export class NextPageRevalidateApi {
  revalidateService: NextPageRevalidateService;
  staticGenerationLogger: Logger;

  constructor({ revalidateService }: NextPageRevalidateApiInterface) {
    this.revalidateService = revalidateService;
    this.staticGenerationLogger = revalidateService.getLogger();
  }

  /**
   * API route handler for revalidating static pages.
   * It can revalidate a single page or all pages.
   * Revalidating all pages is done in the background to prevent timeouts.
   */
  async revalidateView(
    req: NextApiRequest,
    res: NextApiResponse,
    { pathnames = [] }: { pathnames?: string[] }
  ) {
    // only POST allowed
    if (req.method !== 'POST') {
      return res.status(405).send('Only POST requests allowed');
    }

    // Check for secret to confirm this is a valid request
    if (req.body.secret !== process.env.REVALIDATE_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const customUri = req.body.uri as string | undefined;

    if (customUri) {
      // Handle single URI revalidation
      try {
        this.staticGenerationLogger.info(
          `Attempting to revalidate single URI: ${customUri}`
        );
        const failedUri = await this.revalidateService.revalidate(
          res,
          customUri
        );
        if (failedUri) {
          return res
            .status(500)
            .json({ message: `Failed to revalidate: ${failedUri}` });
        }
        return res.status(200).json({
          revalidationtriggered: true,
          uri: customUri,
          status: 'success',
        });
      } catch (err) {
        this.staticGenerationLogger.error(
          `Unexpected error during single URI revalidation for ${customUri}`,
          err
        );
        return res.status(500).send(`Error revalidating ${customUri}`);
      }
    } else {
      // Handle revalidation of all pages (background process)
      this.staticGenerationLogger.info(
        'Attempting to revalidate all pages in background.'
      );

      // Respond immediately that the process has been accepted.
      res.status(202).json({
        revalidationtriggered: true,
        message:
          'Revalidation of all pages accepted and started in background.',
      });

      // NOTE: triggerAllCmsPagesRevalidation is too intensive (with all language versions,
      // there can be over 1000 pages and articles total):
      // - Pros: all active pages are revalidated
      // - Cons: Not all pages are generated, so revalidation does heavy work for nothing.
      // Instead of revalidating all, manually use `triggerAllPathnamesPagesRevalidation`.
      //
      // Start the revalidation process in the background.
      // Do not await this promise.
      // this.revalidateService
      //   .triggerAllCmsPagesRevalidation(res)
      //   .catch((error) => {
      //     this.staticGenerationLogger.error(
      //       'Failed to initiate background revalidation of all CMS-related pages.',
      //       error
      //     );
      //   });

      // Start the revalidation process in the background.
      // Do not await this promise.
      this.revalidateService
        .triggerAllPathnamesPagesRevalidation(res, pathnames)
        .catch((error) => {
          this.staticGenerationLogger.error(
            'Failed to initiate background revalidation of all pages under given pathnames.',
            { pathnames },
            error
          );
        });

      // The response has already been sent.
    }
  }
}
