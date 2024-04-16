import { getMaxAge, getToken } from '@events-helsinki/components';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.secret || !req.query.uri) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const token = req.query.secret.toString();
  res.setPreviewData({ token: getToken(token) }, { maxAge: getMaxAge(token) });
  res.redirect(req.query.uri as string);
};
