/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiResponse } from 'next';

const CMS_GRAPHQL_ENDPOINT =
  'https://events-graphql-federation-events.test.hel.ninja/';

export const config = {
  runtime: 'edge', // edge | nodejs
};

const getNodeUri = (resultSet: any) =>
  resultSet.edges.map((edge: any) => edge.node.uri);

async function getArticlesAndPages() {
  const body = {
    query:
      'query revalidate($first: Int) {\n  posts(first: $first) {\n    edges {\n      node {\n        uri\n      }\n    }\n  }\n  pages(first: $first) {\n    edges {\n      node {\n        uri\n      }\n    }\n  }\n}',
    variables: {
      first: 100,
    },
    operationName: 'revalidate',
  };

  return await fetch(CMS_GRAPHQL_ENDPOINT, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(body),
  })
    .then((response: Response) => {
      return response.json();
    })
    .then((json: any) => {
      return {
        articles: getNodeUri(json.data.posts),
        pages: getNodeUri(json.data.pages),
      };
    });
}

// https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
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

const encoder = new TextEncoder();

async function* makeIterator(response: NextApiResponse, staticPaths: string[]) {
  // const errors = [];
  for (const uri of staticPaths) {
    await _revalidate(response, uri);
    // if (ret) errors.push(ret);
    yield encoder.encode(`<p>${uri}</p>`);
  }
}

export default async function handler(response: NextApiResponse) {
  const { articles, pages } = await getArticlesAndPages();
  const iterator = makeIterator(response, [...articles, ...pages]);
  const stream = iteratorToStream(iterator);
  return new Response(stream);
}

// revalidate a page
// return the uri if revalidation failed
async function _revalidate(response: NextApiResponse, uri: string) {
  try {
    const _uri = uri.replace(/\/$/, '');
    if (_uri.length < 1) return null;

    await response.revalidate(_uri);
  } catch (err) {
    // staticGenerationLogger.error(`Error while revalidate a page: ${uri}`, err);
    return uri;
  }
  return null;
}
