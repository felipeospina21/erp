import { api } from './api';
import type { Client, DocumentId } from './clientApi';
import type { Product } from './productApi';

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

export interface DeleteSale {
  message: string;
}

export const saleApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSales: build.query<SaleResponse[], void>({
      query: () => ({ url: '/sales', method: 'GET', withCredentials: true }),
      providesTags: [{ type: 'Sale' }],
    }),
    saveSale: build.mutation<NewSaleResponse, NewSale>({
      query: (body) => ({
        url: '/sales',
        method: 'post',
        withCredentials: true,
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Sale' }, { type: 'Product' }],
    }),
    cancelSale: build.mutation<DeleteSale, string>({
      query: (id) => ({
        url: `/sales/cancelDoc/${id}`,
        method: 'PUT',
        withCredentials: true,
      }),
      invalidatesTags: [{ type: 'Sale' }, { type: 'Product' }],
    }),
  }),
});

export const {
  useGetSalesQuery,
  useSaveSaleMutation,
  useCancelSaleMutation,
  util: { getRunningOperationPromises: getSaleRunningOperationPromises },
} = saleApi;
export const { getSales, saveSale, cancelSale } = saleApi.endpoints;
