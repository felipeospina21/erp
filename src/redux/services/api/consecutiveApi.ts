import { api } from './api';
import { DocumentId } from './clientApi';

export interface ConsecutiveResponse extends DocumentId {
  name: string;
  count: number;
  updatedAt: string;
}

export const consecutiveApi = api.injectEndpoints({
  endpoints: (build) => ({
    getInvoiceCount: build.query<ConsecutiveResponse, void>({
      query: () => ({
        url: `/consecutive/${process.env.NEXT_PUBLIC_COUNT_ID}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Consecutive' }],
    }),
    updateInvoiceCount: build.mutation<ConsecutiveResponse, void>({
      query: () => ({
        url: '/consecutive',
        method: 'PUT',
        data: { _id: process.env.NEXT_PUBLIC_COUNT_ID },
      }),
      invalidatesTags: [{ type: 'Consecutive' }],
    }),
    getSaleRefCount: build.query<ConsecutiveResponse, void>({
      query: () => ({
        url: `/consecutive/${process.env.NEXT_PUBLIC_SALE_REF_COUNT_ID}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Consecutive' }],
    }),
    updateSaleRefCount: build.mutation<ConsecutiveResponse, void>({
      query: () => ({
        url: '/consecutive',
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
