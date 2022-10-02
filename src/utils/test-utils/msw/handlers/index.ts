import { userHandlers } from './userHandlers';
import { productHandlers } from './productHandlers';
import { categoryHandlers } from './categoryHandlers';
import { citiesHandlers } from './citiesHandlers';
import { clientHandlers } from './clientHandlers';

export const handlers = [
  ...userHandlers,
  ...productHandlers,
  ...categoryHandlers,
  ...citiesHandlers,
  ...clientHandlers,
];
