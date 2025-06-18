// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  NextPageRevalidateApi,
  NextPageRevalidateService,
  APP_LANGUAGES,
} from '@events-helsinki/components';
import type { NextApiRequest, NextApiResponse } from 'next';
import { hobbiesApolloClient } from '../../domain/clients/hobbiesApolloClient';
import { staticGenerationLogger } from '../../logger';

const revalidateService = new NextPageRevalidateService({
  staticGenerationLogger,
  cmsApolloClient: hobbiesApolloClient,
});

const revalidateApi = new NextPageRevalidateApi({ revalidateService });

/**
 * API route handler for revalidating static pages.
 * It can revalidate a single page or all pages.
 * Revalidating all pages is done in the background to prevent timeouts.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pathnames = APP_LANGUAGES.map((lang) => `/${lang}`);
  revalidateApi.revalidateView(req, res, { pathnames });
}
