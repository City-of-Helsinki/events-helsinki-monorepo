// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  NextPageRevalidateService,
  NextPageRevalidateApi,
} from '@events-helsinki/components';
import type { NextApiRequest, NextApiResponse } from 'next';
import { eventsApolloClient } from '../../domain/clients/eventsApolloClient';
import { staticGenerationLogger } from '../../logger';

const revalidateService = new NextPageRevalidateService({
  staticGenerationLogger,
  cmsApolloClient: eventsApolloClient,
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
  revalidateApi.revalidateView(req, res);
}
