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
import { SalesState } from '@/redux/slices/salesSlice';
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
  invoice: ConsecutiveResponse,
  saveSale: SaveSale,
  updateSaleRef: UpdateSaleRef,
  updateStockAvailable: StockAvailable,
  updateStockReserved: StockReserved
): Promise<any> {
  const promises: Promise<NewSaleResponse | Product | ConsecutiveResponse>[] = [];
  const { productsList, client, checkoutData } = salesData;
  const invoiceRef = invoice ? String(invoice.count + 1) : '';
  const orderedProducts =
    productsList?.map(({ item, discount, quantity, rowTotal }) => ({
      item,
      discount,
      quantity,
      rowTotal,
    })) ?? [];
  promises.push(
    saveSale({
      clientId: client?._id ?? '',
      ...checkoutData,
      orderedProducts,
      invoiceRef,
      status: 'alistamiento',
      saleRequestRef: '1',
    }).unwrap()
  );
  promises.push(updateSaleRef().unwrap());

  productsList?.forEach(({ stock, quantity, item }) => {
    promises.push(
      updateStockAvailable({
        _id: item,
        stockAvailable: stock - quantity,
      }).unwrap()
    );
    promises.push(
      updateStockReserved({
        _id: item,
        stockReserved: quantity,
      }).unwrap()
    );
  });

  return Promise.all(promises);
}
