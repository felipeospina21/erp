import { api } from './api';

export interface DocumentId {
  _id: string;
}

export type PaymentOptions = 'contado' | '15' | '30' | '60';

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
  paymentTerm: PaymentOptions;
  retailer: boolean;
}

export type UpdateClientValues = Omit<Client, '_id' | 'idNumber' | 'idType' | 'discount'>;
export interface UpdateClient extends DocumentId, UpdateClientValues {
  discount: string;
}

export const clientApi = api.injectEndpoints({
  endpoints: (build) => ({
    getClients: build.query<Client[], void>({
      query: () => ({ url: '/clients', method: 'GET' }),
      providesTags: [{ type: 'Client' }],
    }),
    getClientById: build.query<Client, string>({
      query: (id) => ({ url: `/clients/${id}`, method: 'GET' }),
      providesTags: [{ type: 'Client' }],
    }),
    createClient: build.mutation<Client, Client>({
      query: (body) => ({
        url: '/clients',
        method: 'POST',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Client' }],
    }),
    updateClient: build.mutation<Client, UpdateClient>({
      query: (body) => ({
        url: '/clients',
        method: 'PUT',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'Client' }],
    }),
    deleteClient: build.mutation<Client, DocumentId>({
      query: (body) => ({
        url: '/clients',
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
} = clientApi;
