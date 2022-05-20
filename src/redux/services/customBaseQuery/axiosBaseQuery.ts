import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      withCredentials?: AxiosRequestConfig['withCredentials'];
      proxy?: AxiosRequestConfig['proxy'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, proxy, headers, withCredentials = true }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials,
        proxy,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
