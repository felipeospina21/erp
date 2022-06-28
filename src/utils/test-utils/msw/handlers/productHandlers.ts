import { rest } from 'msw';
import { mockProducts } from '@/mockData/products';

export const productHandlers = [
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...mockProducts]));
  }),

  rest.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, (req, res, ctx) => {
    const newProduct = {
      category: { _id: '3', name: 'test prod 3' },
      name: 'test name',
      price: 10000,
      stock: 10,
      _id: 'newProduct',
    };
    return res(ctx.status(200), ctx.json(newProduct));
  }),

  rest.put(`${process.env.NEXT_PUBLIC_API_URL}/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'success' }));
  }),
];
