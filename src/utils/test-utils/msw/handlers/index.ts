import { userHandlers } from './userHandlers';
import { productHandlers } from './productHandlers';
import { categoryHandlers } from './categoryHandlers';

export const handlers = [...userHandlers, ...productHandlers, ...categoryHandlers];
