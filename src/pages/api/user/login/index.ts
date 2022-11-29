import type { NextApiRequest, NextApiResponse } from 'next';
import { User, UserModel } from '@/server/models';
import { dbConnect, generateToken } from '@/server/utils';
import { findOneByField } from '@/server/mongoose/helpers';
// import Cookies from 'cookies';

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      const { email, password } = req.body;
      if (!password || !email) {
        res.status(400).json({ message: 'password and/or email needed' });
        return;
      }

      const user = (await findOneByField(UserModel, { email })) as User;
      if (!user) {
        res.status(400).json({ message: 'user not found' });
        return;
      }

      const token = await generateToken(password, user?.password, user._id, email);
      if (!token) {
        res.status(401).json({ message: 'wrong password' });
        return;
      }

      // const cookies = new Cookies(req, res);
      // cookies.set('session-token', token, { httpOnly: true, sameSite: 'none', secure: true });
      res.status(200).json({ message: 'success', user: { id: user._id } });
      break;
  }
}
