import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/server/utils';

export default async function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        // TODO: Check how to clear cookie
        // res.clearCookie('session-token');
        res.status(200).json({ message: 'session canceled' });
      } catch (error) {
        res.json({ message: 'not cookie found' });
      }
      break;
  }
}
