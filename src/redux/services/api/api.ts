import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../customBaseQuery';
import { HYDRATE } from 'next-redux-wrapper';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Category', 'Sale', 'Product', 'Client', 'Consecutive', 'Tax', 'User'],
  endpoints: () => ({}),
});
