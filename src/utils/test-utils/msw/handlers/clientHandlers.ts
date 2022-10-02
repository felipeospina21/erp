import { rest } from 'msw';
import { clients } from '@/utils/test-utils/mockData';

export const clientHandlers = [
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/clients`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(clients));
  }),
];
