// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  NextPageRevalidateApi,
  NextPageRevalidateService,
  APP_LANGUAGES,
} from '@events-helsinki/components';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ROUTES } from '../../constants';
import { hobbiesApolloClient } from '../../domain/clients/hobbiesApolloClient';
import { staticGenerationLogger } from '../../logger';

const revalidateService = new NextPageRevalidateService({
  staticGenerationLogger,
  cmsApolloClient: hobbiesApolloClient,
});

const revalidateApi = new NextPageRevalidateApi({ revalidateService });

const routes = [`/${ROUTES.COURSES.split('/')[1]}`];

/**
 * API route handler for revalidating static pages.
 * It can revalidate a single page or all pages.
 * Revalidating all pages is done in the background to prevent timeouts.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pathnames = APP_LANGUAGES.flatMap((lang) =>
    routes.map((route) => `/${lang}${route}`)
  );
  revalidateApi.revalidateView(req, res, { pathnames });
}
