import { LoginData } from '@/redux/services';
import { rest } from 'msw';

export const userHandlers = [
  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, (req, res, ctx) => {
    const { email, password } = req.body as LoginData;

    if (!password || !email) {
      return res(ctx.status(400), ctx.json({ message: 'password and/or email needed' }));
    }

    if (email?.toLowerCase().includes('notfound')) {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'user not found',
        })
      );
    }

    if (email?.toLowerCase().includes('unauthorized')) {
      return res(
        ctx.status(401),
        ctx.json({
          message: 'wrong password',
        })
      );
    }

    if (email?.toLowerCase().includes('nonetwork')) {
      return res(
        ctx.status(500),
        ctx.json({
          message: undefined,
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
        user: {
          isLoggedin: true,
          email: 'test@email.com',
          firstName: 'john',
          lastName: 'doe',
        },
      })
    );
  }),

  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'session canceled',
      })
    );
  }),
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/user/:id`, (req, res, ctx) => {
    const { id } = req.params;
    if (id === '1') {
      return res(ctx.status(401), ctx.json({ message: 'not authorized' }));
    }
    return res(
      ctx.status(200),
      ctx.json({
        message: 'session canceled',
      })
    );
  }),
];
