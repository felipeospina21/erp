import { MAX_AGE, setTokenCookie } from './authCookies';
import jwt, { Secret } from 'jsonwebtoken';
import { NextApiResponse } from 'next';
import { UserResponse } from './userUtils';
// const TOKEN_SECRET = process.env.TOKEN_SECRET

export async function setLoginSession(res: NextApiResponse, session: UserResponse): Promise<void> {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = jwt.sign(obj, process.env.SECRET_TOKEN_KEY as Secret, {
    expiresIn: '2h',
  });

  setTokenCookie(res, token);
}

// export async function getLoginSession(req) {
//   const token = getTokenCookie(req)

//   if (!token) return

//   const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
//   const expiresAt = session.createdAt + session.maxAge * 1000

//   // Validate the expiration date of the session
//   if (Date.now() > expiresAt) {
//     throw new Error('Session expired')
//   }

//   return session
// }
