import { createApi } from '@reduxjs/toolkit/query/react';
import { DocumentId } from './clientApi';
import { axiosBaseQuery } from './customBaseQuery';

export interface Tax extends DocumentId {
  concept: string;
  base: number;
  percentage: number;
}

export const taxApi = createApi({
  reducerPath: 'taxApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/tax`,
  }),
  tagTypes: ['Tax'],
  endpoints: (build) => ({
    getwithholdingTax: build.query<Tax, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Tax' }],
    }),
  }),
});

export const {
  useGetwithholdingTaxQuery,
  util: { getRunningOperationPromises: getTaxRunningOperationPromises },
} = taxApi;

export const { getwithholdingTax } = taxApi.endpoints;
