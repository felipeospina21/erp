import { rest } from 'msw';
import { cities, departments } from '@/utils/test-utils/mockData/cities';

export const citiesHandlers = [
  rest.get(`${process.env.NEXT_PUBLIC_DATOS_GOV_URL}`, (req, res, ctx) => {
    const url = JSON.stringify(req.url);

    if (url.includes('municipio')) {
      return res(ctx.status(200), ctx.json(cities));
    }
    return res(ctx.status(200), ctx.json(departments));
  }),
];
