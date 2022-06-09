import { createApi } from '@reduxjs/toolkit/query/react';
import { DocumentId } from './clientApi';
import { axiosBaseQuery } from './customBaseQuery';

export interface Category extends DocumentId {
  name: string;
}

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/category`,
  }),
  tagTypes: ['Category'],
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: [{ type: 'Category' }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  util: { getRunningOperationPromises: getCategoryRunningOperationPromises },
} = categoryApi;

export const { getCategories } = categoryApi.endpoints;
