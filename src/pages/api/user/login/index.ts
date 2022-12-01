import type { NextApiRequest, NextApiResponse } from 'next';
import { User, UserModel } from '@/server/models';
import { dbConnect, generateToken, sessionOptions } from '@/server/utils';
import { findOneByField } from '@/server/mongoose/helpers';
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<undefined | NextApiResponse> {
  await dbConnect();
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

  req.session.user = {
    _id: user._id,
    email: user.email,
  };

  await req.session.save();
  res.status(200).json({ message: 'success', user: { id: user._id } });
}
