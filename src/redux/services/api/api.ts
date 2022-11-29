import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../customBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  tagTypes: ['Category', 'Sale', 'Product', 'Client', 'Consecutive', 'Tax', 'User'],
  endpoints: () => ({}),
});
