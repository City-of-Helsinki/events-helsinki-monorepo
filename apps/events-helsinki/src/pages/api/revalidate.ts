// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllArticles, getAllPages } from '@events-helsinki/components';
import type { NextApiRequest, NextApiResponse } from 'next';
import { eventsApolloClient } from '../../domain/clients/eventsApolloClient';
import { staticGenerationLogger } from '../../logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.body.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const mainPages = ['/en', '/fi', '/sv'];
  try {
    // main pages
    for (const page of mainPages) {
      _revalidate(res, page);
    }

    // get all articles
    const articlePageInfos = await getAllArticles(eventsApolloClient);
    for (const pageInfo of articlePageInfos) {
      _revalidate(res, pageInfo.uri);
    }

    // get all pages
    const pagePageInfos = await getAllPages(eventsApolloClient);
    for (const pageInfo of pagePageInfos) {
      _revalidate(res, pageInfo.uri);
    }

    return res.status(200).json({ revalidatetrigger: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}

// revalidate a page
// return the uri if revalidation failed
async function _revalidate(res: NextApiResponse, uri: string) {
  try {
    const _uri = uri.replace(/\/$/, '');
    if (_uri.length < 1) return null;

    await res.revalidate(_uri);
  } catch (err) {
    staticGenerationLogger.error(`Error while revalidate a page: ${uri}`, err);
    return uri;
  }
  return null;
}
