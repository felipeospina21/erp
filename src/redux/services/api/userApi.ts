import { api } from './api';
import { DocumentId } from './clientApi';

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

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<User, UserBody>({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    login: build.mutation<UserResponse, UserBody>({
      query: (body) => ({
        url: '/user/login',
        method: 'POST',
        withCredentials: true,
        data: { ...body },
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    logout: build.mutation<UserResponse, void>({
      query: () => ({
        url: '/user/logout',
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
