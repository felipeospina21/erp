import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DocumentId } from './clientApi';

export interface Product extends DocumentId {
  alias: string;
  name: string;
  price: number;
  stock: number;
  subtotal?: number;
}

export interface UpdateProduct extends DocumentId {
  update: {
    alias?: string;
    name?: string;
    price?: number;
    stock?: number;
  };
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
    updateProduct: build.mutation<Product, UpdateProduct>({
      query: (body) => ({
        url: '/',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
    deleteProduct: build.mutation<Product, DocumentId>({
      query: (body) => ({
        url: '/',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [{ type: 'Product' }],
    }),
  }),
});

export const { useGetProductsQuery, useUpdateProductMutation, useDeleteProductMutation } =
  productApi;
