import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Departamento {
  departamento: string;
}

export interface Municipio {
  municipio: string;
}

export interface Options {
  _id: string;
  name: string;
}

export const citiesApi = createApi({
  reducerPath: 'citiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DATOS_GOV_URL}`,
  }),
  tagTypes: ['Departments', 'Cities'],
  endpoints: (build) => ({
    getDepartments: build.query<Options[], void>({
      query: () => ({
        url: `?$select=departamento&$$app_token=${process.env.NEXT_PUBLIC_DATOS_GOV_API_TOKEN}`,
      }),
      providesTags: [{ type: 'Departments' }],
      transformResponse: (response: Departamento[]) => {
        const resp = response?.map((e: Departamento) => e.departamento);
        const departamentos = Array.from(new Set(resp));
        departamentos.sort();
        return departamentos.map((dep) => ({ _id: dep, name: dep }));
      },
    }),
    getCities: build.query<Options[], string>({
      query: (department) => ({
        url: `?departamento=${department}&$select=municipio&$$app_token=${process.env.NEXT_PUBLIC_DATOS_GOV_API_TOKEN}`,
      }),
      providesTags: [{ type: 'Cities' }],
      transformResponse: (response: Municipio[]) => {
        const resp = response?.map((e: Municipio) => e.municipio);
        const municipios = Array.from(new Set(resp));
        municipios.sort();
        return municipios.map((city) => ({ _id: city, name: city }));
      },
    }),
  }),
});

export const { useGetDepartmentsQuery, useGetCitiesQuery } = citiesApi;
