import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '@/server/utils';
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse): void {
  req.session.destroy();
  res.status(200).json({ message: 'session canceled' });
}
