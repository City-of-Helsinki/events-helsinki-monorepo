import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const version = process.env.NEXT_PUBLIC_VERSION;
  res.status(200).json({ status: 'ok', version: `${version}` });
}
