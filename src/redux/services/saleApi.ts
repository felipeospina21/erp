import { createApi } from '@reduxjs/toolkit/query/react';
import type { Client, DocumentId } from './clientApi';
import type { Product } from './productApi';
import { axiosBaseQuery } from './customBaseQuery';

export interface RowInfo {
  rowId: string;
  rowTotal: number;
}

export interface OrderedProduct extends RowInfo {
  item: Product;
}

export interface NewSaleOrderedProduct extends RowInfo {
  item: string;
  productId: string;
  price: number;
  stock: number;
  quantity: number;
  discount: number;
  shipping?: number;
}

export interface SaleSummary {
  subtotal: number;
  tax: number;
  total: number;
  withholdingTax?: number;
}

export interface CheckoutData {
  deliveryCity: string;
  paymentTerm: string;
}

export interface NewSale extends CheckoutData, SaleSummary {
  clientId: string;
  orderedProducts: Array<
    Pick<NewSaleOrderedProduct, 'item' | 'discount' | 'quantity' | 'rowTotal'>
  >;
  invoiceRef?: string;
  saleRequestRef: string;
  status:
    | 'producción'
    | 'alistamiento'
    | 'despachado'
    | 'entregado'
    | 'facturado'
    | 'en cartera'
    | 'pagado'
    | 'anulado'
    | '';
}
export interface SaleResponse extends CheckoutData, SaleSummary {
  clientInfo: Client;
  orderedProducts: NewSaleOrderedProduct[];
  clientId?: {
    _id: string;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
  invoiceRef?: string;
  saleRequestRef: string;
  status: string;
  _id: string;
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
    saveSale: build.mutation<NewSaleResponse, NewSale>({
      query: (body) => ({
        url: '/',
        method: 'post',
        withCredentials: true,
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Sale' }, { type: 'Product' }],
    }),
    deleteSale: build.mutation<SaleResponse, string>({
      query: (id) => ({
        url: '/',
        method: 'DELETE',
        withCredentials: true,
        data: { _id: id },
      }),
      invalidatesTags: [{ type: 'Sale' }],
    }),
  }),
});

export const {
  useGetSalesQuery,
  useSaveSaleMutation,
  useDeleteSaleMutation,
  util: { getRunningOperationPromises: getSaleRunningOperationPromises },
} = saleApi;
export const { getSales, saveSale, deleteSale } = saleApi.endpoints;
