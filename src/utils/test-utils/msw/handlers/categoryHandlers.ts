import { rest } from 'msw';

export const categoryHandlers = [
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/category`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ _id: 'test 1', name: 'test category' }]));
  }),
];
