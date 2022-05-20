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
    updateInvoiceCount: build.mutation<InvoiceResponse, void>({
      query: () => ({
        url: '/',
        method: 'PUT',
        data: { _id: '62857596dc8d577f73f91f28' },
      }),
      invalidatesTags: [{ type: 'Invoice' }],
    }),
  }),
});

export const { useUpdateInvoiceCountMutation } = invoiceApi;
