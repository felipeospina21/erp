import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DocumentId } from './clientApi';

export interface UserBody {
  email: string;
  password: string;
}
export interface User extends DocumentId, UserBody {}

export interface UserResponse {
  message: string;
  token?: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/user`,
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    createUser: build.mutation<User, UserBody>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    login: build.mutation<UserResponse, UserBody>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
  }),
});

export const { useCreateUserMutation, useLoginMutation } = userApi;
