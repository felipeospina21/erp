import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
// export interface NewClientResponse extends Client, DocumentId {}

export type UpdateClientValues = Omit<Client, '_id' | 'idNumber' | 'idType'>;
export interface UpdateClient extends DocumentId {
  update: UpdateClientValues;
  // {
  //   addres1?: string;
  //   addres2?: string;
  //   city?: string;
  //   department?: string;
  //   discount?: number;
  //   email?: string;
  //   name?: string;
  // };
}

export const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/clients`,
  }),
  tagTypes: ['Client'],
  endpoints: (build) => ({
    getClients: build.query<Client[], void>({
      query: () => '/',
      providesTags: [{ type: 'Client' }],
    }),
    getClientById: build.query<Client[], string>({
      query: (id) => `/${id}`,
      providesTags: [{ type: 'Client' }],
    }),
    createClient: build.mutation<Client, Client>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Client' }],
    }),
    updateClient: build.mutation<Client, UpdateClient>({
      query: (body) => ({
        url: '/',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Client' }],
    }),
    deleteClient: build.mutation<Client, DocumentId>({
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
