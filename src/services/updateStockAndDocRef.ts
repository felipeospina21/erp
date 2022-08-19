/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import {
  ConsecutiveResponse,
  NewSaleResponse,
  Product,
  UpdateStockAvailable,
  UpdateStockReserved,
} from '@/redux/services';
import { Delivery } from '@/redux/slices/salesSlice';
import { BaseQueryFn, MutationDefinition } from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { AxiosProxyConfig, AxiosRequestHeaders } from 'axios';

type BaseQuery = BaseQueryFn<
  {
    url: string;
    method: string | undefined;
    data?: any;
    params?: any;
    withCredentials?: boolean | undefined;
    proxy?: false | AxiosProxyConfig | undefined;
    headers?: AxiosRequestHeaders | undefined;
  },
  unknown,
  unknown,
  {},
  {}
>;

type UpdateSaleRef = MutationTrigger<
  MutationDefinition<void, BaseQuery, 'Consecutive', ConsecutiveResponse, 'consecutiveApi'>
>;
type StockAvailable = MutationTrigger<
  MutationDefinition<UpdateStockAvailable, BaseQuery, 'Product', Product, 'productApi'>
>;

type StockReserved = MutationTrigger<
  MutationDefinition<UpdateStockReserved, BaseQuery, 'Product', Product, 'productApi'>
>;
export async function updateStockAndDocRef(
  deliveryData: Delivery,
  updateSaleRef: UpdateSaleRef,
  updateStockAvailable: StockAvailable,
  updateStockReserved: StockReserved
): Promise<any> {
  const promises: Promise<NewSaleResponse | Product | ConsecutiveResponse>[] = [];
  const { productsList } = deliveryData;
  // TODO: Refactor function to save sale first and then update stock. Check for an option on th BE to revert in case one of the processes fail.

  // update sale ref
  promises.push(updateSaleRef().unwrap());

  // update stock
  productsList?.forEach(({ quantity, item }) => {
    promises.push(
      updateStockAvailable({
        _id: item,
        quantity,
      }).unwrap()
    );
    promises.push(
      updateStockReserved({
        _id: item,
        stockReserved: quantity,
        method: 'add',
      }).unwrap()
    );
  });

  return Promise.all(promises);
}
