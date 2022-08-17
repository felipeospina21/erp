import { api } from './api';
import { DocumentId } from './clientApi';

export interface Tax extends DocumentId {
  concept: string;
  base: number;
  percentage: number;
}

export const taxApi = api.injectEndpoints({
  endpoints: (build) => ({
    getwithholdingTax: build.query<Tax, string>({
      query: (id) => ({
        url: `/tax/${id}`,
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
