import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DocumentId } from './clientApi';

export interface Product extends DocumentId {
  alias: string;
  name: string;
  price: number;
  stock: number;
  subtotal?: number;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/products`,
  }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => '/',
      providesTags: [{ type: 'Product' }],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
