import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Client, DocumentId } from './clientApi';
import type { Product } from './productApi';

export interface OrderInfo {
  discount: number;
  listId: string;
  quantity: number;
  subtotal: number;
};

export interface SaleInfo {
  deliveryCity: string;
  salesChannel: string;
  subtotal: number;
  tax: number;
  total: number;
};
export interface OrderedProduct extends OrderInfo{
  item: Product ;
}

export interface NewSaleOrderedProduct extends OrderInfo {
  item: string ;
}

export interface NewSale extends SaleInfo{
  clientInfo: string;
  orderedProducts: NewSaleOrderedProduct[];
};
export interface SaleResponse extends SaleInfo{
  clientInfo: Client;
  orderedProducts: OrderedProduct[];
}

export interface NewSaleResponse extends SaleResponse, DocumentId {};

export const saleApi = createApi({
  reducerPath: 'saleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/sales`,
  }),
  tagTypes: ['Sale', 'Product'],
  endpoints: (build) => ({
    getSales: build.query<SaleResponse[], void>({
      query: () => '/',
      providesTags: [{ type: 'Sale' }],
    }),
    saveSale: build.mutation<NewSaleResponse,Partial<NewSale>>({
      // TODO: Check body type, not to be partial but required
      query: (body) => ({
        url:'/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'Sale'}, {type:'Product'}]
    })
  }),
});

export const { useGetSalesQuery, useSaveSaleMutation } = saleApi;
