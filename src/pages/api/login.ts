import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../server/models/user.model';
import { Request, Response } from 'express';
import dbConnect from '../../server/lib/dbConnect';
import cookie from 'cookie';

export default async function loginUser(req: Request, res: Response) {
  await dbConnect();

  const { email, password } = JSON.parse(req.body);

  if (!password || !email) {
    res.status(400).json({ meesage: 'password and/or email needed' });
  } else {
    const user = await User.findOne({ email });

    const userPassword = user?.password ?? '';

    const passwordCheck = await bcrypt.compare(password, userPassword);

    if (user && passwordCheck) {
      const token = jwt.sign({ id: user._id, email }, process.env.SECRET_TOKEN_KEY as Secret, {
        expiresIn: '2h',
      });
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('session-token', token, { httpOnly: true, path: '/' })
      );
      res.status(200).json({ message: 'success', token });
    } else {
      res.status(401).send({ message: 'Invalid Credentials' });
    }
  }
}
