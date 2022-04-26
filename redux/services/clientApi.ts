import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface DocumentId {
  _id: string;
}
export interface Client {
  addres1: string;
  addres2?: string;
  city: string;
  department: string;
  discount: number;
  email?: string;
  idNumber: string;
  idType: string;
  name?: string;
}
export interface NewClientResponse extends Client, DocumentId {}

export interface UpdateClient extends DocumentId {
  update: {
    addres1?: string;
    addres2?: string;
    city?: string;
    department?: string;
    discount?: number;
    email?: string;
    name?: string;
  };
}

export const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/clients`,
  }),
  tagTypes: ['Client'],
  endpoints: (build) => ({
    getClients: build.query<NewClientResponse[], void>({
      query: () => '/',
      providesTags: [{ type: 'Client' }],
    }),
    getClientById: build.query<Client[], string>({
      query: (id) => `/${id}`,
      providesTags: [{ type: 'Client' }],
    }),
    createClient: build.mutation<NewClientResponse, Client>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Client' }],
    }),
    updateClient: build.mutation<NewClientResponse, UpdateClient>({
      query: (body) => ({
        url: '/',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Client' }],
    }),
    deleteClient: build.mutation<NewClientResponse, DocumentId>({
      query: (body) => ({
        url: '/',
        method: 'DELETE',
        body,
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
} = clientApi;
