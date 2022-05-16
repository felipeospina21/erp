import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/utils/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from 'server/models/user.model';

export interface User extends IUser {
  isLoggedIn: boolean;
  login: string;
  _id?: string;
}

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      login: '',
      email: '',
      password: '',
    });
  }
}
