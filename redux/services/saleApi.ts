import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Client } from './clientApi';
import type { Product } from './productApi';

export interface OrderedProduct {
  item: Product;
  discount: number;
  listId: string;
  quantity: number;
  subtotal: number;
}

export interface Sale {
  clientInfo: Client;
  deliveryCity: string;
  orderedProducts: OrderedProduct[];
  salesChannel: string;
  subtotal: number;
  tax: number;
  total: number;
}

export const saleApi = createApi({
  reducerPath: 'saleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/sales`,
  }),
  tagTypes: ['Sale', 'Product'],
  endpoints: (build) => ({
    getSales: build.query<Sale[], void>({
      query: () => '/',
      providesTags: [{ type: 'Sale' }],
    }),
  }),
});

export const { useGetSalesQuery } = saleApi;
