import { createApi } from '@reduxjs/toolkit/query/react';
import { DocumentId } from './clientApi';
import { axiosBaseQuery } from './customBaseQuery';

export interface ConsecutiveResponse extends DocumentId {
  name: string;
  count: number;
  updatedAt: string;
}

export const consecutiveApi = createApi({
  reducerPath: 'consecutiveApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/consecutive`,
  }),
  tagTypes: ['Consecutive'],
  endpoints: (build) => ({
    getInvoiceCount: build.query<ConsecutiveResponse, void>({
      query: () => ({
        url: `/${process.env.NEXT_PUBLIC_COUNT_ID}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Consecutive' }],
    }),
    updateInvoiceCount: build.mutation<ConsecutiveResponse, void>({
      query: () => ({
        url: '/',
        method: 'PUT',
        data: { _id: process.env.NEXT_PUBLIC_COUNT_ID },
      }),
      invalidatesTags: [{ type: 'Consecutive' }],
    }),
    getSaleRefCount: build.query<ConsecutiveResponse, void>({
      query: () => ({
        url: `/${process.env.NEXT_PUBLIC_SALE_REF_COUNT_ID}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Consecutive' }],
    }),
    updateSaleRefCount: build.mutation<ConsecutiveResponse, void>({
      query: () => ({
        url: '/',
        method: 'PUT',
        data: { _id: process.env.NEXT_PUBLIC_SALE_REF_COUNT_ID },
      }),
      invalidatesTags: [{ type: 'Consecutive' }],
    }),
  }),
});

export const {
  useUpdateInvoiceCountMutation,
  useGetInvoiceCountQuery,
  useUpdateSaleRefCountMutation,
  useGetSaleRefCountQuery,
  util: { getRunningOperationPromises: getConsecutiveRunningOperationPromises },
} = consecutiveApi;

export const { updateInvoiceCount, getInvoiceCount, getSaleRefCount, updateSaleRefCount } =
  consecutiveApi.endpoints;
