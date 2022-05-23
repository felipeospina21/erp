import { createApi } from '@reduxjs/toolkit/query/react';
import type { Client, DocumentId } from './clientApi';
import type { Product } from './productApi';
import { axiosBaseQuery } from './customBaseQuery';

export interface OrderInfo {
  discount: number;
  listId: string;
  quantity: number;
  subtotal: number;
}

export interface SaleInfo {
  deliveryCity: string;
  salesChannel: string;
  subtotal: number;
  tax: number;
  total: number;
}
export interface OrderedProduct extends OrderInfo {
  item: Product;
}

export interface NewSaleOrderedProduct extends OrderInfo {
  item: string;
  price?: number;
  name?: string;
}

export interface NewSale extends SaleInfo {
  clientId: string;
  orderedProducts: NewSaleOrderedProduct[];
}
export interface SaleResponse extends SaleInfo {
  clientInfo: Client;
  orderedProducts: OrderedProduct[];
}

export interface NewSaleResponse extends SaleResponse, DocumentId {}

export const saleApi = createApi({
  reducerPath: 'saleApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/sales`,
  }),
  tagTypes: ['Sale', 'Product'],
  endpoints: (build) => ({
    getSales: build.query<SaleResponse[], void>({
      query: () => ({ url: '/', method: 'GET', withCredentials: true }),
      providesTags: [{ type: 'Sale' }],
    }),
    saveSale: build.mutation<NewSaleResponse, Partial<NewSale>>({
      // TODO: Check body type, not to be partial but required
      query: (body) => ({
        url: '/',
        method: 'post',
        withCredentials: true,
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Sale' }, { type: 'Product' }],
    }),
  }),
});

export const {
  useGetSalesQuery,
  useSaveSaleMutation,
  util: { getRunningOperationPromises: getSaleRunningOperationPromises },
} = saleApi;
export const { getSales, saveSale } = saleApi.endpoints;
