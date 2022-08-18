import { api } from './api';
import { DocumentId } from './clientApi';

export interface LoginData {
  email: string;
  password: string;
}

export interface User extends DocumentId {
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}

export interface LoginResponse {
  message: string;
  user: { id: string };
}

export interface LogoutResponse {
  message: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<DocumentId, LoginData>({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    login: build.mutation<LoginResponse, LoginData>({
      query: (body) => ({
        url: '/user/login',
        method: 'POST',
        withCredentials: true,
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    logout: build.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/user/logout',
        method: 'POST',
        withCredentials: true,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    getUser: build.query<User, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'User' }],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  util: { getRunningOperationPromises: getUserProductRunningOperationPromises },
} = userApi;
export const { createUser, login, logout, getUser } = userApi.endpoints;
