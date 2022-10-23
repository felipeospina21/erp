import { api } from './api';
import { DocumentId } from './clientApi';

export interface Category extends DocumentId {
  name: string;
}

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      query: () => ({
        url: '/category',
        method: 'GET',
        withCredentials: true,
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
