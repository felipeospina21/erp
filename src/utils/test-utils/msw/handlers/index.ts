import { userHandlers } from './userHandlers';
import { productHandlers } from './productHandlers';

export const handlers = [...userHandlers, ...productHandlers];
