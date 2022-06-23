import { createApi } from '@reduxjs/toolkit/query/react';
import { DocumentId } from './clientApi';
import { axiosBaseQuery } from './customBaseQuery';

export interface InvoiceResponse extends DocumentId {
  count: number;
  updatedAt: string;
}

export const invoiceApi = createApi({
  reducerPath: 'invoiceApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/invoice`,
  }),
  tagTypes: ['Invoice'],
  endpoints: (build) => ({
    getInvoiceCount: build.query<InvoiceResponse, void>({
      query: () => ({
        url: `/${process.env.NEXT_PUBLIC_COUNT_ID}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Invoice' }],
    }),
    updateInvoiceCount: build.mutation<InvoiceResponse, void>({
      query: () => ({
        url: '/',
        method: 'PUT',
        data: { _id: process.env.NEXT_PUBLIC_COUNT_ID },
      }),
      invalidatesTags: [{ type: 'Invoice' }],
    }),
  }),
});

export const {
  useUpdateInvoiceCountMutation,
  useGetInvoiceCountQuery,
  util: { getRunningOperationPromises: getInvoiceRunningOperationPromises },
} = invoiceApi;

export const { updateInvoiceCount, getInvoiceCount } = invoiceApi.endpoints;
