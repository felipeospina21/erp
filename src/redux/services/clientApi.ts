import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './customBaseQuery';
import { HYDRATE } from 'next-redux-wrapper';
export interface DocumentId {
  _id: string;
}
export interface Client {
  _id?: string;
  addres1: string;
  addres2?: string;
  city: string;
  department: string;
  discount: number;
  email?: string;
  idNumber: string;
  idType: string;
  name: string;
}

export type UpdateClientValues = Omit<Client, '_id' | 'idNumber' | 'idType'>;
export interface UpdateClient extends DocumentId {
  update: UpdateClientValues;
}

export const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/clients`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Client'],
  endpoints: (build) => ({
    getClients: build.query<Client[], void>({
      query: () => ({ url: '/', method: 'GET' }),
      providesTags: [{ type: 'Client' }],
    }),
    getClientById: build.query<Client[], string>({
      query: (id) => ({ url: `/${id}`, method: 'GET' }),
      providesTags: [{ type: 'Client' }],
    }),
    createClient: build.mutation<Client, Client>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Client' }],
    }),
    updateClient: build.mutation<Client, UpdateClient>({
      query: (body) => ({
        url: '/',
        method: 'PUT',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Client' }],
    }),
    deleteClient: build.mutation<Client, DocumentId>({
      query: (body) => ({
        url: '/',
        method: 'DELETE',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Client' }],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  util: { getRunningOperationPromises: getClientRunningOperationPromises },
} = clientApi;

export const { getClients, getClientById, createClient, updateClient, deleteClient } =
  clientApi.endpoints;
