/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import {
  ConsecutiveResponse,
  NewSale,
  NewSaleResponse,
  Product,
  UpdateStockAvailable,
  UpdateStockReserved,
} from '@/redux/services';
import { Delivery, SalesState } from '@/redux/slices/salesSlice';
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
type SaveSale = MutationTrigger<
  MutationDefinition<NewSale, BaseQuery, 'Sale' | 'Product', NewSaleResponse, 'saleApi'>
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
export async function saveNewSale(
  salesData: SalesState,
  deliveryData: Delivery,
  saleRequestRef: number,
  saveSale: SaveSale,
  updateSaleRef: UpdateSaleRef,
  updateStockAvailable: StockAvailable,
  updateStockReserved: StockReserved,
  idx: number
): Promise<any> {
  const promises: Promise<NewSaleResponse | Product | ConsecutiveResponse>[] = [];
  const { client, checkoutData } = salesData;
  const { productsList, summary } = deliveryData;
  const newRef = saleRequestRef + idx;
  const orderedProducts =
    productsList?.map(({ item, discount, quantity, rowTotal }) => ({
      item,
      discount,
      quantity,
      rowTotal,
    })) ?? [];

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

  // save sale
  promises.push(
    saveSale({
      clientId: client?._id ?? '',
      ...checkoutData,
      ...summary,
      orderedProducts,
      status: '',
      saleRequestRef: String(newRef),
    }).unwrap()
  );
  return Promise.all(promises);
}
