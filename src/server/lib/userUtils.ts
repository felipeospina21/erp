import { IUser, User } from '../models/user.model';
import bcrypt from 'bcrypt';

export interface DocumentId {
  _id?: string;
}

export interface UserResponse extends DocumentId, IUser {}

export interface FindUserProps {
  email: string;
}

export async function findUser({ email }: FindUserProps): Promise<UserResponse | null> {
  return await User.findOne({ email });
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export async function validatePassword(
  user: UserResponse,
  inputPassword: string
): Promise<boolean> {
  const userPassword = user?.password ?? '';

  return await bcrypt.compare(inputPassword, userPassword);
}
