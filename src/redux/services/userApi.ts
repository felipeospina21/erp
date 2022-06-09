import { createApi } from '@reduxjs/toolkit/query/react';
import { DocumentId } from './clientApi';
import { axiosBaseQuery } from './customBaseQuery';

export interface UserBody {
  email: string;
  password: string;
}
export interface User extends DocumentId, UserBody {}

export interface UserData {
  isLoggedin: boolean;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}
export interface UserResponse {
  message: string;
  user?: UserData;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/user`,
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    createUser: build.mutation<User, UserBody>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    login: build.mutation<UserResponse, UserBody>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        withCredentials: true,
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    logout: build.mutation<UserResponse, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        withCredentials: true,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useLogoutMutation,
  util: { getRunningOperationPromises: getUserProductRunningOperationPromises },
} = userApi;
export const { createUser, login, logout } = userApi.endpoints;
