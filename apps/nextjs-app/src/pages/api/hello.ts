import { sayHello } from 'events-helsinki-core-old';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handleApiHelloRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.send(sayHello('world loaded from /api/hello'));
}
