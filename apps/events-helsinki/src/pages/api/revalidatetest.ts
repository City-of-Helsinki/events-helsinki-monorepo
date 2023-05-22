// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { getAllArticles, getAllPages } from '@events-helsinki/components';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { eventsApolloClient } from '../../domain/clients/eventsApolloClient';
import { staticGenerationLogger } from '../../logger';

export const config = {
  runtime: 'edge', // edge | nodejs
};

// https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const encoder = new TextEncoder();

async function* makeIterator() {
  yield encoder.encode('<p>One</p>');
  await sleep(2000);
  yield encoder.encode('<p>Two</p>');
  await sleep(2000);
  yield encoder.encode('<p>Three</p>');
  await sleep(2000);
  yield encoder.encode('<p>Four</p>');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const iterator = makeIterator();
  const stream = iteratorToStream(iterator);
  return new Response(stream);

  // const errors: string[] = [];
  // try {
  //   // get all articles
  //   const articlePageInfos = await getAllArticles(eventsApolloClient);
  //   for (const pageInfo of articlePageInfos) {
  //     const ret = await _revalidate(res, pageInfo.uri);
  //     if (ret) errors.push(ret);
  //   }

  //   // get all pages
  //   const pagePageInfos = await getAllPages(eventsApolloClient);
  //   for (const pageInfo of pagePageInfos) {
  //     const ret = await _revalidate(res, pageInfo.uri);
  //     if (ret) errors.push(ret);
  //   }

  //   // errors during revalidation
  //   if (errors?.length > 0)
  //     return res.status(404).json({ revalidated: false, errors });

  //   return res.status(200).json({ revalidated: true });
  // } catch (err) {
  //   // If there was an error, Next.js will continue
  //   // to show the last successfully generated page
  //   return res.status(500).send('Error revalidating');
  // }
}

// // revalidate a page
// // return the uri if revalidation failed
// async function _revalidate(res: NextApiResponse, uri: string) {
//   try {
//     const _uri = uri.replace(/\/$/, '');
//     if (_uri.length < 1) return null;

//     await res.revalidate(_uri);
//   } catch (err) {
//     staticGenerationLogger.error(`Error while revalidate a page: ${uri}`, err);
//     return uri;
//   }
//   return null;
// }
