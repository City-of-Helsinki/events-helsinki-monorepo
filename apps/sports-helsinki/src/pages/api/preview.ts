import {
  getAuthorizationHeader,
  getPreviewDataMaxAge,
} from '@events-helsinki/components';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.secret || !req.query.uri) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  // test
  const token = req.query.secret.toString();
  const maxAge = getPreviewDataMaxAge(token);

  res.setPreviewData(
    { token: getAuthorizationHeader(token), maxAge },
    { maxAge }
  );
  res.redirect(req.query.uri as string);
};
