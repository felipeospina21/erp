import { rest } from 'msw';
import { cities } from '@/utils/test-utils/mockData/cities';

export const citiesHandlers = [
  // rest.get(`${process.env.NEXT_PUBLIC_DATOS_GOV_URL}`, (req, res, ctx) => {
  //     const resp = cities.map(city => city.departamento)
  //     const departamentos = Array.from(new Set(resp));
  //     return res(ctx.status(200), ctx.json(departamentos));
  //   }),
  rest.get(`${process.env.NEXT_PUBLIC_DATOS_GOV_URL}`, (req, res, ctx) => {
    console.log(req.url.searchParams);
    const resp = cities.map((city) => city.departamento);
    const departamentos = Array.from(new Set(resp));
    return res(ctx.status(200), ctx.json(departamentos));
  }),
];
