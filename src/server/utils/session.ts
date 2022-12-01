import type { IronSessionOptions } from 'iron-session';

export const sessionOptions: IronSessionOptions = {
  cookieName: 'session-token',
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
};
