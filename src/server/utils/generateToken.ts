import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function generateToken(
  reqPassword: string,
  userPassword: string,
  userId: string,
  userEmail: string
) {
  const passwordCheck = await bcrypt.compare(reqPassword, userPassword);

  if (!passwordCheck) {
    return;
  } else {
    return jwt.sign({ id: userId, email: userEmail }, process.env.SECRET_TOKEN_KEY as Secret, {
      expiresIn: '12h',
    });
  }
}
