import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { Request, Response } from 'express';

export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const newUser = await User.create({ email, password });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

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
      res.status(200).json({ message: 'success', token });
    } else {
      res.status(401).send({ message: 'Invalid Credentials' });
    }
  }
}

export function logoutUser(req: Request, res: Response) {
  try {
    res.clearCookie('session-token');
    res.status(200).json({ message: 'session canceled' });
  } catch (error) {
    res.json({ message: 'not cookie found' });
  }
}
